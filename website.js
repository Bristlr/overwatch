console.log("Starting Overwatch");

// Express
console.log("Express starting");
var express = require("express"),
	app = express(),
	auth = require('basic-auth');

// Basic auth
app.use(function(req, res, next) {
	var user = auth(req);

	if (user === undefined || user['name'] !== process.env.BASIC_AUTH_USERNAME || user['pass'] !== process.env.BASIC_AUTH_PASSWORD) {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
		res.end('Unauthorized');
	} else {
		next();
	}
});

// An end point so you can make sure the server is ok
app.get('/', function(request, response) {
	response.send("Hello");
});

// custom body parser
app.use(function(req, res, next) {
	var data = "";
	req.on('data', function(chunk) {
		data += chunk
	})
	req.on('end', function() {
		req.body = data;
		next();
	});
});

// An end point to actually send logs to
var LogParser = require("./lib/LogParser");
var logParser = new LogParser();

app.post('/logs', function(request, response) {

	if (request.get('content-type') !== 'application/logplex-1') {
		console.log("Not Logplex");
		return response.sendStatus(400);
	}

	response.sendStatus(200);

	var logArray = request.body.split("\n");
	logArray.pop();
	logArray.forEach(logParser.parse);

});

// Start the server
console.log("Starting Overwatch *powerup noises*");
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});