'use strict';

const is = require('is_js');
const helper = require('../../../lib/helpers/sites-helper');

let Sites;

module.exports = (router, config) => {
	const URI = `${config.api.v1}/sites`;

	if (is.not.existy(Sites) || is.empty(Sites)) {
		Sites = new (require('../../../lib/Sites'))(config.database);
	}

	/**
	 * [fetch description]
	 *
	 * @param  {[type]} request  [description]
	 * @param  {[type]} response [description]
	 *
	 * @return {[type]}          [description]
	 */
	function fetch(request, response) {
		let query = helper.parseQuerystring(request.query);
		let limit = helper.parseLimit(request.query.limit);
		let offset = helper.parseOffset(request.query.offset);
		// let sort = helper.parseSort(request.query.sort);

		return Sites.fetch(query, limit, offset)
			.then(results => {
				return response.json(results);
			})
			.catch(err => {
				return response.json({error: err.message});
			});
	}

	/**
	 * [addPost description]
	 *
	 * @param {[type]} request  [description]
	 * @param {[type]} response [description]
	 *
	 * @return {void}
	*/
	function insert(request, response) {
		let raw = request.body;

		return Sites.insert(raw)
			.then((results) => {
				return response.json(results);
			})
			.catch(err => {
				return response.json({error: err.message});
			});
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

		return Sites.byId(siteId)
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

	/**
	 * [update description]
	 *
	 * @param  {[type]} request  [description]
	 * @param  {[type]} response [description]
	 *
	 * @return {[type]}          [description]
	 */
	function update(request, response) {
		let siteId = request.params.siteId;
		let raw = request.body;

		if (is.not.existy(siteId) || is.empty(siteId)) {
			return response.status(400).json({message: '`siteId` must be a valid id'});
		}

		return Sites.update(siteId, raw)
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

	router.get(`${URI}`, fetch);
	router.get(`${URI}/:siteId`, byId);

	router.patch(`${URI}/:siteId`, update);

	router.post(`${URI}`, insert);

	return router;
};
