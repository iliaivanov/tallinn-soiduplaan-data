const expect = require('expect');
const {createTestFile, cleanUpTestFile} = require('./../seed/filesSeeder');
const config = require('./../../config/config');
const fsHelper = require(`${config.libDirPath}/helpers/fileSystemHelper`);

let testFile = `${__dirname}/../tmp/test-file.js`;

beforeEach(createTestFile);
afterEach(cleanUpTestFile);

describe('File system helpers', () => {
    
    it('should check item exists', (done) => {
        fsHelper.checkItemExists(testFile).then((result) => {
            expect(result).toBe(true);
            done();
        }).catch((err) => {            
            done(err);
        });
    });

    it('should clean up file', (done) => {
        fsHelper.cleanupFile(testFile).then(() => {
            createTestFile();
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('get file content', (done) => {
        fsHelper.getFileContent(testFile).then((content) => {
            expect(content).toBe('dummy');
            done();
        }).catch((err) => {
            done(err);
        });
    });

});