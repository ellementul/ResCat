const T = require("typesjs");

const baseTypes = require("./resourceType.js");

//Types Of Answers
let switchKey = "action";

let Types = [
{
	action: "AddedRes",
	success: baseTypes.success,
	oldId: baseTypes.id,
	newId: baseTypes.uid,
	adr: baseTypes.source
},{
	action: "AddedResArr",
	success: baseTypes.success,
	addedIds: T.Array.Def(T.Object.Def({ oldId: baseTypes.id, newId: baseTypes.uid }), 64, true),
	adr: baseTypes.source
},{
	action: "AddedType",
	success: baseTypes.success,
	type: baseTypes.type,
	adr: baseTypes.source
},{
	action: "FoundRes",
	success: baseTypes.success,
	id: baseTypes.uid,
	resource: baseTypes.resource,
	fullPath: baseTypes.fullPath,
	adr: baseTypes.source
},{
	action: "FoundResArr",
	success: baseTypes.success,
	resources: T.Array.Def(T.Object.Def({ id: baseTypes.uid, fullPath: baseTypes.path}), 256, true),
	adr: baseTypes.source
},{
	action: "RemovedRes",
	success: baseTypes.success,
	id: baseTypes.id,
	adr: baseTypes.source
}];

module.exports = T.Switch.Def(switchKey, Types);


