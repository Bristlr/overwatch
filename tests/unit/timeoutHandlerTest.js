var assert = require('assert');
var TimeoutHandler = require("../../lib/TimeoutHandler");

test("Given a timeout happens once, dont trigger the handler", function(done) {

	restartedDyno = false;
	restartCount = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(2);

	assert.equal(restartedDyno, false);
	assert.equal(restartCount, 0);

	done();
});

test("Given a timeout happens 5 times within a minute, trigger the handler", function(done) {

	restartedDyno = false;
	restartCount = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(2);
	currentTimeInS = 10;
	timeoutHandler.handle(2);
	currentTimeInS = 11;
	timeoutHandler.handle(2);
	currentTimeInS = 30;
	timeoutHandler.handle(2);
	currentTimeInS = 50;
	timeoutHandler.handle(2);

	assert.equal(restartedDyno, 2);
	assert.equal(restartCount, 1);

	done();
});


test("Given a timeout happens 10 times within a minute, trigger the handler only once", function(done) {

	restartedDyno = false;
	restartCount = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(2);
	currentTimeInS = 10;
	timeoutHandler.handle(2);
	currentTimeInS = 13;
	timeoutHandler.handle(2);
	currentTimeInS = 15;
	timeoutHandler.handle(2);
	currentTimeInS = 20;
	timeoutHandler.handle(2);
	currentTimeInS = 24;
	timeoutHandler.handle(2);
	currentTimeInS = 30;
	timeoutHandler.handle(2);
	currentTimeInS = 45;
	timeoutHandler.handle(2);
	currentTimeInS = 55;
	timeoutHandler.handle(2);
	currentTimeInS = 57;
	timeoutHandler.handle(2);

	assert.equal(restartedDyno, 2);
	assert.equal(restartCount, 1);

	done();
});

test("Given a timeout happens 5 times but on different dynos, dont trigger the handler", function(done) {

	restartedDyno = false;
	restartCount = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(1);
	timeoutHandler.handle(2);
	timeoutHandler.handle(3);
	timeoutHandler.handle(4);
	timeoutHandler.handle(5);

	assert.equal(restartedDyno, false);
	assert.equal(restartCount, 0);

	done();
});

test("Given a timeout happens once every 2 minutes, dont trigger the handler as this falls outside the threshold", function(done) {

	restartedDyno = false;
	restartCount = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(3);
	currentTimeInS = 120;
	timeoutHandler.handle(3);
	currentTimeInS = 180;
	timeoutHandler.handle(3);
	currentTimeInS = 240;
	timeoutHandler.handle(3);
	currentTimeInS = 300;
	timeoutHandler.handle(3);

	assert.equal(restartedDyno, false);
	assert.equal(restartCount, 0);

	done();
});



test("Given a two timeouts happens 5 minutes appart, trigger twice", function(done) {

	restartedDyno = false;
	restartCount = 0;
	currentTimeInS = 0;

	var timeoutHandler = new TimeoutHandler(fakeDate, fakeDynoRestarter);

	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);

	assert.equal(restartedDyno, 2);
	assert.equal(restartCount, 1);

	restartedDyno = false;
	restartCount = 0;
	currentTimeInS = 300;

	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);
	timeoutHandler.handle(2);

	assert.equal(restartedDyno, 2);
	assert.equal(restartCount, 1);

	done();
});


var restartedDyno = false,
	restartCount = 0;
var fakeDynoRestarter = {
	restart: function(dyno){
		restartCount++;
		restartedDyno = dyno;
	}
};

var currentTimeInS = 1;
var fakeDate = {
	getTime: function(){
		return currentTimeInS * 1000;
	}
};