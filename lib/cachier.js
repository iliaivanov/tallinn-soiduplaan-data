const axios = require('axios');
const fs = require('fs');

const config = require('./../config/config');
const helpers = require('./helpers');

var cacheDir = config.dirs.cache;

var downloadFile = (fileName, url) => {
	axios.get(url).then((response) => {
		var filePath = `${cacheDir}/${fileName}.txt`,
			cacheFile = fs.createWriteStream(filePath, {mode: '0777'});

		if (response.status === 200) {
			fs.writeFileSync(filePath, response.data);
		} else {
			console.log(`Error fetching data from: ${url}`);
		}
	});
};

var cacheDataFiles = () => {
	helpers.createDirectories([cacheDir]).then((result) => {
		return helpers.cleanupFiles(cacheDir, config.files);
	}).then((result) => {
		for (var i = 0; i < config.files.length; i++) {
			var fileName = config.files[i];

			if (config.routes[fileName]) {
				downloadFile(fileName, config.routes[fileName]);
			} else {
				console.log(`No route specified for ${fileName}`);
			}
		}
	}).catch((e) => {
		console.log(e.message);
	});
};

module.exports = {
	cacheDataFiles
};
