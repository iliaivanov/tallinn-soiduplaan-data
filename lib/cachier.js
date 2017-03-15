const http = require('http');
const fs = require('fs');

const config = require('./../config/config');

var cacheDir = config.dirs.cache,
    dataDir = config.dirs.data;

// Should return promise!

var createDirectories = () => {
  var dirs = [cacheDir, dataDir];

  for (var i = 0; i < dirs.length; i++) {
    console.log(`Creating directory ${dirs[i]}`);

    if (!fs.existsSync(dirs[i])){
        fs.mkdirSync(dirs[i]);
    }
  }
};

var downloadFile = (fileName, url) => {
  var filePath = `${cacheDir}/${fileName}.txt`,
      cacheFile = fs.createWriteStream(filePath, {mode: '0777'});

  http.get(url, function(response) {
    response.pipe(filePath);
  });
};

var cacheDataFiles = () => {
  for (var i = 0; i < config.files.length; i++) {
    var fileName = config.files[i];

    if (config.routes[fileName]) {
      downloadFile(fileName, config.routes[fileName]);
    } else {
      console.log(`No route specified for ${fileName}`);
    }
  }
};

module.exports = {
  cacheDataFiles
};
