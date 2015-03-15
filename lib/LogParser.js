var TimeoutHandler = require("./TimeoutHandler");

module.exports = function(injectedTimeoutHandler) {

	var timeoutHandler = injectedTimeoutHandler || new TimeoutHandler();

	function parse(log) {
		parseDynoStatus(log);
	}

	function parseDynoStatus(log) {
		var statusMatch = log.match(/status=([0-9]*)/);

		if (!statusMatch) {
			return;
		}

		var statusCode = statusMatch[1];

		// We don't care if the 503 error was at the client's end
		if ((statusCode == "503") && (log.indexOf("code=H18") > -1) && (log.indexOf("sock=client") > -1)) {
			return;
		}

		// Currently we only care about timeouts
		if (statusCode !== "503") {
			return;
		}

		var dynoMatch = log.match(/dyno=web.([0-9]*)/);
		
		if (!dynoMatch) {
			return;
		}

		var dyno = Number(dynoMatch[1]);

		timeoutHandler.handle(dyno);

	}

	return {
		parse: parse
	};
};