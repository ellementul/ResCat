require("typesjs");
const T = Object.types;

const baseTypes = require("./resourceType.js");

const sourceType = T.any(T.str, undefined);

//Types of Messeges

const AddType = T.obj({
	action: "AddType",
	type: baseTypes.type,
	source: sourceType
});

const AddResource = T.obj({
	action: "AddRes",
	type: baseTypes.type,
	resource: baseTypes.resource,
	id: baseTypes.uid,
	source: sourceType
});

const AddResourceArray = T.obj({
	action: "AddResArr",
	type: baseTypes.type,
	resource: T.arr(baseTypes.resource, 64, false),
	id: T.arr(baseTypes.uid, 64, false),
	source: sourceType
});

const FindResource = T.obj({
	action: "FindRes",
	uid: baseTypes.uid,
	source: sourceType
});

const RemoveResource = T.obj({
	action: "RemoveRes",
	uid: baseTypes.uid,
	source: sourceType
});

const FindFromType = T.obj({
	action: "FindTypeAllRes",
	type: baseTypes.type,
	source: sourceType
})

var Types = [AddType, AddResource, FindResource, RemoveResource, AddResourceArray, FindFromType];
Types.switchKey = "action";

module.exports = Types;
