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

var cleanupOldFiles = () => {
  for (var i = 0; i < config.files.length; i++) {
    var fileName = config.files[i],
        filePath = `${cacheDir}/${fileName}.txt`;

    fs.unlinkSync(filePath);
  }
}

var downloadFile = (fileName, url) => {
  var filePath = `${cacheDir}/${fileName}.txt`,
      cacheFile = fs.createWriteStream(filePath, {mode: '0777'});

  http.get(url, function(res) {
    if (res.statusCode === 200) {
      res.on('data', (chunk) => {
        fs.writeFileSync(filePath, chunk);
      });
    } else {
      console.log(`Error fetching data from: ${url}`);
    }
  });
};

var cacheDataFiles = () => {
  createDirectories();
  cleanupOldFiles();

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
