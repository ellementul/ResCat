const T = require("typesjs");

const baseTypes = require("./resourceType.js");

let switchKey = "action";
//Types of Messeges
let Types = [{
	action: "AddType",
	type: baseTypes.type,
	path: baseTypes.path,
	source:  baseTypes.source,
},{
	action: "AddRes",
	resource: baseTypes.resource,
	source: baseTypes.source,
},{
	action: "AddResArr",
	type: baseTypes.type,
	resources: baseTypes.resources,
	source: baseTypes.source,
},{
	action: "FindRes",
	id: baseTypes.uid,
	source: baseTypes.source,
},{
	action: "RemoveRes",
	id: baseTypes.uid,
	source: baseTypes.source,
},{
	action: "FindTypeAllRes",
	type: baseTypes.type,
	source: baseTypes.source,
},{
	action: "Connected",
	adress: T.Key.Def(),
}];


module.exports = T.Switch.Def(switchKey, Types);
