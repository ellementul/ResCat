require("typesjs");
require('typesjs/switch_type');
const T = Object.types;

const inputTypes = require("../types/inputTypes.js");

var MessType = T.swit(inputTypes.switchKey, inputTypes); 

function CrGeneratorOfTestValues(){

	this.type = MessType;

	this.connect = function connect(send){
		var i = 1;
		while(i--){
			send(MessType.rand());
		}
	}
}




module.exports = new CrGeneratorOfTestValues();