'use strict';

const is = require('is_js');
const Joi = require('joi');

const DEFAULTS = {
	LIMIT: 20,
	OFFSET: 0,
	ORDER_BY: [
		{
			field: 'name',
			order: 'asc'
		}
	]
};

const ENUMS = {
	STATUS: ['ACTIVE', 'DISABLED', 'DELETED']
};

/**
 * [parseQuery description]
 *
 * @param  {[type]} raw [description]
 *
 * @return {[type]}     [description]
 */
function parseQuerystring(raw) {
	let query = {};

	if (is.not.object(raw)) {
		return query;
	}

	if (is.existy(raw.name)) {
		if (is.string(raw.name)) {
			query.name = raw.name;
		}
	}

	if (is.existy(raw.status)) {
		if (is.string(raw.status)) {
			query.status = raw.status;
		}
	}

	return query;
}
/**
 * [validateSite description]
 *
 * @param  {[type]} raw [description]
 *
 * @return {[type]}     [description]
 */
function validateSite(raw) {
	let schema = Joi.object({
		name: Joi.string().uppercase().alphanum().max(255).required(),
		display: Joi.string().max(255).required(),
		metaDescription: Joi.string().max(255).optional(),
		description: Joi.string().optional(),
		status: Joi.string().allow(ENUMS.STATUS).uppercase().default(ENUMS.STATUS[0]).optional()
	}).options({
		allowUnknown: true,
		stripUnknown: false
	});

	return schema.validate(raw);
}

module.exports = {
	DEFAULTS,
	ENUMS,
	parseQuerystring,
	validateSite
};
