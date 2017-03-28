'use strict';

const fs = require('fs');

let createDirectory = (dir) => {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		resolve(true);
	});
};

let cleanupFiles = (dir, files) => {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < files; i++) {
		  	let fileName = files[i],
		  		filePath = `${dir}/${fileName}.txt`;

		  	if (fs.existsSync(filePath)) {
		  		fs.unlinkSync(filePath);
		  	}
	    }

		resolve(true);
	});
}

module.exports = {
    createDirectory,
    cleanupFiles
};
