const fs = require('fs');

let defaultFilePath = `${__dirname}/../tmp/test-file.js`;

let createTestFile = () => {
    fs.writeFileSync(defaultFilePath, 'dummy', { mode: '0777' });
};

let cleanUpTestFile = () => {
    fs.unlinkSync(defaultFilePath);  
};

module.exports = {
    createTestFile,
    cleanUpTestFile
};
