const axios = require('axios');
const fs = require('fs');

const config = require('./../config/config');

var cacheDir = config.dirs.cache;

var createDirectories = () => {
	return new Promise((resolve, reject) => {
		var dirs = [cacheDir];

		for (var i = 0; i < dirs.length; i++) {
			if (!fs.existsSync(dirs[i])){
				console.log(`Creating directory ${dirs[i]}`);
				fs.mkdirSync(dirs[i]);
			}
		}

		resolve(true);
	});
};

var cleanupOldFiles = () => {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < config.files.length; i++) {
		  	var fileName = config.files[i],
		  		filePath = `${cacheDir}/${fileName}.txt`;

		  	if (fs.existsSync(filePath)) {
		  		fs.unlinkSync(filePath);
		  	}
	    }

		resolve(true);
	});
}

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
	createDirectories().then((result) => {
		return cleanupOldFiles();
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
