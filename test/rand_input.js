const T = require("typesjs");

const inputTypes = require("../types/inputTypes.js");

var MessType = T.Switch.Def(inputTypes.switchKey, inputTypes);

function CrGeneratorOfTestValues(){

	this.type = MessType;

	this.connect = function connect(send){
		var i = 10;
		while(i--){
			console.log("Random input test(" + i + ")... "); 
			send(MessType.rand());
		}
	}
}




module.exports = new CrGeneratorOfTestValues();