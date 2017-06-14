// 86acbd31cd7c09cf30acb66d2fbedc91daa48b86:1497372733.42
importScripts('https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js')
uaSetup.worker(self, {
  // This  has a default of `/push-worker.js`. It should live at the root of
  // your domain. It only needs to be specified if your worker lives at a
  // different path.
  // workerUrl: '/push-worker.js',
  
  defaultIcon: 'https://pfd.github.io/toast.png',
  defaultTitle: 'I love Avocados',
  defaultActionURL: 'https://pfd.github.io/',
  appKey: '71MGDEShT4uuK6IP-lRSVg',
  token: 'MTo3MU1HREVTaFQ0dXVLNklQLWxSU1ZnOmUtTzV1TTU3SmNsZE9HRXN6RmhVUEpIVjF3bTVWSnVqakpybnFUSlJQTHc',
  vapidPublicKey: 'BHNJV0K3rqXZsnsMxJo1DbAsDImS64y1y2lXCJgIloSLPY5OvjBwsCMq3oLOpJBfsuxdwMNhFAgWVnDO7VI3krQ='
})
