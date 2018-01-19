'use strict';

const helper = require('../../../../lib/helpers/sites-helper');
const should = require('should'); // eslint-disable-line

describe('Helpers: site-helper: validateSite', function () {

	let invalid = [
		{value: undefined, label: 'undefined'},
		{value: null, label: 'null'},
		{value: [], label: 'array:empty'},
		{value: [1, 2, 4], label: 'array:non-empty'},
		{value: {}, label: 'object:empty'},
		{value: {foo: 'bar'}, label: 'object:non-empty'}
	];

	invalid.forEach(test => {
		it(`should return an error if ${test.label} is provided`, done => {
			let {error} = helper.validateSite(test.value);
			error.should.be.Error();
			return done();
		});
	});
});
