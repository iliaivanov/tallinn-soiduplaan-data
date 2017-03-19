const config = require('./../config/config');
const cachier = require('./cachier');
const dataParser = require('./dataParser');

cachier.cacheDataFiles().then((result) => {
    console.log('Cache created. Parsing...');

    return dataParser.getCachedData('routes');
}).then((filesContent) => {
    console.log(filesContent);
}).catch((e) => {
    // TODO: Probably should use exing cache here and throw error only if no cache exists? Also need to notify about that.
    console.log(e);
});

/**
В роутах первую линию можно использовать как маппер и брать номера позиций


*/
