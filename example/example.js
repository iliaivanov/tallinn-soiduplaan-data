const tsp = require('./../index.js');

// tsp.cachier.loadCachedFiles().then((data) => {
// 	console.log(data);
// }, (error) => {
// 	console.log(error);
// });

 tsp.getCachedData().then((data) => {
	console.log(`Stops: ${data.stops.length}`);
	console.log(`Routes: ${data.routes.length}`);
	console.log(`Gps: ${data.gps.length}`);
}, (error) => {
	console.log(error);
});


// tsp.cachier.validateFilesExists().then((data) => {
//    console.log(data);
// }, (error) => {
// 	console.log(error);
// });
