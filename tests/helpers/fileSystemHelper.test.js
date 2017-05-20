const chai = require("chai");
const should = chai.should();
const chaiAsPromised = require("chai-as-promised");
 
chai.use(chaiAsPromised);

const {createTestFile, cleanUpTestFile} = require('./../seed/filesSeeder');
const config = require('./../../config/config');
const fsHelper = require(`${config.libDirPath}/helpers/fileSystemHelper`);

let testFile = `${__dirname}/../tmp/test-file.js`;

beforeEach(createTestFile);
afterEach(cleanUpTestFile);

describe('File system helpers', function() {

    it('should check item exists', function(done) {
        fsHelper.checkItemExists(testFile).should.eventually.equal(true).notify(done);

        // With expect lib it will be:
        // fsHelper.checkItemExists(testFile).then((result) => {
        //     expect(result).toBe(true);
        //     done();
        // }).catch((err) => {            
        //     done(err);
        // });
    });

    it('should clean up file', function(done) {
        fsHelper.cleanupFile(testFile).should.eventually.equal(true).notify(createTestFile).notify(done);

        // With expect lib it will be:
        // fsHelper.cleanupFile(testFile).then(() => {
        //     createTestFile();
        //     done();
        // }).catch((err) => {
        //     done(err);
        // });
    });

    it('get file content', function(done) {
        fsHelper.getFileContent(testFile).should.eventually.equal('dummy').notify(done);

        // With expect lib it will be:
        // fsHelper.getFileContent(testFile).then((content) => {
        //     content.should.equal('dummy');
        //     done();
        // }).catch((err) => {
        //     done(err);
        // });
    });
    
});