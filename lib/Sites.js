'use strict';

const is = require('is_js');
const knex = require('knex');
const helper = require('./helpers/sites-helper');

let conn;
let table;

class Sites {
	/**
	 * [constructor description]
	 *
	 * @param  {[type]} config [description]
	 *
	 */
	constructor(config) {
		this.DEFAULTS = helper.DEFAULTS;
		if (is.not.existy(conn) || is.empty(conn)) {
			table = `${config.prefix}sites`;
			conn = knex(config);
		}
	}

	/**
	 * Gets a Site by its `id`
	 *
	 * @param  {number} id Site id
	 *
	 * @return {Object} Resolves to a Site record
	 */
	byId(id) {
		return conn(table).where({id}).limit(1)
			.then(res => {
				if (is.not.existy(res) || is.empty(res)) {
					// return an empty body
					return {};
				}
				// return the first record because `knex` doesn't allow for
				// returning just a single record back
				return res[0];
			});
	}

	/**
	 * [fetch description]
	 *
	 * @param  {Object} query something
	 * @param  {number} limit some limit
	 * @param  {number} offset some offset
	 *
	 * @return {[type]} [description]
	 */
	fetch(query, limit, offset) {
		limit = limit || this.DEFAULTS.LIMIT;
		offset = offset || this.DEFAULTS.OFFSET;

		return conn(table).where(query).limit(limit).offset(offset);
	}

	/**
	 * [insert description]
	 *
	 * @param  {[type]} raw [description]
	 * @return {[type]}     [description]
	 */
	insert(raw) {
		let validation = helper.validateSite(raw);
		if (is.error(validation.error)) {
			return Promise.reject(validation.error);
		}

		return conn(table).insert(validation.value)
			.then(results => {
				return this.byId(results[0]);
			});
	}

	/**
	 * [update description]
	 *
	 * @param  {[type]} id  [description]
	 * @param  {[type]} raw [description]
	 * @return {[type]}     [description]
	 */
	update(id, raw) {

		return conn(table).update(raw).where({id})
			.then(() => {
				return this.byId(id);
			});
	}

	/**
	 * [random description]
	 *
	 * @return {[type]} [description]
	 */
	random() {
		return conn(table).orderByRaw('RAND()');
	}

	/**
	 * [destroy description]
	 *
	 * @return {[type]} [description]
	 */
	destroy() {
		return conn.destroy();
	}
}

module.exports = Sites;
