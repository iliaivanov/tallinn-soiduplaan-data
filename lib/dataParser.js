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

            // TODO: should be some better way...
            switch(dataSet) {
                case 'stops':
                    parseStops().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                case 'routes':
                    parseRoutes().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                case 'gps':
                    parseGps().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                default:
                    parseRoutes(cachedData.routes).then((data) => {
                        return parseGps(cachedData.gps);
                    }).then((data) => {
                        resolve(globalData);
                    }).catch((error) => {
                        reject(error);
                    });
                    break;
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

// TODO: Add new param resetCache - will recreate cache files. Will read from data files (if they exists) when no need to reset cached files.
var getCachedData = (dataSet) => {
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

    // return cachier.cacheDataFiles().then((result) => {
    //     console.log('Cache created. Parsing...');
	//
    //     return parseDataFiles(dataSet);
    // }).then((filesContent) => {
    //     return new Promise((resolve, reject) => {
    //         // TODO: save to data dir!
    //         resolve(filesContent);
    //     });
    // }).catch((e) => {
    //     throw e;
    // });
};

module.exports = {
    getCachedData,
    cachier
};
