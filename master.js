var _output = {
	z:'',
	counter: 1,

	init: function(input){
		this.header(input.method,input.url);

		console.log(this.z);
		this.z = '';
		this.counter++;
	},

	header: function(a,b){
		console.log("%c// *** *** *** LEGO Analytics Debugger *** *** *** //\n","color:blue;font-size:large");
		console.log(a + " request to the data collector %c" + b.split('/b/ss/')[0] + "/\n","color:red");
		if(this.counter == 1){ 
			console.log("The following has just been recorded in analytics. Please note VISTAs,\nclassifications and processing rules may edit parts of this before it\nhits reporting. If you're unsure please ask: %canalytics@lego.com\n","color:blue");
		}
	},

	body: function(a){

	},

	dictionary: {

	}
};

chrome.extension.onMessage.addListener(
	function(data) {
		console.log(data);
		//_output.init(data);
	}
);