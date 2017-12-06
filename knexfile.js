'use strict';
let config = require('./config').database;
// Update with your config settings.

module.exports = {

	development: {
		client: config.client,
		// debug: true,
		connection: config.connection,
		migrations: config.migrations,
		prefix: config.prefix
	},
	production: {
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			database: 'knex_test'
		},
		migrations: {
			tableName: 'migrations'
		}
	}
};
