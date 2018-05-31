'use strict';

require('dotenv').config();

var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('winston');

var router = express.Router();

/**
  mongo connect
*/
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, (err) => {
   if (err) throw err;
   logger.info('Successfully connected to MONGO');
});

/**
  UserDonation Schema
  */
var userDonationSchema = mongoose.Schema({
  userId: String,
  charityName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});
var UserDonationModel= mongoose.model('donations', userDonationSchema);

router.post('/', (req, res, next) => {

  var userDonation = new UserDonationModel({
    userId: req.query.userId,
    charityName: req.query.charityName,
    amount: req.query.amount
  });

  userDonation.save( (err) => {
    if (err) {
        logger.error(err);
    } else {
      logger.log('info', 'User donation has been saved!');
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify( { message: 'User donation has been saved' }));
      res.end();
    }
  })
})


/**
  Get donation for userId
  */
router.get('/:id', (req, res, next) => {
  UserDonationModel.find( {userId: req.params.id },  (err, donations)  => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(donations));
      res.end();
    }
  })
});


/**
  Delete donation by id
  */
router.delete('/:id', (req, res, next) => {
  UserDonationModel.findByIdAndRemove(  req.params.id ,  (err)  => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write("Donation deleted with id: " + req.params.id);
      res.end();
    }
  })
});

module.exports = router;
