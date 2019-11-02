require("typesjs");
require('typesjs/switch_type');
const T = Object.types;

const baseTypes = require("./resourceType.js");

const adrType = T.any(T.str, undefined);
//Types Of Answers

var AddResorce = T.obj({
	action: "AddedRes",
	success: T.bool,
	uid: baseTypes.uid,
	type: baseTypes.type,
	oldId: baseTypes.uid,
	adr: adrType
});

var AddResArr = T.obj({
	action: "AddedResArr",
	success: T.bool,
	type: baseTypes.type,
	uid: T.arr(baseTypes.uid, 64, false),
	oldId: T.arr(baseTypes.uid, 64, false),
	adr: adrType
});

var NewType = T.obj({
	action: "AddedType",
	success: T.bool,
	type: baseTypes.type,
	adr: adrType
});


var FindResource = T.obj({
	action: "FoundRes",
	success: T.bool,
	uid: baseTypes.uid,
	type: baseTypes.type,
	resource: baseTypes.resource,
	adr: adrType
});

var FindResourceFromType = T.obj({
	action: "FoundResArr",
	success: T.bool,
	uid: T.arr(baseTypes.uid, 256, false),
	type: baseTypes.type,
	resource: T.arr(baseTypes.resource, 256, false),
	adr: adrType
});

var RemoveResource = T.obj({
	action: "RemovedRes",
	success: T.bool,
	uid: baseTypes.uid,
	adr: adrType
});

var Type = T.swit("action", [NewType, AddResorce, AddResArr, FindResource, RemoveResource, FindResourceFromType]);

module.exports = Type;


