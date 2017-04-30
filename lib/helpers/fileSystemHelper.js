'use strict';

const fs = require('fs');

/**
 * Checks if item (file or directory) exists.
 * @param {string} itemPath 
 * @return {Promise}
 */
let checkItemExists = (itemPath) => {
	try {
		fs.accessSync(itemPath, fs.constants.R_OK);
	} catch (err) {
		return Promise.resolve(false);
	}

	return Promise.resolve(true);
}

/**
 * Create directory.
 * @param {string} dir 
 * @return {Promise}
 */
let createDirectory = (dir) => {
	try {
		fs.mkdirSync(dir);
	} catch (err) {
		if (err.code === 'EEXIST') {
			return Promise.resolve();
		}
		
		return Promise.reject(err);
	}

	return Promise.resolve();
};

/**
 * Clean up file.
 * Checks if file exists and remove it.
 * @param {string} filePath 
 * @return {Promise}
 */
let cleanupFile = (filePath) => {
	return checkItemExists(filePath).then((fileExists) => {
		if (fileExists === false) {
			return Promise.resolve();
		}

		try {
			fs.unlinkSync(filePath);
		} catch (err) {
			return Promise.reject(err);
		}

		return Promise.resolve();
	}).catch(err => Promise.reject(err));
}

/**
 * Get file content.
 * Check if file exists and read the content. Will return resolved/rejected
 * Promise depending on the operation result.
 * @param {string} filePath 
 * @return {Promise} with content if resolved
 */
let getFileContent = (filePath) => {
	return checkItemExists(filePath).then((fileExists) => {
		if (fileExists === false) {
			return Promise.reject(`File doesn't exist ${fileExists}`);
		}

		try {
			let content = fs.readFileSync(filePath, { encoding: 'utf8' });
		} catch (err) {
			return Promise.reject(err);
		}

		return Promise.resolve(content);
	}, (err) => {
		return Promise.reject(err);
	});
};

/**
 * Write content to the file.
 * @param {string} filePath 
 * @param {string} content 
 * @param {string} modeValue
 * @return {Promise}
 */
let writeFileContent = (filePath, content, modeValue) => {
	try {
		fs.writeFileSync(filePath, content, { mode: modeValue });
	} catch (err) {
		return Promise.reject(err);
	}

	return Promise.resolve();
}

module.exports = {
	checkItemExists,
    createDirectory,
    cleanupFile,
	getFileContent
};
