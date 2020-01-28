const UUID = require("uuid/v5");
let namespace = require("uuid/v1")();

function CrCatalog(commun){
	let types = new Map();
	let resources = new Map();

	let send = commun.connect(input);


	function input(mess){
		
		switch(mess.action){
			case "AddType": send(addType(mess)); break;
			case "AddRes": send(addResorce(mess)); break;
			case "AddResArr": send(addResArr(mess)); break;
			case "FindRes": send(findResorce(mess)); break;
			case "FindTypeAllRes": send(findResFromType(mess)); break;
			case "RemoveRes": send(removeResorce(mess)); break;
			case "Connected": break;
			default: console.log(mess);
		}
	}

	function addType(mess){
		types.set(mess.type, mess.path);

		return {
			action: "AddedType",
			success: true,
			type: mess.type,
			adr: mess.source
		}
	}

	function addResorce(mess){
		
		
		let is_type = mess.resource && types.has(mess.resource.type);

		if(!is_type)
			return {
				action: "AddedRes",
				success: false,
				oldId: mess.resource ? mess.resource.id : "None",
				newId: "None",
				adr: mess.source
			}

		let uid = UUID(mess.resource.type + mess.resource.id, namespace);
		
		let resource = {
			id: uid,
			type: mess.resource.type,
			path: mess.resource.path
		};

		resources.set(uid, resource);

		return {
			action: "AddedRes",
			success: true,
			oldId: mess.resource.id,
			newId: uid,
			adr: mess.source
		}
		
	}

	function addResArr(mess){
		
		var is_type = types.has(mess.type);

		if(!is_type)
			return {
				action: "AddedRes",
				success: false,
				addedIds: [],
				adr: mess.source,
			}

		let addedIds = [];
		
		mess.resources.forEach(function(resource, i){

			let uid = UUID(resource.type + resource.id, namespace);
			
			addedIds.push({
				oldId: resource.id,
				newId: uid,
			});

			resources.set(uid, {
				id: uid,
				type: resource.type,
				path: resource.path,
			});

		});
		return {
			action: "AddedResArr",
			success: !!addedIds.length,
			addedIds,
			adr: mess.source
		}
		
	}

	function findResorce(mess){

		var is_uid = resources.has(mess.id);

		if(!is_uid)
			return {
				action: "FoundRes",
				success: false,
				id: mess.id,
				resource: null,
				fullPath: null,
				adr: mess.source
			}

		let resource = resources.get(mess.id);
		let fullPath = types.get(resource.type).concat(resource.path);

		return {
			action: "FoundRes",
			success: true,
			id: mess.id,
			resource,
			fullPath,
			adr: mess.source,
		}

	}

	function findResFromType(mess){

		let is_type = types.has(mess.type);

		if(!is_type)
			return {
				action: "FoundResArr",
				success: false,
				resources: [],
				adr: mess.source
			}

		let typePath = types.get(mess.type);
		let foundResources = [];

		resources.forEach(({id, type, path}) => {
			if(type == mess.type)
				foundResources.push({
					id,
					fullPath: typePath.concat(path),
				});
		});

		return {
			action: "FoundResArr",
			success: !!foundResources.length,
			resources: foundResources,
			adr: mess.source,
		}

	}

	function removeResorce(mess){
		return {
			action: "RemovedRes",
			success: resources.delete(mess.id),
			id: mess.id,
			adr: mess.source
		}
	}
}

CrCatalog.types = {
	input: require("./types/inputTypes.js"),
	output: require("./types/outputTypes.js")
};

module.exports = CrCatalog;