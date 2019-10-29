require("typesjs");
require('typesjs/str_type');
const T = Object.types;

const uidType = T.str(/^[\w\d]*$/, 50);

const typeType = T.str(/^[\w\d]*$/, 50);

const resourceType = T.obj({
	type: typeType,
	content: T.str(/^[\w\d\s+:;.,?!=#\/<>"()-\]}{]*$/, 1024*1024)
});


module.exports = {
	uid: uidType,
	type: typeType,
	resource: resourceType
};