const UUID = require("uuid/v5");
var namespace = require("uuid/v1")();

function CrCatalog(){
	var types = new Set();
	var resorces = new Map();


	var send  = null;
	this.connect = function connect(commun){
		send = commun.connect(input);
	}

	function input(mess){
		switch(mess.action){
			case "AddType": send(addType(mess)); break;
			case "AddRes": send(addResorce(mess)); break;
			case "AddResArr": send(addResArr(mess)); break;
			case "FindRes": send(findResorce(mess)); break;
			case "FindTypeAllRes": send(findResFromType(mess)); break;
			case "RemoveRes": send(removeResorce(mess)); break;
		}
	}

	function addType(mess){
		types.add(mess.type);

		return {
			action: "AddedType",
			success: true,
			type: mess.type,
			adr: mess.source
		}
	}

	function addResorce(mess){
		
		var is_type = types.has(mess.type);

		if(!is_type)
			return {
				action: "AddedRes",
				success: false,
				uid: "None",
				type: "None",
				oldId: "None",
				adr: mess.source
			}

		var uid = UUID(mess.type + mess.id, namespace);
		
		var resource = {
			uid: uid,
			type: mess.type,
			content: mess.resource,
		};

		resorces.set(uid, resource);

		return {
			action: "AddedRes",
			success: true,
			uid: resource.uid,
			type: resource.type,
			oldId: mess.id,
			adr: mess.source
		}
		
	}

	function addResArr(mess){
		
		var is_type = types.has(mess.type);

		if(!is_type)
			return {
				action: "AddedRes",
				success: false,
				uid: "None",
				type: "None",
				oldId: "None",
				adr: mess.source
			}

		var uids = [];
		
		mess.resource.forEach(function(resource, i){

			uids[i] = UUID(mess.type + mess.id[i], namespace);
			
			resorces.set(uids[i], {
				uid: uids[i],
				type: mess.type,
				content: resource,
			});

		});

		return {
			action: "AddedResArr",
			success: true,
			uid: uids,
			type: mess.type,
			oldId: mess.id,
			adr: mess.source
		}
		
	}

	function findResorce(mess){

		var is_uid = resorces.has(mess.uid);

		if(!is_uid)
			return {
				action: "FoundRes",
				success: false,
				uid: mess.uid,
				type: "None",
				resource: "None",
				adr: mess.source
			}



		return {
			action: "FoundRes",
			success: true,
			uid: mess.uid,
			type: resorces.get(mess.uid).type,
			resource: resorces.get(mess.uid).content,
			adr: mess.source
		}

	}

	function findResFromType(mess){

		var is_type = types.has(mess.type);

		if(!is_type)
			return {
				action: "FoundResArr",
				success: false,
				uid: [],
				type: mess.type,
				resource: [],
				adr: mess.source
			}

		var foundResources = [];
		var foundUids = [];

		resorces.forEach(function(res){
			if(res.type == mess.type){
				foundResources.push(res.content);
				foundUids.push(res.uid);
			}
		});

		return {
			action: "FoundResArr",
			success: true,
			uid: foundUids,
			type: mess.type,
			resource: foundResources,
			adr: mess.source
		}

	}

	function removeResorce(mess){

		return {
			action: "RemovedRes",
			success: resorces.delete(mess.uid),
			uid: mess.uid,
			adr: mess.source
		}
		
	}
}

module.exports = CrCatalog;