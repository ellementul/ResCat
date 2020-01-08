const assert = require('assert').strict;

function CrTest(comm){

	let send = comm.connect(checkAnswer);


	let type = "Exemple";
	let basePath = ['.','test'];

	let newType = {
		action: "AddType",
		type: type,
		path: basePath,
		source: "Default"
	};

	let id = "Rest_Warp";
	let filePath = ['testFile.txt'];

	let newRes = {
		id,
		type,
		path: filePath,
	};

	let newResArr = (new Array(5)).fill().map((item, index) => {
		return {
			id: "" + index,
			type,
			path: filePath.concat("" + index),
		};
	});


	send(newType);

	function checkAnswer(mess){
		switch(mess.action){
			case "AddedType": {
				checkNewType(mess); 
				send({action: "AddRes", resource: newRes});
				send({
					action: "AddResArr",
					type: type,
					resources: newResArr,
					source: "Array"
				});
			} break;
			case "AddedRes": {
				checkAddedRes(mess);
				newRes.id = mess.newId; 
				send({ action: "FindRes", id: newRes.id }); 
			} break;

			case "AddedResArr": {
				checkAddedResArr(mess);

				mess.addedIds.forEach((ids, index) =>{
					newResArr[index].id = ids.newId;
				})

				send({
					action: "FindTypeAllRes",
					type: type,
					source: "Array"
				}); 
			} break;

			case "FoundRes": {
				checkFindRes(mess);
				if(mess.success)
					send({ action: "RemoveRes", id: newRes.id });
			} break;

			case "RemovedRes": {

				checkRemoveRes(mess);
				checkFindRes = secondCheckFind;
				send({action: "FindRes", id: newRes.id }); 
			}
			break;
			
			case "FoundResArr": {
				checkFindResFromType(mess); 
				TestOk();
			} break;
		}
	}

	function checkNewType(mess){
		let errMsg = JSON.stringify(mess, "", 2);

		assert.strictEqual(mess.type, type, errMsg);
		assert.strictEqual(mess.adr, "Default", errMsg);
		assert.ok(mess.success, errMsg);

		console.log("Add Type ... OK");

	}

	function checkAddedRes(mess){

		let errMsg = JSON.stringify(mess, "", 2);
		
		assert.strictEqual(mess.oldId, id, errMsg);
		assert.ok(!mess.adr, errMsg);
		assert.ok(mess.success, errMsg);

		console.log("Add Resource ... OK");

	}

	function checkFindRes(mess){

		let errMsg = JSON.stringify(mess, "", 2);
		
		assert.deepStrictEqual(mess.resource, newRes, errMsg);

		assert.ok(!mess.adr, errMsg);
		assert.ok(mess.success, errMsg);

		console.log("Find Resource ... OK");
	}

	function checkRemoveRes(mess){

		let errMsg = JSON.stringify(mess, "", 2);

		assert.strictEqual(mess.id, newRes.id, errMsg);

		assert.ok(!mess.adr, errMsg);
		assert.ok(mess.success, errMsg);
		
	}

	function secondCheckFind(mess){
		let errMsg = JSON.stringify(mess, "", 2);

		assert.strictEqual(mess.resource, null, errMsg);
		assert.strictEqual(mess.id, newRes.id, errMsg);
		assert.strictEqual(mess.fullPath, null, errMsg);

		assert.ok(!mess.adr, errMsg);
		assert.ok(!mess.success, errMsg);

		console.log("Remove Resource ... OK");

	};

	function checkAddedResArr(mess){

		let errMsg = JSON.stringify(mess, "", 2);

		assert.strictEqual(mess.adr, "Array", errMsg);
		assert.strictEqual(mess.addedIds.length, 5, errMsg);

		mess.addedIds.forEach(function(ids, index){
			assert.strictEqual(ids.oldId, ""+index);
		})

		assert.ok(mess.success, errMsg);

		console.log("Add Resource Array ... OK");
	}

	function checkFindResFromType(mess){

		let errMsg = JSON.stringify(mess, "", 2);

		assert.strictEqual(mess.adr, "Array", errMsg);

		newResArr.forEach(({id, path}, index) =>{
			assert.deepStrictEqual(mess.resources[index], {
				id,
				fullPath: basePath.concat(path),
			}, errMsg);
		})

		assert.ok(mess.success, errMsg);

		console.log("Find Resources From Type ... OK");

	}

	function TestOk(){console.log("Functional input test... OK");}

	
}


module.exports = CrTest;