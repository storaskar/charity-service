var
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app')
	  expect = chai.expect;


chai.use(chaiHttp);

describe('Donations API', function () {

	before(function() {

  });

  /* TO BE EXPANDED */
	// it('donations API - GET /api/donations', function(done) {
  //   chai.request(app)
  //       .get('/api/userDonationSchema')
  //       .end( (err, response) => {
  //
  //           if (err) done(err);
  //
  //           // check for status code
  //           expect(response.statusCode).to.equal(200);
  //           done();
	// 	});
  // });

});
