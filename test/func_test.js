function CrTest(comm){
	var type = "Tile_Exemple";
	var id = "Rest_Warp";
	var checkIds = null;

	var resource = "https://vk.com/im?peers=160322515&sel=236708990";
	var resUid = null;

	var resArr = ["0", "1", "2", "3"];

	var send = comm.connect(checkAnswer);

	send({
		action: "AddType",
		type: type,
		source: "Default"
	});

	function checkAnswer(mess){
		switch(mess.action){
			case "AddedType": checkNewType(mess); break;
			case "AddedRes": checkAddedRes(mess); break;
			case "FoundRes": checkFindRes(mess); break;
			case "RemovedRes": checkRemoveRes(mess); break;
			case "AddedResArr": checkAddedResArr(mess); break;
			case "FoundResArr":checkFindResFromType(mess); break;
		}
	}

	function checkNewType(mess){
		if((mess.type != type) || (mess.adr !== "Default") || !mess.success)
			throw new Error(JSON.stringify(mess, "", 2));

		//console.log("Add Type ... OK");

		send({
			action: "AddRes",
			type: type,
			resource: resource,
			id: id
		});

	}

	function checkAddedRes(mess){
		if((mess.oldId != id) || (mess.adr) || (mess.type != type) || !mess.success)
			throw new Error(JSON.stringify(mess, "", 2));

		//console.log("Add Resource ... OK");

		resUid = mess.uid;

		send({
			action: "FindRes",
			uid: resUid
		});

	}

	function checkFindRes(mess){
		if((mess.uid != resUid) || (mess.type != type) || (mess.adr) || (mess.resource != resource) || !mess.success)
			throw new Error(JSON.stringify(mess, "", 2));

		//console.log("Find Resource ... OK");

		send({
			action: "RemoveRes",
			uid: resUid
		});
	}

	function checkRemoveRes(mess){
		if((mess.uid != resUid) || (mess.adr) || !mess.success)
			throw new Error(JSON.stringify(mess, "", 2));

		checkFindRes = secondCheckFind;

		send({
			action: "FindRes",
			uid: resUid
		});
	}

	function secondCheckFind(mess){
		if((mess.uid != resUid) || (mess.adr) || mess.success)
			throw new Error(JSON.stringify(mess, "", 2));

		//console.log("Remove Resource ... OK");

		send({
			action: "AddResArr",
			type: type,
			resource: resArr,
			id: resArr,
			source: "Array"
		});

	};

	function checkAddedResArr(mess){
		if((mess.adr != "Array") || !mess.success || (mess.type != type))
			throw new Error(JSON.stringify(mess, "", 2));

		if(!resArr.every(function(id, i){
			return mess.oldId[i] == id;
		})) throw new Error(JSON.stringify(mess, "", 2));

		checkIds = mess.oldId;

		//console.log("Add Resource Array ... OK");

		send({
			action: "FindTypeAllRes",
			type: type,
			source: "Array"
		})

	}

	function checkFindResFromType(mess){
		if((mess.adr != "Array") || !mess.success || (mess.type != type))
			throw new Error(JSON.stringify(mess, "", 2));

		if(!checkIds.every(function(id, i){
			return mess.resource[i] == id;
		})) throw new Error(JSON.stringify(mess, "", 2));

		//console.log("Find Resources From Type ... OK");

		TestOk();

	}

	function TestOk(){console.log("Functional input test... OK");}

	
}


module.exports = CrTest;