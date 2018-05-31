'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var swaggerJSDoc = require('swagger-jsdoc');
var logger = require('winston');

const swaggerUi = require('swagger-ui-express');

var app = express();


// Bootstrap application settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

var swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Charity-Service', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'Charity-Service API', // Description (optional)
  },
  basePath: '/api/', // Base path (optional)
};

//Options for the swagger docs
var options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ['./*.js', './lib/*.js'],
};

//Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.get('/', function(req, res) {
  res
    .status(200)
    .json('Welcome to Charity-Service, server time: ' + new Date());
});

// Routes
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', require('./routes/users') );
app.use('/api/charities', require('./routes/charities') );
app.use('/api/donations', require('./routes/donation.js') );


//
var port = process.env.PORT || process.env.VCAP_APP_PORT || 4000;

app.listen(port, function() {
  // eslint-disable-next-line
  logger.log('info', 'Server running on port: %d', port);
});
