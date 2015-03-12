/*
	Send fake log files to Overwatch. This is helpful for testing.
	
	Set the dyno number to be higher than the number of dynos you have 
	if you don't want it to actually restart anything.
*/

var request = require('request');

console.log("Making overwatch panic!");

var username = "";		// Username
var password = "";		// Password
var overwatchUrl = ""	// Overwatch app URL
var dyno = 1;			// The dyno we want to force a restart on

var options = {
	url: overwatchUrl,
	method: "POST",
	'auth': {
		'user': username,
		'pass': password,
		'sendImmediately': false
	},
	headers: {
		'content-type': 'application/logplex-1'
	},
	body: "18:32:10.510 2015-01-04 18:32:10.006047+00:00 heroku router - - at=error code=H12 desc=\"Request timeout\" method=GET path=\"/\" host=some.website.com request_id=1234-1234-1234-1234 fwd=\"1.2.3.4\" dyno=web." + dyno + " connect=1ms service=30000ms status=503 bytes=0\n"
};

request(options, function(error, response, body) {
	request(options, function(error, response, body) {
		request(options, function(error, response, body) {
			request(options, function(error, response, body) {
				request(options, function(error, response, body) {
					console.log("Done!");
				});
			});
		});
	});
});