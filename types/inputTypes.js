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
	resource: baseTypes.resource,
	id: baseTypes.uid,
	source: sourceType
});

const UpdateResource = T.obj({
	action: "UpRes",
	resource: baseTypes.resource,
	uid: baseTypes.uid,
	source: sourceType
});

const RemoveResource = T.obj({
	action: "RemRes",
	uid: baseTypes.uid,
	source: sourceType
});

var Types = [AddType, AddResource, UpdateResource, RemoveResource];
Types.switchKey = "action";

module.exports = Types;
