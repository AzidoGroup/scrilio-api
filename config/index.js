'use strict';
const config = require('./config.json');

module.exports = {
	api: config.api,
	application: config.application,
	database: config.database
};
