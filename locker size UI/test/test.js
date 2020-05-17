import app from './app';
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
    it('should return response on call', () => {
        return chai.request(app).get('/hello')
            .then(res => {
                chai.expect(res.text).to.eql("how's it going?");
            })
    })
})