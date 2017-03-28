'use strict';

const axios = require('axios');
const fs = require('fs');

const config = require('./../config/config');
const fsHelper = require(config.libDirPath + '/helpers/fileSystemHelper');

class CachierMonkey {

	constructor(cacheDir) {
		this.cacheDir = cacheDir;
		this.files = config.files;
	}

	createDirectories() {
		return fsHelper.createDirectories([this.cacheDir]);
	}

	vipeCacheFiles(files) {
		return fsHelper.cleanupFiles(this.cacheDir, [files]);
	}

	validateFilesExists() {

		let existingFiles = [];

		for (let i = 0; i < this.files.length; i++) {
		  	let fileName = this.files[i],
		  		filePath = `${this.cacheDir}/${fileName}.txt`;

		  	if (fs.existsSync(filePath)) {
				existingFiles.push(fileName);
		  	}
	    }

		return this.files.length === existingFiles.length
	}

	loadCachedFiles(createIfMissing) {
		return new Promise((resolve, reject) => {
			let cachedFilesContent = [],
				filesMissing = false;

	        for (let i = 0; i < this.files.length; i++) {
	            let fileName = this.files[i],
	                filePath = `${this.cacheDir}/${fileName}.txt`;

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
				this.downloadFiles().then(() => {
					return this.loadCachedFiles();
				}).then((cachedFilesContent) => {
					resolve(cachedFilesContent);
				}).catch((e) => {
					reject(e);
				});
			}

	        resolve(cachedFilesContent);
	    });
	}

	// TODO: probably events here?
	downloadFiles() {
		return new Promise((resolve, reject) => {
			let done = false;

			for (let i = 0; i < this.files.length; i++) {
				let fileName = this.files[i],
					url = config.routes[fileName];

				if (config.routes[fileName]) {
					let filePath = `${this.cacheDir}/${fileName}.txt`,
						writeStream = fs.createWriteStream(filePath, {mode: '0777'});

					this.vipeCacheFiles([fileName]).then(() => {
						return axios.get(url);
					}).then((response) => {
						if (response.status === 200) {
							writeStream.write(response.data);

							done = i === (this.files.length - 1);
						} else {
							reject(`Error fetching data from: ${url}`);
						}
					}).catch((error) => {
						reject(error);
					});
				} else {
					reject(`No route specified for ${fileName}`);
				}
			}

			if (done) {
				resolve(true);
			}
		});
	}

	cacheDataFiles() {
		return this.createDirectories([this.cacheDir])
			.then((result) => {
				return this.downloadFiles();
			});
	}
}

let cachier = new CachierMonkey(config.dirs.cache);

module.exports = {
	cacheDataFiles: () => {
		return cachier.cacheDataFiles();
	},
	validateFilesExists: () => {
		return cachier.validateFilesExists();
	},
	loadCachedFiles: (createIfMissing) => {
		return cachier.loadCachedFiles(createIfMissing);
	}
};
