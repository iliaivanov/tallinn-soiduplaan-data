var basePath =  __dirname + '/..',
	dataBaseRoute = "http://soiduplaan.tallinn.ee",
	files = ['stops', 'routes', 'gps'];

module.exports = {
	dataBaseRoute,
	basePath,
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
