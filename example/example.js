const tsp = require('./../index.js');

tsp.getParsedData().then((data) => {
	console.log(data);
}, (error) => {
	console.log(error);
});
