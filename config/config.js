const path = require('path');

let basePath =  path.join(__dirname, '/..');
let libDirPath = basePath + '/lib';
let dataBaseRoute = "http://soiduplaan.tallinn.ee";
let files = ['stops', 'routes', 'gps'];

module.exports = {
	dataBaseRoute,
	basePath,
	libDirPath,
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
