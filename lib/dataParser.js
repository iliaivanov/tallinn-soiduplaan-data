'use strict';

const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, '/../config/config'));
const cachier = require(config.libDirPath + '/cachier');
const legacySource = require(config.libDirPath + '/original-source/souduplaan.tallinn.source');

let globalData = [];
let stops = [];
let routs = [];
let gps = [];
let cacheDir = config.dirs.cache;

/**
 * TBD!
 * Parse GPS data.
 * @param {string} cachedData 
 * @return {Promise} with parsed stops data
 */
let _parseGps = (cachedData) => {
    console.log('Loading gps data...');
    try {
        // TODO: load gps data
    } catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve({});
};

/**
 * Parse routes.
 * NB! Routes should be parsed before!
 * @param {string} cachedData 
 * @return {Promise} with parsed stops data
 */
let _parseRoutes = (cachedData) => {
    console.log('Loading routes...');
    try {
        legacySource.ti.routes = legacySource.loadRoutes(cachedData.routes);
    } catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve(legacySource.ti.routes);
};

/**
 * Parse stops.
 * @param {string} cachedData 
 * @return {Promise} with parsed stops data
 */
let _parseStops = (cachedData) => {
    console.log('Loading stops...');
    try {
        legacySource.loadStops(cachedData.stops);
    } catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve(legacySource.ti.stops);
};

/**
 * Parse cached data into json.
 * @param {string} cachedData 
 * @return {Promise} with all parsed data
 */
let _parseDataFiles = (cachedData) => {
    return _parseStops(cachedData).then((stopsData) => {
        globalData['stops'] = stopsData;
        return _parseRoutes(cachedData);  
    }).then((routesData) => {
        globalData['routes'] = routesData;
        return _parseGps(cachedData);
    }).then((gpsData) => {
        return Promise.resolve(globalData);
    }).catch((error) => {
        return Promise.reject(error);
    });
};

/**
 * Get cached schedule.
 * Will return big data array with stops, routes and gps data.
 * @param {bool} forceFilesUpdate 
 * @return {Promise} with parsed schedule content
 */
let getParsedData = (forceFilesUpdate) => {
	return cachier.cacheDataFiles(forceFilesUpdate).then((cachedFilesData) => {
		return _parseDataFiles(cachedFilesData);
	}).then((filesContent) => {
        // TODO: save to data dir!
        return Promise.resolve(filesContent);
    }).catch((e) => {
        return Promise.reject(e);
    });
};

module.exports = {
    getParsedData
};
