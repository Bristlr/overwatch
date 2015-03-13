var DynoRestarter = require('./DynoRestarter');

module.exports = function(injectedDate, injectedDynoRestarter) {

	var dynoRestarter = injectedDynoRestarter || new DynoRestarter();

	var thresholdCount = process.env.THRESHOLD_COUNT || 5;
	var thresholdTimespan = process.env.THRESHOLD_TIMESPAN || 60000;
	var timeBetweenRestarts = process.env.TIME_BETWEEN_RESTARTS || 120000;

	var triggerCount = [];
	var triggerTime = [];

	function handle(dyno) {

		var date = injectedDate || new Date();
		var timeNow = date.getTime();
	
		rememberTimeoutEvent(timeNow, dyno);

		var enoughEvents = countTimeoutEvents(timeNow, dyno) >= thresholdCount;
		var notTriggeredRecently = !triggerTime[dyno] || triggerTime[dyno] < (timeNow - timeBetweenRestarts);

		if (enoughEvents && notTriggeredRecently) {
			triggerTime[dyno] = timeNow;
			dynoRestarter.restart(dyno);
		} else {
			if (!enoughEvents) console.log("Timeout on dyno " + dyno + " but count threshold not met.");
			if (!notTriggeredRecently) console.log("Timeout on dyno " + dyno + " but not restrating as restarted too recently.");
		}
	}

	function rememberTimeoutEvent(time, dyno) {

		if (!triggerCount[dyno]) {
			triggerCount[dyno] = [];
		}

		triggerCount[dyno].push({
			timestamp: time
		});

	}

	function countTimeoutEvents(time, dyno) {

		var recentEventsCount = 0;
		for (var i = 0; i < triggerCount[dyno].length; i++) {
			if (triggerCount[dyno][i].timestamp > time - thresholdTimespan) {
				recentEventsCount++;
			}
		}
		return recentEventsCount;
	}

	return {
		handle: handle
	};
};