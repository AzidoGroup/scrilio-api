'use strict';

const helper = require('../../../../lib/helpers/common-helper');
const should = require('should'); // eslint-disable-line

describe('Helpers: common-helper: parseOrderBy', function () {

	let invalid = [
		{value: undefined, label: 'undefined'},
		{value: null, label: 'null'},
		{value: [], label: 'array:empty'},
		{value: [1, 2, 4], label: 'array:non-empty'},
		{value: {}, label: 'object:empty'},
		{value: {foo: 'bar'}, label: 'object:non-empty'}
	];

	invalid.forEach(test => {
		it(`should return the default value if ${test.label} is provided`, done => {
			let sort = helper.parseOrderBy(test.value);
			sort.should.eql(helper.DEFAULTS.ORDER_BY);
			return done();
		});
	});

	let valid = [
		{
			value: 'value',
			label: 'ascending `value`',
			expected: [
				{field: 'value', order: 'asc'}
			]
		},
		{
			value: '-value',
			label: 'descending `value`',
			expected: [
				{field: 'value', order: 'desc'}
			]
		},
		{
			value: '-value,type',
			label: 'descending `value` ascending `type`',
			expected: [
				{field: 'value', order: 'desc'},
				{field: 'type', order: 'asc'}
			]
		},
		{
			value: '-value,-type',
			label: 'descending `value` descending `type`',
			expected: [
				{field: 'value', order: 'desc'},
				{field: 'type', order: 'desc'}
			]
		}
	];

	valid.forEach(test => {
		it(`should return a valid sort object if givin a ${test.label}`, done => {
			let sort = helper.parseOrderBy(test.value);
			sort.should.deepEqual(test.expected);
			return done();
		});
	});
});
