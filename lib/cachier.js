'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, '/../config/config'));
const fsHelper = require(config.libDirPath + '/helpers/fileSystemHelper');

const files = config.files;
const cacheDir = config.dirs.cache;

// TODO: Something is terrbily wrong here...

let _downloadFiles = () => {
	console.log(123);
	files.forEach((fileName, key) => {
		let filePath = `${cacheDir}/${fileName}.txt`;

		fsHelper.cleanupFile(filePath).then(() => {
			return axios.get(url);
		}).then((response) => {
			if (response.status === 200) {
				try {
					fs.writeFileSync(filePath, response.data, { mode: '0777' })
				} catch (err) {
					return Promise.reject(err);
				}
			} else {
				return Promise.reject(`Error fetching data from: ${url}`);
			}
		}).catch((err) => Promise.reject(err));
	});

	return Promise.resolve();
}

// let _downloadFiles = () => {
// 	return new Promise((resolve, reject) => {
// 		let done = false;

// 		for (let i = 0; i < files.length; i++) {
// 			let fileName = files[i],
// 				url = config.routes[fileName],
// 				filePath = `${cacheDir}/${fileName}.txt`;

// 			fsHelper.cleanupFile(filePath).then(() => {
// 				return axios.get(url);
// 			}).then((response) => {

// 				if (response.status === 200) {
// 					fs.writeFileSync(filePath, response.data, { mode: '0777' });
// 				} else {
// 					reject(`Error fetching data from: ${url}`);
// 				}
// 			}).catch((error) => {
// 				reject(error);
// 			});
// 		}
// 	});
// }

/**
 * Get cached fiels content.
 * Will go through all cached files and read the data. 
 * Also will download files if createIfMissing flag is true and files are 
 * missing.
 * @param {bool} createIfMissing 
 * @return {Promise} with content
 */
let getCachedContent = (createIfMissing) => {
	console.log(11);
	return fsHelper.createDirectory(cacheDir).then((params) => {
		let cachedFilesContent = [];
		let filesMissing = false;

		files.forEach((fileName, key) => {
			let filePath = `${cacheDir}/${fileName}.txt`;

			// fsHelper.getFileContent(filePath).then(() => {
			// 	return fsHelper.getFileContent(filePath);
			// }, (err) => {
			// 	filesMissing = true;
			// }).then((fileContent) => {
			// 	cachedFilesContent[fileName] = fileContent;
			// }, (err) => {
			// 	throw err;
			// });

			try {
				cachedFilesContent[fileName] = fs.readFileSync(filePath, { encoding: 'utf8' });
			} catch (err) {
				if (createIfMissing) {
					filesMissing = true;
				} else {
					Promise.reject(`No cache file specified for ${fileName}`);
				}
			}
		});
		
		if (filesMissing && createIfMissing) {
			console.log(3333);
			_downloadFiles().then(() => {
				return getCachedContent();
			}).then((cachedFilesContent) => {
				Promise.resolve(cachedFilesContent)
			}).catch((e) => {
				Promise.reject(e);
			});
		} else {
			Promise.resolve(cachedFilesContent);
		}
	}).catch(err => Promise.reject(err));
};

// let getCachedContent = (createIfMissing) => {
// 	return fsHelper.createDirectory(cacheDir).then(() => {
// 		return new Promise((resolve, reject) => {
// 			let cachedFilesContent = [];
// 			let filesMissing = false;

// 			for (let i = 0; i < files.length; i++) {
// 				let fileName = files[i];
// 				let filePath = `${cacheDir}/${fileName}.txt`;

// 				if (fs.existsSync(filePath)) {
// 					cachedFilesContent[fileName] = fs.readFileSync(filePath, { encoding: 'utf8' });
// 				} else {
// 					if (createIfMissing) {
// 						filesMissing = true;
// 						break;
// 					} else {
// 						reject(`No cache file specified for ${fileName}`);
// 					}
// 				}
// 			}

// 			if (filesMissing && createIfMissing) {
// 				_downloadFiles().then(() => {
// 					return getCachedContent();
// 				}).then((cachedFilesContent) => {
// 					resolve(cachedFilesContent);
// 				}).catch((e) => {
// 					reject(e);
// 				});
// 			} else {
// 				resolve(cachedFilesContent);
// 			}
// 		});
// 	}, (error) => {
// 		console.log(error);
// 	});
// }


let cacheDataFiles = () => {
	return fsHelper.createDirectory(cacheDir).then((result) => {
		return _downloadFiles();
	});
}

module.exports = {
	cacheDataFiles,
	getCachedContent
};
