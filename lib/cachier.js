'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, '/../config/config'));
const fsHelper = require(config.libDirPath + '/helpers/fileSystemHelper');

let files = config.files;
let cacheDir = config.dirs.cache;

let createDirectories = () => {
	return fsHelper.createDirectory(cacheDir);
}

let vipeCacheFiles = (files) => {
	return fsHelper.cleanupFiles(cacheDir, [files]);
}

let validateFilesExists = () => {

	let existingFiles = [];

	for (let i = 0; i < files.length; i++) {
	  	let fileName = files[i];
	  	let filePath = `${cacheDir}/${fileName}.txt`;

	  	if (fs.existsSync(filePath)) {
			existingFiles.push(fileName);
	  	}
    }

	return files.length === existingFiles.length
}

let loadCachedFiles = (createIfMissing) => {
	return createDirectories().then(() => {
		return new Promise((resolve, reject) => {
			let cachedFilesContent = [];
			let filesMissing = false;

	        for (let i = 0; i < files.length; i++) {
	            let fileName = files[i];
	            let filePath = `${cacheDir}/${fileName}.txt`;

	            if (fs.existsSync(filePath)) {
	                cachedFilesContent[fileName] = fs.readFileSync(filePath, {encoding: 'utf8'});
	            } else {
					if (createIfMissing) {
						filesMissing = true;
						break;
					} else {
						reject(`No cache file specified for ${fileName}`);
					}
	            }
	        }

			if (filesMissing && createIfMissing) {
				downloadFiles().then(() => {
					return loadCachedFiles();
				}).then((cachedFilesContent) => {
					resolve(cachedFilesContent);
				}).catch((e) => {
					reject(e);
				});
			} else {
				resolve(cachedFilesContent);
			}
	    });
	}, (error) => {
		console.log(error);
	});
}

let downloadFiles = () => {
	return new Promise((resolve, reject) => {
		let done = false;

		for (let i = 0; i < files.length; i++) {
			let fileName = files[i],
				url = config.routes[fileName],
				filePath = `${cacheDir}/${fileName}.txt`;

			vipeCacheFiles([fileName]).then(() => {
				return axios.get(url);
			}).then((response) => {

				if (response.status === 200) {
					fs.writeFileSync(filePath, response.data, {mode: '0777'});
				} else {
					reject(`Error fetching data from: ${url}`);
				}
			}).catch((error) => {
				reject(error);
			});
		}
	});
}

let cacheDataFiles = () => {
	return createDirectories().then((result) => {
		return downloadFiles();
	});
}

module.exports = {
	cacheDataFiles,
	validateFilesExists,
	loadCachedFiles
};
