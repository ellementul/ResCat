const T = require("typesjs");

const baseTypes = require("./resourceType.js");

const adrType = T.Any.Def(T.Key.Def());
//Types Of Answers

let Type = T.Switch.Def("action", [
{
	action: "AddedRes",
	success: baseTypes.success,
	uid: baseTypes.uid,
	type: baseTypes.type,
	oldId: baseTypes.uid,
	adr: adrType
},{
	action: "AddedResArr",
	success: baseTypes.success,
	type: baseTypes.type,
	uid: T.Array.Def(baseTypes.uid, 64, true),
	oldId: T.Array.Def(baseTypes.uid, 64, true),
	adr: adrType
},{
	action: "AddedType",
	success: baseTypes.success,
	type: baseTypes.type,
	adr: adrType
},{
	action: "FoundRes",
	success: baseTypes.success,
	uid: baseTypes.uid,
	type: baseTypes.type,
	resource: baseTypes.resource,
	adr: adrType
},{
	action: "FoundResArr",
	success: baseTypes.success,
	uid: T.Array.Def(baseTypes.uid, 256, true),
	type: baseTypes.type,
	resource: T.Array.Def(baseTypes.resource, 256, true),
	adr: adrType
},{
	action: "RemovedRes",
	success: baseTypes.success,
	uid: baseTypes.uid,
	adr: adrType
}
]);

module.exports = Type;


