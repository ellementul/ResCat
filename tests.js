const CrCommun = require("AsynCommun").CrCommunicator;
const CrRandTest = require("AsyncCommTest").randTest;

const CrCatalog = require("./main.js");


const outputType = require("./types/outputTypes.js");
const inputType = require("./types/inputTypes.js");

const funcTest = require("./test/func_test.js");

let TestComm = new CrRandTest(inputType.rand, outputType.test);
new CrCatalog(TestComm);


let commun = new CrCommun(ValidError.bind(null, inputType.test), ValidError.bind(null, outputType.test));
new CrCatalog(commun);
funcTest(commun);


function ValidError(test, val){
	if(test(val))
		throw new Error(JSON.stringify(test(val), "", 4));

	return val;
}

