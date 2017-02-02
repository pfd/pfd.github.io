Notes on setup.

#. Copied the /example directory into the root of the website
#. uncommented line 99 and commented line 100
#. pushed changes
#. now I see UA Web Push Demo with a register button, and three things that look like tags
#. clicked register and nothing happened
#. Got this from the example site: (https://d2ob6tofij0erf.cloudfront.net/_example/index.html)

ID: d9e692a9-b3a0-4f52-b690-0ea88317399c
optedIn: true
 
{
  "timezone": "America/Los_Angeles",
  "locale_country": "US",
  "locale_language": "en",
  "device_type": "web",
  "opt_in": true,
  "web": {
    "user_agent_string": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "browser_name": "chrome",
    "browser_version": "chrome-55",
    "browser_type": "desktop",
    "web_sdk_version": "0.0.1"
  },
  "channel_id": "d9e692a9-b3a0-4f52-b690-0ea88317399c"
}
--
{}

#. back to pfd.github.io- checking with xian
#. remove the `_` in workerUrl: '/_example/push-worker.js'
#. push changes. Success!

ID: 2a243893-57f9-41d9-ac6b-1eb600b19bb2
optedIn: true
 
{
  "timezone": "America/Los_Angeles",
  "locale_country": "US",
  "locale_language": "en",
  "device_type": "web",
  "opt_in": true,
  "web": {
    "user_agent_string": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "browser_name": "chrome",
    "browser_version": "chrome-55",
    "browser_type": "desktop",
    "web_sdk_version": "0.0.1"
  },
  "channel_id": "2a243893-57f9-41d9-ac6b-1eb600b19bb2"
}
--
{}
