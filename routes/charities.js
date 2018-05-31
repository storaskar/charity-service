var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('winston');

var router = express.Router();

/**
  mongo connect
*/
mongoose.connect('mongodb://localhost/charity_db', (err) => {
   if (err) throw err;
   logger.log('Successfully connected');
});

/**
  Charity Schema
  */
var charitySchema = mongoose.Schema({
  name: String,
  city: String,
  state: String
});
var CharityModel= mongoose.model('charities', charitySchema);

/**
  List all Charities
  */
router.get('/', (req, res, next) => {
  CharityModel.find( { },  (err, charities)  => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(charities));
      res.end();
    }
  })
});

/**
  Get Charity by id
  */
router.get('/:id', (req, res, next) => {
  CharityModel.findOne( {_id: req.params.id },  (err, charity)  => {
    if (err) {
        logger.error(err);
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(charity));
      res.end();
    }
  })
});

module.exports = router;
