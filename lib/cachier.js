'use strict';

const axios = require('axios');
const fs = require('fs');

const config = require('./../config/config');
const fsHelper = require(config.libDirPath + '/helpers/fileSystemHelper');

var cacheDir = config.dirs.cache;

var downloadFile = (fileName, url) => {
	axios.get(url).then((response) => {
		var filePath = `${cacheDir}/${fileName}.txt`,
			cacheFile = fs.createWriteStream(filePath, {mode: '0777'});

		if (response.status === 200) {
			fs.writeFileSync(filePath, response.data);
		} else {
			throw `Error fetching data from: ${url}`;
		}
	}, (error) => {
		throw error.message;
	});
};

var cacheDataFiles = () => {
	return fsHelper.createDirectories([cacheDir]).then((result) => {
			return fsHelper.cleanupFiles(cacheDir, config.files);
		}).then((result) => {
			return new Promise((resolve, reject) => {
				for (var i = 0; i < config.files.length; i++) {
					var fileName = config.files[i];

					if (config.routes[fileName]) {
						downloadFile(fileName, config.routes[fileName]);
					} else {
						// TODO: Probably only reject if no files were cached or cache files are too old?
						// TODO: Definition of oldeness.
						reject(`No route specified for ${fileName}`);
					}
				}

				resolve(true);
			});
		});
};

module.exports = {
	cacheDataFiles
};
