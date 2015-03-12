Restart Heroku dynos which are timing out
=======

Required environment variables:

HEROKU_API_TOKEN

HEROKU_APP

Optional environment variables:

THRESHOLD_COUNT (default 5) - How many timeouts can happen in one period of time on one dyno

THRESHOLD_TIMESPAN (default 60000) - Given time period (in ms) to count events within

TIME_BETWEEN_RESTARTS (default 120000) - How long (in ms) between restarts
