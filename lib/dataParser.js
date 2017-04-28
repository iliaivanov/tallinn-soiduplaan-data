'use strict';

const fs = require('fs');

const config = require(path.join(__dirname, '/../config/config'));
const cachier = require(config.libDirPath + '/cachier');
const legacySource = require(config.libDirPath + '/original-source/souduplaan.tallinn.source');

let globalCachedFilesData = [];
let globalData = [];
let stops = [];
let routs = [];
let gps = [];
let cacheDir = config.dirs.cache;

let readFilesData = () => {
    return new Promise((resolve, reject) => {
        let cachedFilesContent = [],
            filesSet = config.files;

        for (let i = 0; i < filesSet.length; i++) {
            let fileName = filesSet[i],
                filePath = `${cacheDir}/${fileName}.txt`;

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

let parseGps = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading gps data...');
        // TODO: globalCachedFilesData.gps
        resolve(true);
    });
};

let parseRoutes = () => {
    return new Promise((resolve, reject) => {
        parseStops().then((data) => {
			console.log('Loading routes...');
            legacySource.ti.routes = legacySource.loadRoutes(globalCachedFilesData.routes);

            globalData['routes'] = legacySource.ti.routes;
            resolve(legacySource.ti.routes);
        }, (error) => {
            reject(error);
        });
    });
};

let parseStops = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading stops...');
        legacySource.loadStops(globalCachedFilesData.stops);

        globalData['stops'] = legacySource.ti.stops;
        resolve(legacySource.ti.stops);
    });
};

let parseDataFiles = (dataSet) => {
    return new Promise((resolve, reject) => {
        
        readFilesData().then((cachedData) => {
            parseRoutes(cachedData.routes).then((data) => {
                return parseGps(cachedData.gps);
            }).then((data) => {
                resolve(globalData);
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
};

let getCachedData = () => {
	return cachier.loadCachedFiles(true).then((cachedFilesData) => {
		return parseDataFiles(cachedFilesData);
	}).then((filesContent) => {
        return new Promise((resolve, reject) => {
            // TODO: save to data dir!
            resolve(filesContent);
        });
    }).catch((e) => {
        throw e;
    });
};

module.exports = {
    getCachedData,
    cachier
};
