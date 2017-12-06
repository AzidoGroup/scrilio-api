'use strict';

const is = require('is_js');
const Site = require('../../../lib/Sites');
let Sites;

module.exports = (router, config) => {
	const API_SITES_URL = `${config.api.v1}/sites`;
	console.log(API_SITES_URL);
	if (is.not.existy(Sites) || is.empty(Sites)) {
		Sites = new Site(config.database);
	}

	function index(request, response) {
		return response.json({path: API_SITES_URL});
	}

	/**
	 * Attempts to fetch a single site record from the database by the site id
	 *
	 * @param  {Object} request   An express Request Object
	 * @param  {Object} response  An express Response Object
	 *
	 * @return {void}
	 */
	function byId(request, response) {
		let siteId = request.params.siteId;
		if (is.not.existy(siteId) || is.empty(siteId)) {
			return response.status(400).json({message: '`siteId` must be a valid id'});
		}

		Sites.byId(siteId)
			.then(results => {
				if (is.not.existy(results) || is.empty(results)) {
					return response.status(404).json({});
				}
				return response.json(results);
			})
			.catch(err => {
				return response.status(500).json({message: err.message});
			});
	}

	router.get(`${API_SITES_URL}`, index);
	router.get(`${API_SITES_URL}/:siteId`, byId);
	return router;
};
