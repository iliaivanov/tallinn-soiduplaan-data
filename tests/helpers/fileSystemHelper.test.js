const chai = require("chai");
const should = chai.should();
const chaiAsPromised = require("chai-as-promised");
 
chai.use(chaiAsPromised);

const {createTestFile, cleanUpTestFile} = require('./../seed/filesSeeder');
const config = require('./../../config/config');
const fsHelper = require(`${config.libDirPath}/helpers/fileSystemHelper`);

let testFile = `${__dirname}/../tmp/test-file.js`;

beforeEach('create test tmp file', createTestFile);
afterEach('clean up test tmp file', cleanUpTestFile);

describe('File system helpers', function() {

    it('should check item exists', function(done) {
        fsHelper.checkItemExists(testFile).should.eventually.equal(true).notify(done);
    });

    it('should clean up file', function(done) {
        fsHelper.cleanupFile(testFile).should.eventually.equal(true).notify(createTestFile).notify(done);
    });

    it('get file content', function(done) {
        fsHelper.getFileContent(testFile).should.eventually.equal('dummy').notify(done);
    });

    it.skip('skip this test', function () {
      // will be skiped.  
    });
    
});