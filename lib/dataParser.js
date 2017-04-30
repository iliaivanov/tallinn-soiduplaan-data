'use strict';

const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, '/../config/config'));
const cachier = require(config.libDirPath + '/cachier');
const legacySource = require(config.libDirPath + '/original-source/souduplaan.tallinn.source');

let globalCachedFilesData = [];
let globalData = [];
let stops = [];
let routs = [];
let gps = [];
let cacheDir = config.dirs.cache;

let _readFilesData = () => {
    return new Promise((resolve, reject) => {
        let cachedFilesContent = [],
            filesSet = config.files;

        for (let i = 0; i < filesSet.length; i++) {
            let fileName = filesSet[i];
            let filePath = `${cacheDir}/${fileName}.txt`;

            if (fs.existsSync(filePath)) {
                cachedFilesContent[fileName] = fs.readFileSync(filePath, {encoding: 'utf8'});
            } else {
                reject(`No cache file specified for ${fileName}`);
            }
        }

        globalCachedFilesData = cachedFilesContent;
        resolve(cachedFilesContent);
    });
};

let _parseGps = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading gps data...');
        // TODO: globalCachedFilesData.gps
        resolve(true);
    });
};

let _parseRoutes = () => {
    return new Promise((resolve, reject) => {
        _parseStops().then((data) => {
			console.log('Loading routes...');
            legacySource.ti.routes = legacySource.loadRoutes(globalCachedFilesData.routes);

            globalData['routes'] = legacySource.ti.routes;
            resolve(legacySource.ti.routes);
        }, (error) => {
            reject(error);
        });
    });
};

let _parseStops = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading stops...');
        legacySource.loadStops(globalCachedFilesData.stops);

        globalData['stops'] = legacySource.ti.stops;
        resolve(legacySource.ti.stops);
    });
};

let _parseDataFiles = (cachedData) => {
    return new Promise((resolve, reject) => {
        
        // cachier.getCachedContent().then((cachedData) => {
            _parseRoutes(cachedData.routes).then((data) => {
                return _parseGps(cachedData.gps);
            }).then((data) => {
                resolve(globalData);
            }).catch((error) => {
                reject(error);
            });
        // }).catch((error) => {
        //     reject(error);
        // });
    });
};

let getParsedData = () => {
    console.log(1);
	return cachier.getCachedContent(true).then((cachedFilesData) => {
        console.log(2);
		return _parseDataFiles(cachedFilesData);
	}).then((filesContent) => {
        console.log(3);
        return new Promise((resolve, reject) => {
            // TODO: save to data dir!
            resolve(filesContent);
        });
    }).catch((e) => {
        console.log(4);
        throw e;
    });
};

module.exports = {
    getParsedData
};
