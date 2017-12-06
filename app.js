'use strict';

const config = require('./config');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.all('*', (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	return next();
});

server.use('/', require('./routes/index')(express.Router(), config));

server.listen(config.application.port, () => {
	console.log(`Scrilio API Server listening on port ${config.application.port}!`);
});
