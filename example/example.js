const tsp = require('./../index.js');

tsp.getParsedData(false).then((data) => {
	console.log('Done', data);
}, (error) => {
	console.log(error);
});
