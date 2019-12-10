const T = require("typesjs");

const baseTypes = require("./resourceType.js");

//Types of Messeges
let Types = [{
	action: "AddType",
	type: baseTypes.type,
	source:  baseTypes.source,
},{
	action: "AddRes",
	type: baseTypes.type,
	resource: baseTypes.resource,
	id: baseTypes.uid,
	source: baseTypes.source,
},{
	action: "AddResArr",
	type: baseTypes.type,
	resource: T.Array.Def(baseTypes.resource, 64, false),
	id: T.Array.Def(baseTypes.uid, 64, false),
	source: baseTypes.source,
},{
	action: "FindRes",
	uid: baseTypes.uid,
	source: baseTypes.source,
},{
	action: "RemoveRes",
	uid: baseTypes.uid,
	source: baseTypes.source,
},{
	action: "FindTypeAllRes",
	type: baseTypes.type,
	source: baseTypes.source,
}];
Types.switchKey = "action";

module.exports = Types;
