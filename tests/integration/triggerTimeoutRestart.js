/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

require('chai').should();

var request = require('request');


describe('Given a timeout happen on one dyno on the app', function(done) {
	it("Everything is fine", function(done) {

		var options = {
			url: "http://localhost:3000/logs",
			method: "POST",
			'auth': {
				'user': process.env.BASIC_AUTH_USERNAME,
				'pass': process.env.BASIC_AUTH_PASSWORD,
				'sendImmediately': false
			},
			headers: {
				'content-type': 'application/logplex-1'
			},
			body: "18:32:10.510 2015-01-04 18:32:10.006047+00:00 heroku router - - at=error code=H12 desc=\"Request timeout\" method=GET path=\"/\" host=app.name.here request_id=1234-1234-1234-1234 fwd=\"1.2.3.4\" dyno=web.1 connect=1ms service=30000ms status=503 bytes=0\n"
		};

		request(options, function(error, response, body) {
			request(options, function(error, response, body) {
				request(options, function(error, response, body) {
					request(options, function(error, response, body) {
						request(options, function(error, response, body) {
							expect(response.statusCode).to.equal(200);
							setTimeout(function() {
								done();
							}, 1000);
						});
					});
				});
			});
		});
	});
});