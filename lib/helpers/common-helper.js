'use strict';

const is = require('is_js');

const DEFAULTS = {
	LIMIT: 20,
	OFFSET: 0,
	ORDER_BY: [
		{ field: 'id', order: 'asc'}
	]
};

/**
 * Attempts to transmute a raw limit into a valid numeric limit
 *
 * @param  {number|string} raw               A raw limit value
 * @param  {number} _default=DEFAULTS.LIMIT  A default value to use
 *
 * @return {number} a valid limit value
 */
function parseLimit(raw, _default = DEFAULTS.LIMIT) {
	if (is.not.existy(raw) || is.array(raw) || is.not.integer(Number(raw))) {
		return _default;
	}

	return Number(raw);
}

/**
 * Attempts to transmute a raw offset into a valid numeric offset
 *
 * @param {number|string} raw                A raw offset value
 * @param {number} _default=DEFAULTS.OFFSET  A default value to use
 *
 * @return {number} A valid offset value
 */
function parseOffset(raw, _default = DEFAULTS.OFFSET) {
	if (is.not.existy(raw) || is.not.integer(Number(raw))) {
		return _default;
	}

	return Number(raw);
}

/**
 * Attempts to transmute a querystring order by value into a valid order by array
 *
 * Usually, the querystring value will look similar to:
 * /sites/?orderBy=name,-id
 *
 * Which should be converted to:
 * [
 *  {field: 'name', order: 'asc'},
 *  {field: 'id', order: 'desc'}
 * ]
 *
 * @param  {string} raw                         A raw order by value
 * @param  {number} _default=DEFAULTS.ORDER_BY  A default value to use
 *
 * @return {Array<Object>} An array of value order by objects
 */
function parseOrderBy(raw, _default = DEFAULTS.ORDER_BY) {
	// test for existence
	if (is.not.existy(raw) || is.empty(raw) || is.not.string(raw)) {
		return _default;
	}

	let orderBy = [];
	// split the order by values and loop through each one
	raw.split(',').forEach(value => {
		let obj = {};
		// @TODO make this cleaner...
		// test for negavite (`descending`) values
		if (value.includes('-')) {
			obj.field = value.replace(/-/g, '');
			obj.order = 'desc';
		} else {
			// otherwise assume it's ascending
			obj.field = value;
			obj.order = 'asc';
		}
		orderBy.push(obj);
	});

	return orderBy;
}

module.exports = {
	DEFAULTS,
	parseLimit,
	parseOffset,
	parseOrderBy
};
