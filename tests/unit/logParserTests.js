var assert = require('assert');
var LogParser = require("../../lib/LogParser");

test("Given a timeout happens, trigger the handler", function(done) {

	var logParser = new LogParser(fakeTimeoutHandler);

	var log = "07:48:57.879 2015-03-10 07:49:55.366156+00:00 heroku router - - at=error code=H12 desc=\"Request timeout\" method=GET path=\"/\" host=app.name.here request_id=1234-5678-9012-34 fwd=\"1.2.3.4\" dyno=web.2 connect=24ms service=30001ms status=503 bytes=0";
	logParser.parse(log);

	assert(triggeredDyno, 2);
	done();
});

test("Given the app has crashed, don't trigger the handler", function(done) {

	var logParser = new LogParser(fakeTimeoutHandler);

	var log = "07:48:57.879 2015-03-10 07:49:55.366156+00:00 heroku router - - - at=error code=H10 desc=\"App crashed\" method=GET path=\"/\" host=app.name.here request_id=1234-5678-9012-34 fwd=\"1.2.3.4\" dyno= connect= service= status=503 bytes=";
	logParser.parse(log);

	assert(triggeredDyno, 2);
	done();
});

var triggeredDyno ;
var fakeTimeoutHandler = {
	handle: function(dyno){
		triggeredDyno = dyno;
	}
};