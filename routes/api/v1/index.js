'use strict';

module.exports = (router, config) => {
	const API_URL = config.api.v1;

	function index(request, response) {
		return response.json({path: API_URL});
	}

	router.get(`${API_URL}`, index);

	return router;
};
