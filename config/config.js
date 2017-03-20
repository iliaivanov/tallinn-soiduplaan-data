var basePath =  __dirname + '/..',
	libDirPath = basePath + '/lib'
	dataBaseRoute = "http://soiduplaan.tallinn.ee",
	files = ['stops', 'routes', 'gps'];

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
