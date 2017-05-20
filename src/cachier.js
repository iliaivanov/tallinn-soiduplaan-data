'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fsp = require('fs-promise');

const config = require(path.join(__dirname, '/../config/config'));
const fsHelper = require(config.srcDirPath + '/helpers/fileSystemHelper');

const files = config.files;
const cacheDir = config.dirs.cache;

/**
 * Download busses schedules and save to the local files.
 * Existing files will be removed.
 * @return {Promise}
 */
let _downloadFiles = () => {
	let promises = [];

	files.forEach((fileName, key) => {
		let filePath = `${cacheDir}/${fileName}.txt`;
		let url = config.routes[fileName];

		let IOpromise = fsHelper.cleanupFile(filePath).then(() => {
			return axios.get(url);
		}).then((response) => {
			if (response.status === 200) {
				return fsp.writeFile(filePath, response.data, { mode: '0777' });
			} else {
				return Promise.reject(`Error fetching data from: ${url}`);
			}
		}).catch((err) => {
			return Promise.reject(`Err: ${err}`);
		});

		promises.push(IOpromise);
	});

	return Promise.all(promises);
}

/**
 * Check if all cached files exist.
 * @return {Promise} with true/false result
 */
let _checkCachedFiles = () => {
	let promises = [];

	files.forEach((fileName, key) => {
		let filePath = `${cacheDir}/${fileName}.txt`;
		
		promises.push(fsHelper.checkItemExists(filePath));
	});

	return Promise.all(promises);
};

/**
 * Get cached fiels content.
 * Will go through all cached files and read the data. 
 * @return {Promise} with plaintext content
 */
let getCachedContent = () => {
	let cachedFilesContent = [];

	files.forEach((fileName, key) => {
		let filePath = `${cacheDir}/${fileName}.txt`;

		try {
			cachedFilesContent[fileName] = fs.readFileSync(filePath, { encoding: 'utf8' });
		} catch (err) {
			return Promise.reject(`No cache file specified for ${fileName}`);
		}
	});
	
	return Promise.resolve(cachedFilesContent);
};

/**
 * Get cached content as a json.
 * @param {bool} forceFilesUpdate 
 * @return {Promise}
 */
let cacheDataFiles = (forceFilesUpdate) => {
	forceFilesUpdate = forceFilesUpdate || false;

	return fsHelper.createDirectory(cacheDir).then((result) => {
		return _checkCachedFiles();
	}).then((filesExist) => {
		if (filesExist.indexOf(false) >= 0 || forceFilesUpdate === true) {
			return _downloadFiles();
		}

		return Promise.resolve();
	}).then(() => {
        return getCachedContent();
    });
}

module.exports = {
	cacheDataFiles,
	getCachedContent
};
