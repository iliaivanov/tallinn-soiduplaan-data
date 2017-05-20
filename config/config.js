const path = require('path');

let basePath =  path.join(__dirname, '/..');
let srcDirPath = basePath + '/src';
let dataBaseRoute = "http://soiduplaan.tallinn.ee";
let files = ['stops', 'routes', 'gps'];

module.exports = {
	dataBaseRoute,
	basePath,
	srcDirPath,
	routes: {
		stops: `${dataBaseRoute}/data/stops.txt`,
        routes: `${dataBaseRoute}/data/routes.txt`,
        gps: `${dataBaseRoute}/gps.txt`
	},
	dirs: {
		cache: `${basePath}/cache`,
		data: `${basePath}/data`
	},
	files
};
