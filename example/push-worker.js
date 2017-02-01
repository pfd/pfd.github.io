// importScripts('/dist/ua-sdk.js')
importScripts('https://d2ob6tofij0erf.cloudfront.net/web-push-beta/ua-sdk.js')
uaSetup.worker(self, {
  appKey: 'Vl0wyG8kSyCyOUW98Wj4xg',
  token: 'MTpWbDB3eUc4a1N5Q3lPVVc5OFdqNHhnOlZDcnYxUm1RXzJCRHdVd1lkWU1EeW1xWkZYa1RQRjZ0NDlhcDdKSFRtQ2M',
  apiUrl: 'https://web-push-api-staging.urbanairship.com',
  defaultIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Urban_Airship_Logo.jpg/220px-Urban_Airship_Logo.jpg',
  defaultTitle: 'UA Web Push',
  defaultActionURL: 'https://go.urbanairship.com',
  debug: true
})
