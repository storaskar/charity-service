var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var logger = require('winston');

var router = express.Router();

/**
  mongo connect
*/
mongoose.connect('mongodb://localhost/charity_db', (err) => {
   if (err) throw err;
   logger.log('Successfully connected');
});

/**
  User Schema
  */
var userSchema = mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  emailAddress: String
});
var UserModel = mongoose.model('users', userSchema);

/*
TODO - remove this*/
router.get('/', (req, res, next) => {

  UserModel.find( { }, (err, users) => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(users));
      res.end();
    }
  })
});

/**
  Get the user
*/
router.get('/:id', (req, res, next) => {
  UserModel.findOne( { _id: req.params.id } , (err, user) => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(user));
      res.end();
    }
  })
});

/**
  Change password
*/
router.post('/changePassword', (req, res, next) => {
  let userId = req.body.userId;
  let password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    password = hash;
    UserModel.update( { _id: userId }, {password: password}, (err, user) => {
      if (err) {
          logger.error(err);
      } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(user));
        res.end();
      }
    })
  })
});


/**
  Authenticate the user
*/
router.post('/authenticate', (req, res, next) => {
  let userName = req.body.userName;
  let password = req.body.password;

  UserModel.findOne({ userName: userName }, (err, user) =>  {
    if (err) {
      return next(err);
    }
    else if (!user) {
      res.writeHead(401, {"Content-Type": "application/json"});
      res.end();
    }
    else {
      bcrypt.compare(password, user.password,  (err, result) => {
        if ( !result ) {
          res.writeHead(403, {"Content-Type": "application/json"});
          res.end();
        } else {
          res.writeHead(200, {"Content-Type": "application/json"});
          res.write(JSON.stringify(user));
          res.end();
        }
      })
    }
  }) ;
})

/**
  Create the user
*/
router.post('/create', (req, res, next) => {
  var user = new UserModel({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  UserModel.findOne({ userName: user.userName }, (err, found) =>  {
    if (err) {
      return next(err);
    }
    else if (!found) {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        user.save( (err) => {
          if (err) {
              logger.error(err);
          } else {
            logger.log('info', 'User profile has been saved!');
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify( { message: 'User profile has been saved' }));
            res.end();
          }
        });
      });
    } else {
        res.status(406).send({ message: 'Username already exists!' })
    }
  });
})


module.exports = router;
