require("typesjs");
require('typesjs/switch_type');
const T = Object.types;

const keys = ["AddType", "AddRes", "UpRes", "RemRes"];
const baseTypes = require("./resourceType.js");

//Types Of Messeges

var Answer = T.obj({
	action: "Answer",
	makedAction: T.any(keys),
	success: T.bool,
	uid: baseTypes.uid,
	oldId: T.arr(baseTypes.uid, 1, false)
});


var Resource = T.obj({
	action: "SendRes",
	success: T.bool,
	resource: baseTypes.resource,
	uid: baseTypes.uid,
});

var Type = T.swit("action", [Answer, Resource]);

module.exports = Type;


