'use strict';

const helper = require('../../../../lib/helpers/common-helper');
const should = require('should');

describe('Helpers: common-helper: parseLimit', function () {

	let invalid = [
		{value: undefined, label: 'undefined'},
		{value: null, label: 'null'},
		{value: 'string', label: 'string'},
		{value: [], label: 'array:empty'},
		{value: [1, 2, 4], label: 'array:non-empty'},
		{value: {}, label: 'object:empty'},
		{value: {foo: 'bar'}, label: 'object:non-empty'}
	];

	invalid.forEach(test => {
		it(`should return the default value if ${test.label} is provided`, done => {
			let limit = helper.parseLimit(test.value);
			limit.should.eql(helper.DEFAULTS.LIMIT);
			return done();
		});
	});

	let valid = [
		{value: 66, label: 'number', expected: 66},
		{value: '66', label: 'string number', expected: 66}
	];

	valid.forEach(test => {
		it(`should return a valid number if givin a ${test.label}`, done => {
			let limit = helper.parseLimit(test.value);
			limit.should.eql(test.expected);
			return done();
		});
	});
});
