#Restart timing out Heroku dynos

This is a Node.js app which monitors your Heroku app and restarts any dynos which timeout too frequently. By default "too frequently" is 5 times in 60 seconds.

Overwatch should be used in conjunction with good monitoring. This doesn't fix your problem, it just gets rid of some of the pain.

Required environment variables:

* HEROKU_API_TOKEN - Your Heroku Api token
* HEROKU_APP - The name of the app you are monitoring

Optional environment variables:

* THRESHOLD_COUNT (default 5) - How many timeouts can happen in one period of time on one dyno
* THRESHOLD_TIMESPAN (default 60000) - Given time period (in ms) to count events within
* TIME_BETWEEN_RESTARTS (default 120000) - Minimum time (in ms) between restarts
