'use strict';

const fs = require('fs');

var createDirectories = (dirs) => {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < dirs.length; i++) {
			if (!fs.existsSync(dirs[i])){
				console.log(`Creating directory ${dirs[i]}`);
				fs.mkdirSync(dirs[i]);
			}
		}

		resolve(true);
	});
};

var cleanupFiles = (dir, files) => {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < files; i++) {
		  	var fileName = files[i],
		  		filePath = `${dir}/${fileName}.txt`;

		  	if (fs.existsSync(filePath)) {
		  		fs.unlinkSync(filePath);
		  	}
	    }

		resolve(true);
	});
}

module.exports = {
    createDirectories,
    cleanupFiles
};
