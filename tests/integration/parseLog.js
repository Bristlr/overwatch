/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

require('chai').should();

var request = require('request');

describe('Given I POST some log files not from logplex', function(done) {
	it("I geta  400 error", function(done) {

		var options = {
			url: "http://localhost:3000/logs",
			method: "POST",
			'auth': {
				'user': 'username',
				'pass': 'password',
				'sendImmediately': false
			},
			body: "Log text here"
		};

		request(options, function(error, response, body) {
			expect(response.statusCode).to.equal(400);
			done();
		});
	});
});


describe('Given I POST some log files from logplex', function(done) {
	it("Everything is fine", function(done) {

		var options = {
			url: "http://localhost:3000/logs",
			method: "POST",
			'auth': {
				'user': 'username',
				'pass': 'password',
				'sendImmediately': false
			},
			headers: {
				'content-type': 'application/logplex-1'
			},
			body: "Log text here"
		};

		request(options, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
});