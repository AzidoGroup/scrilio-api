'use strict';

const config = require('../config').database;
const {ENUMS: SITE_ENUMS} = require('../lib/helpers/sites-helper');
const {ENUMS: MODEL_ENUMS} = require('../lib/helpers/models-helper');

exports.up = knex => {
	return knex.schema
		// create the sites table first
		.createTableIfNotExists(`${config.prefix}sites`, table => {
			table.increments('id').primary();
			table.string('name', 255).unique().notNullable();
			table.string('display', 255).notNullable();
			table.string('metaDescription', 255).nullable();
			table.text('description', 'text').nullable();
			table.enu('status', SITE_ENUMS.STATUS).notNullable().defaultTo(SITE_ENUMS.STATUS[0]);
			table.index('status', 'status_index');
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		})
		.createTableIfNotExists(`${config.prefix}scenes`, table => {
			table.increments('id').primary();
			table.string('title', 255).notNullable();
			table.text('description').nullable();
			table.boolean('featured').defaultTo(false);
			table.enu('status', ['UNPUBLISHED', 'READY', 'PUBLISHED']).defaultTo('UNPUBLISHED');
			table.date('productionDate').nullable();
			table.date('punlishDate').nullable();
			table.integer('siteId').unsigned();
			table.foreign('siteId').references('id').inTable(`${config.prefix}sites`);
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		})
		.createTableIfNotExists(`${config.prefix}models`, table => {
			table.increments('id').primary();
			table.string('name', 255).notNullable();
			table.string('display', 255).notNullable();
			table.enu('status', MODEL_ENUMS.STATUS).defaultTo(MODEL_ENUMS.STATUS[0]);
			table.text('bio').nullable();
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		});
};

exports.down = knex => {
	return knex.schema
		.dropTable(`${config.prefix}sites`)
		.dropTable(`${config.prefix}scenes`)
		.dropTable(`${config.prefix}models`);
};
