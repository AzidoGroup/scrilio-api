'use strict';
const basicAuth = require('basic-auth');
const express = require('express');

module.exports = (app, config) => {
	let v1 = express.Router();
	v1.use('/api', (request, response, next) => {
		let user = basicAuth(request);
		console.log(user, config.application.auth);
		if (user && user.name === config.application.auth.username && user.pass === config.application.auth.password) {
			return next();
		}
		response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		return response.status(401).end('Authorization Required');
	});

	require('./api/v1')(v1, config);

	app.use(v1);

	return app;
};
