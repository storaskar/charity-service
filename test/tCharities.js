var
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app')
	  expect = chai.expect;


chai.use(chaiHttp);

describe('Charities API', function () {

	before(function() {

  });


	it('charities API - GET /api/charities', function(done) {
    chai.request(app)
        .get('/api/charities')
        .end( (err, response) => {

            if (err) done(err);

            // check for status code
            expect(response.statusCode).to.equal(200);
            done();
		});
  });

});
