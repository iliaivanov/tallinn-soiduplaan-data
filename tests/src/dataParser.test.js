const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const config = require('./../../config/config');
const dataParser = require(`${config.srcDirPath}/dataParser`);

describe('Data parser', () => {
    
    it.skip('should parse data files into json', (done) => {
        dataParser.getParsedData(true).should.eventually.to.be.a('json').notify(done);
    });
    
});

