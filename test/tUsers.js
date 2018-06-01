var
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app')
	  expect = chai.expect;


chai.use(chaiHttp);

describe('Users API', function () {
  let userId = "";
  let user = {
    "userName": "test",
    "password": "test",
    "firstName": "test",
    "lastName": "test"
  }
	before(function() {
    console.log("Server started...");
  });


	it('users API - POST /api/users/create', function(done) {
    chai.request(app)
        .post('/api/users/create')
        .send(user)
        .end( (err, response) => {

            if (err) done(err);

            // check for status code
            expect(response.statusCode).to.equal(200);
            done();
		});
  });

  it('users API - POST /api/users/authenticate', function(done) {
    let authUser = {
      "userName": "test",
      "password": "test",
    }
    chai.request(app)
        .post('/api/users/authenticate')
        .send(authUser)
        .end( (err, response) => {

            if (err) done(err);

            // check for status code
            expect(response.statusCode).to.equal(200);
            expect(response.body.userName).to.equal(authUser.userName);

            userId = response.body._id;
            done();
    });
  });

  it('users API - DELETE /api/users/', function(done) {
    chai.request(app)
        .delete('/api/users/' + userId)
        .end( (err, response) => {

            if (err) done(err);

            // check for status code
            expect(response.statusCode).to.equal(200);

            done();
    });

  });
});
