var DynoRestarter = require('./DynoRestarter');

module.exports = function(injectedDate, injectedDynoRestarter) {

	var date = injectedDate || new Date();
	var dynoRestarter = injectedDynoRestarter || new DynoRestarter();

	var thresholdCount = process.env.THRESHOLD_COUNT || 5;
	var thresholdTimespan = process.env.THRESHOLD_TIMESPAN || 60000;
	var timeBetweenRestarts = process.env.TIME_BETWEEN_RESTARTS || 120000;

	var triggerCount = [];
	var triggerTime = [];

	function handle(dyno) {

		rememberTimeoutEvent(date.getTime(), dyno);

		var enoughEvents = countTimeoutEvents(dyno) >= thresholdCount;
		var notTriggeredRecently = !triggerTime[dyno] || triggerTime[dyno] < (date.getTime() - timeBetweenRestarts);

		if (enoughEvents && notTriggeredRecently) {
			triggerTime[dyno] = date.getTime();
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

	function countTimeoutEvents(dyno) {

		var recentEventsCount = 0;
		for (var i = 0; i < triggerCount[dyno].length; i++) {
			if (triggerCount[dyno][i].timestamp > date.getTime() - thresholdTimespan) {
				recentEventsCount++;
			}
		}
		return recentEventsCount;
	}

	return {
		handle: handle
	};
};