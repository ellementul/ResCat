const T = require("typesjs");

const uid = T.String.Def('\\w\\d-', 40);

const type = T.Key.Def();

const resource =  T.String.Def('\\w\\d\\s+:;.,?!=#\\/<>"()-\\]}{&', 1024*1024-1);

const success = T.Bool.Def();

const source = T.Any.Def(T.Key.Def());

module.exports = {
	uid,
	type,
	resource,
	success,
	source,
};