const CrCommun = require("AsynCommun").CrCommunicator;

const CrCatalog = require("./main.js");

const outputType = require("./types/outputTypes.js");

const inputTest = require("./test/rand_input.js");
const funcTest = require("./test/func_test.js");


const commun = new CrCommun(ValidError.bind(null, inputTest.type.test), ValidError.bind(null, outputType.test));

const catalog = new CrCatalog();

catalog.connect(commun);



inputTest.connect(commun.connect(function(){console.log("...........OK");}));

funcTest(commun);


function ValidError(test, val){
	if(test(val))
		throw new Error(JSON.stringify(test(val), "", 4));

	return val;
}

