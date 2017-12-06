'use strict';

const is = require('is_js');
const knex = require('knex');
const helper = require('./helpers/sites-helper');

let conn;
let table;

const DEFAULTS = {
	LIMIT: 20,
	OFFSET: 0
};

class Sites {
	/**
	 * [constructor description]
	 *
	 * @param  {[type]} config [description]
	 *
	 */
	constructor(config) {
		this.DEFAULTS = DEFAULTS;
		if (is.not.existy(conn) || is.empty(conn)) {
			table = `${config.prefix}sites`;
			conn = knex(config);
		}
	}

	byId(id) {
		return conn(table).where({id}).limit(1)
			.then(res => {
				if (is.existy(res) && is.not.empty(res)) {
					return res[0];
				}
				return res;
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

		return conn(table).insert(validation.value);
	}

	/**
	 * [update description]
	 *
	 * @param  {[type]} id  [description]
	 * @param  {[type]} raw [description]
	 * @return {[type]}     [description]
	 */
	update(id, raw) {
		return conn(table).update(raw).where({id});
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
		conn.destroy();
	}
}

module.exports = Sites;
