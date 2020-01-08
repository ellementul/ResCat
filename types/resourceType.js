const T = require("typesjs");

const uid = T.String.Def('\\w\\d-', 36);

const id = T.Any.Def(uid, T.Key.Def());

const type = T.Key.Def();

const path = T.Array.Def(T.String.Def('\\w\\d_.', 256), 256);

const fullPath = T.Any.Def(T.Const.Def(null), path);

const content =  T.String.Def('\\w\\d\\s+:;.,?!=#\\/<>"()-\\]}{&', 1024*1024);

const resource = T.Any.Def(T.Const.Def(null), T.Object.Def({
	id,
	type,
	path,
}));

const resources = T.Array.Def(T.Object.Def({
	id,
	type,
	path,
}), 64, false);

const success = T.Bool.Def();

const source = T.Any.Def(T.Key.Def());

module.exports = {
	id,
	uid,
	type,
	path,
	fullPath,
	resource,
	resources,
	success,
	source,
};