---
layout: default
title: Creating Webhooks
nav_order: 20
permalink: /tutorials/webhooks
parent: Tutorials
description: In this guide, we'll go through the necessary steps to create a webhook for any verifications done on your program. The end result is a call from SheerID's service to an endpoint of your choice when any verification becomes successful.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

Webhooks are used to notify you about successful verifications so you can continue moving users through
your workflow. When combined with the `details` GET request they allow you to do things like receive the reward code for that verification and pass it along to the user.

## Set up a Webhook

Use the webhook `POST` request to configure your webhook URI for your program. Follow the schema in the following example, creating a webhook at `http://example.com`:

**Request**:

```http
POST /rest/v2/program/<YOUR_PROGRAM_ID>/webhook HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN>

{
    "callbackUri": "http://example.com"
}
```

A successful request will return a `200 OK` response, and your program is now configured to pass
verification IDs to your webhook.

```http
HTTP/1.1 200 OK
Content-Type: application/json
```
**Request Parameters**

* `callbackUri`: *string*, The URI for your configured webhook.


## Retrieve Verification Details

Now that your program is configured with your webhook, SheerID will pass the `verificationId` to
the webhook upon a successful verification:

```json
{
    "verificationId": "60fb1e229ca29b55dc92abf2"
}
```
Use the [Verification Details]({{ 'rest-api#operation/getVerificationDetails' | relative_url }}){:target="_blank"} endpoint to monitor the status of
the verification, keep track of steps, provide the reward code to end users, etc.

## Remove and Change a Webhook

Once a webhook is set on a program you may not use the webhooks `POST` request to change it. Doing so will result in a `409 Conflict` error code, indicating that the webhook already exists.

Use the webhook `DELETE` request to remove it.

```http
DELETE /rest/v2/program/<YOUR_PROGRAM_ID>/webhook HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN>

{
    "callbackUri": "http://example.com"
}
```

Once deleted you can add an updated webhook by using the webhook `POST` request again.

{% include note.html content="You can also define a webook in the [Program Settings page](../manage-programs/program-settings#webhooks)." %}

## Webhook Security

As your verification progresses from step to step, we provide webhook notifications to
help you take the appropriate actions for the given change. This section provides details on the features that we use to ensure smooth and secure
communication with SheerID webhooks.

### Static IP Addressing

At SheerID, we understand our customers' need to communicate with us in a secure environment. One of the most effective methods of ensuring secure traffic to your servers from ours is providing
you with designated, static IP addresses for your firewall's allowlist.

See [Static IP Addressing]({{ 'reference#inbound-notifications-http-notifier' | relative_url }}) for details on
our static IPs for incoming webhooks.


### HMAC Signed Messages

SheerID includes a custom header in `POST` webhook requests: `X-Sheerid-Signature`. This contains an [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC) signature. The seed used for the signature is generated and stored by SheerID.

Our Client Delivery team will send you a copy of your signature key. You should verify the
signature on your end for incoming requests. Below are two example verification methods
using the Python `hmac` module:


```python
import hashlib
import hmac

digest = hmac.new(
    shared_secret.encode( 'utf-8' ),
    msg=raw_body.encode( 'utf-8' ),
    digestmod=hashlib.sha256
).hexdigest()

if digest == x_sheerid_signature:
    # Valid Message
```


```python
import hashlib
import hmac

digest = hmac.new(
    "sharedsecret1234" .encode( 'utf-8' ),
    msg= '{ "verificationId" : "5e4fef3cdcaa25122fb281c7e" }' .encode( 'utf-8' ),
    digestmod=hashlib.sha256
).hexdigest()

if digest == x_sheerid_signature:
    # Valid Message
```

### Additional Signing Fields

We can add entropy to the HMAC signature by including extra fields in the notification message body: `nonce` and `timestamp`.

The inclusion of `nonce` and `timestamp` in requests will give each notifier a unique token and timestamp. To activate this additional security feature, ask your Account Manager to enable `extraSigningFields` for your HTTP notifiers.

Following is an example of a webhook configured with the `extraSigningFields` flag, using form-data format:

```http
POST /my-webhook.net/ HTTP/1.1
Host: example-company.com
X-Sheerid-Signature : <HashedContent>
Content-Type: application/x-www-form-urlencoded

requestId=${requestId}&timestamp=${utc_timestamp_in_milliseconds}&nonce=${nonce}
```

* `requestId`— An identifier for the verification request for which this event was triggered.

* `timestamp`— A Unix UTC timestamp with millisecond resolution.

* `nonce`— A randomly-generated, single-use token used to add additional entropy to the raw `POST` data.


### Retries

In the event that SheerID is unable to deliver the HTTP notification (any message that is not HTTP status `2xx` is a failure), the message will be resent according to this schedule:

| Failed attempt # | Will retry after |
|---|---|
| 1 | immediately |
| 2 | 1 hour |
| 3 | 3 hours |
| 4 | 7 hours |


If SheerID is unable to deliver a notification after the fourth retry, we will consider the notification failed and make no further attempts.

If we are unable to deliver 100% of the notifications for 2 consecutive days, the
notification system will be disabled for your program and Customer Service will
contact you to for corrective action.



