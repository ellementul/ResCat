function CrCatalog(){

	var Send  = null;

	this.connect = function connect(commun){
		Send = commun.connect(Input);
	}

	function Input(mess){
		console.log(mess);

		Send({});
	}

}

module.exports = CrCatalog;