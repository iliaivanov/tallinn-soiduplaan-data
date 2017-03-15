const cachier = require('./cachier');
const config = require('./../config/config');

cachier.cacheDataFiles().then((result) => {
    console.log('done');
}).catch((e) => {
    console.log(e);
});
