
## Basics

The SheerID API is organized around [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).

### Base URL

The base URL for the SheerID REST API is `https://services.sheerid.com/rest/v2/`.

The current version is <span id="api-version">2.0.0</span>.

### Authentication

Certain endpoints require a Bearer Token for authentication. Retrieve your API access token from
[MySheerID](https://my.sheerid.com){:target="_blank"} under *Settings* »» *Access Tokens*. You will also find your Account ID, which you will need in certain conversion tracking operations.

{% include image.md name="Access Tokens" %}

```http
GET /rest/v2/info HTTP/1.1
Content-Type: application/json
Authorization: Bearer {YOUR_ACCESS_TOKEN}
```

<script>
jQuery(function($){
    $.getJSON('https://services.sheerid.com/rest/v2/info').done(function(info) {
        $('#api-version').text(info.sheeridVersion);
    });
});
</script>

