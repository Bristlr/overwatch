var Heroku = require('heroku-client');
var heroku = new Heroku({
	token: process.env.HEROKU_API_TOKEN
});

module.exports = function() {

	function restart(dyno) {
		if (!process.env.HEROKU_API_TOKEN) return console.log("Attempted to restart dyno, but now Heroku Api Token found");
		heroku.apps(process.env.HEROKU_APP).dynos("web." + dyno).restart(function() {
			console.log("Error detected on dyno " + dyno + ". Restarting");
			console.log("count#dynorestart=1");
			console.log("count#dynorestart." + dyno + "=1");
		});
	}

	return {
		restart: restart
	};
};