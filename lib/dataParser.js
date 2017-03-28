'use strict';

const fs = require('fs');

const config = require('./../config/config');
const cachier = require(config.libDirPath + '/cachier');
const legacySource = require(config.libDirPath + '/original-source/souduplaan.tallinn.source');

var globalCachedFilesData = [],
    globalData = [],
    stops = [],
    routs = [],
    gps = [],
    cacheDir = config.dirs.cache;

var readFilesData = () => {
    return new Promise((resolve, reject) => {
        var cachedFilesContent = [],
            filesSet = config.files;

        for (var i = 0; i < filesSet.length; i++) {
            var fileName = filesSet[i],
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

var parseGps = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading gps data...');
        // TODO: globalCachedFilesData.gps
        resolve(true);
    });
};

var parseRoutes = () => {
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

var parseStops = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading stops...');
        legacySource.loadStops(globalCachedFilesData.stops);

        globalData['stops'] = legacySource.ti.stops;
        resolve(legacySource.ti.stops);
    });
};

var parseDataFiles = (dataSet) => {
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

var getCachedData = () => {
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
