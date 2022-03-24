---
layout: default
title: Conversion Tracking
nav_order: 20
permalink: /tutorials/conversion-tracking
parent: Tutorials
description: In this guide, you’ll go through the necessary steps to report back to SheerID the spending by your SheerID verified consumers. After completing this tutorial you will know how to populate the ROI Impact Dashboard in MySheerID and see how using SheerID is helping your business.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

The [ROI Impact Dashboard]({{ 'reporting#roi-impact-dashboard' | relative_url }}) tracks the revenue performance of your gated offer program. It automatically calculates important metrics
such as: fraud prevented, new orders and revenue. In this tutorial, we will outline the
different implementation options for tracking conversions, ranging in complexity to suit your integration needs.

## Getting Started

No matter which implementation method you choose to track conversions, it is a two-step process,
beginning with a user's initial verification attempt, and culminating in a conversion.

* Step 1: Associate user with a verification
* Step 2: Record conversion data, i.e., revenue, transaction metadata

Requirements for storing verification data and parameters for transmitting data to SheerID will
vary from method to method. This guide will help you determine the best method to use for your
implementation.

## Terminology

Please familiarize yourself with the terminology in this section before proceeding, as requirements
differ from method to method.

#### Account ID

Certain conversion operations require your SheerID Account ID. You can find your Account ID
next to your API token by navigating to **Settings »» Access Tokens** in [MySheerID](https://my.sheerid.com){:target="_blank"}:

{% include image.md name="Access Tokens" %}

#### Tracking ID

A Tracking ID is an ID that you provide along with a verification, to identify a user. Generally,
this ID will be a customer ID or other identifier that maps to your internal CRM.

#### Program ID

{% include programs.md %}

#### Install Page

When we refer to an *Install Page* in this tutorial and elsewhere, we mean the page on your site where your verification form is installed, and where a verification will be initiated. This is where
Step 1 of a conversion tracking will begin.


#### Post-Conversion Page

A post-conversion page is a purchase receipt page, an account signup success page, etc. This
is the page where we will proceed to Step 2 of the conversion tracking process, recording the
conversion data.

#### Install Script

All conversion tracking methods described in this tutorial, with the exception of the REST API method, assume that you have the SheerID JavaScript library installed on the relevant pages, to access our conversion methods. **Be sure to include this script on pages that need to access the JavaScript library.**

**SheerID Install Script**:
```html
<script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.js" crossorigin="anonymous"></script>
```

## Simple Method

This method uses cookies to store the SheerID-supplied `verificationId` on the user’s device as
they progress through your conversion process. It is the simplest to implement but
is limited by the fact that if a consumer switches devices between verification and purchase, tracking them will not be possible.

Below are instructions for using the simple method for Lightbox/iFrame installations, both directly and via Google Tag Manager.

### Direct Method

If your SheerID program is installed using the Lightbox or iFrame technique you simply need to add 2 scripts to your pages.

**Snippet 1 of 2**:<br>
*Add to your SheerID install page (the page where your verification form lives)*.

```html
// SheerID Install Script
<script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.js" crossorigin="anonymous"></script>

// Add listener for verificationId
<script>
  sheerId.conversion.listenForVerificationId();
</script>
```
The `listenForVerificationId()` function will store the user's `verificationId` in a cookie
for later use upon conversion.

**Snippet 2 of 2**:
*Add to your post-conversion page*:

```html
// SheerID Install Script
<script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.js" crossorigin="anonymous"></script>

// Record conversion amount
<script>
    window.sheerId.conversion.convert({ amount: 1 });
</script>
```

The `convert` function will pass the revenue amount from the conversion to SheerID for ROI tracking.

{% include note.html content="Change `amount: 1` to the appropriate purchase value for the verified consumer’s transaction. The default unit is USD, so if the purchase was for $49.99, supply: `amount: 49.99`" %}

### Google Tag Manager

You can also implement the simple method described above using Google Tag Manager.

{% include warning.html content="Make sure that the [Install Script](#install-script) is available on pages where these tags are deployed. The install script cannot be added via GTM." %}


#### Configure Tag 1 of 2

If you’re using SheerID’s Lightbox or iFrame install method, add tag 1 here. Triggering for this tag should occur on the pages where your SheerID verification form is installed. This tag
will implement the `listenForVerification` function.

1. In the appropriate workspace, click "Add a new tag," and click into the *Tag Configuration* pane.
1. In the *Choose Tag Type* window, select *Custom HTML* and name your new tag “SheerID ROI Impact Tracking” or similar. 
1. Paste the following code into the HTML field:

  ```html
  // Add listener for verificationId
  <script>
    sheerId.conversion.listenForVerificationId();
  </script>
  ```

1. Click the *Triggering* panel just below, then select the specific page(s) the step one code should live on. For best results, add this to the verification success and document upload success pages. 
1. Click the Save button in the top right-hand corner and you will be returned to the Workspace.

#### Configure Tag 2 of 2

1. In the appropriate workspace, click "Add a new tag," and click into the *Tag Configuration* pane.
1. In the *Choose Tag Type* window, select *Custom HTML* and name your new tag “SheerID ROI Impact Purchase Amount” or similar. 
1. Paste the following code into the HTML field:

  ```html
  // Record conversion amount
  <script>
      window.sheerId.conversion.convert({ amount: 1 });
  </script>
  ```

1. Click the *Triggering* panel just below, then select the specific page(s) the step two code should live on. **IMPORTANT**: *Triggering for this tag should occur on your post-conversion page*. 
1. Click the save button to return to the Workspace. 
1. Click the *Submit* button in the top-right navigation.
1. Enter a Version name and description for this submission's changes, then click the *Publish* button.

The codes are now live on your website and will begin sending data to inform your ROI Impact dashboard.

## JavaScript VerificationID Method

In this method SheerID provides a `verificationId` for each user who attempts to verify with our system and you capture this ID, sending it back to us later if that user successfully makes a purchase on your website.

**Snippet 1 of 2**:<br>
*Add to your SheerID install page.. Make sure to capture `verificationId` and store it in your system so you can provide it in the next step.*

```html
<script>
// Existing call to render the form
new sheerId.VerificationForm(document.getElementById('my-form'), myProgramId);
 
// SheerID verificationId-based conversion tracking 1/2
sheerId.addHook({
     name: 'ON_VERIFICATION_READY',
     callback: function(verificationResponse) {
       // save the verificationId somewhere so we can store it for future use
       verificationId = verificationResponse.verificationId; 
     }
 });
</script>
```

**Snippet 2 of 2**:<br>
*Add to your post-conversion page. This call will record the conversion to SheerID.*

```html
<script>
// Example conversion details you would supply:
var conversionDetails = {
  amount: 33.00,
  currency: 'USD',
  tags: [
    'testTag1',
    'testTag2'
  ]
};
 
// SheerID verificationId-based conversion tracking 2/2
sheerId.conversion.convertByVerificationId(
verificationId, // The verificationId you saved in part 1/2
conversionDetails
).then(function(conversionResponse) {
console.log(conversionResponse.id);
});
</script>
```

## JavaScript Tracking ID Method

If you already have an ID you can associate with a user, you can send that to SheerID when the user first attempts verification, and then again once they’ve converted. A user’s unique database ID is an example of a `trackingId` that might make sense to use. 

**Snippet 1 of 2**:<br>
*Send your `trackingId` when creating your verification form.
On the verification page, next to your call to render the verification form, add*:
 
```html
<script>// SheerID trackingId-based conversion tracking 1/2
var myTrackingId = 'userId_123';
// Include the trackingId as the third parameter to VerificationForm()
var myForm = new sheerId.VerificationForm(
  document.getElementById('my-form'),
  myProgramId,
  myTrackingId
);
</script>
```
**Snippet 2 of 2**:<br>
*On your post-conversion page add a call to record the conversion to SheerID*:
 
```html
<script>
// SheerID trackingId-based conversion tracking 2/2
// Same trackingId provided in part 1
var myTrackingId = 'userId_123';
var accountId = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // provided in my.sheerid.com
var conversionDetails = {
   amount: 33.00,
   // optional currency setting:
   currency: 'USD',
   // optional arbitrary tags to store alongside the conversion:
   tags: [
     'testTag1',
     'testTag2'
   ]
};
 
 
sheerId.conversion
  .convertByTrackingId(accountId, myTrackingId, conversionDetails)
  .then(function(conversionResponse) {
console.log(conversionResponse.id);
  });
 
</script>
```

## REST API Verification ID method

SheerID provides a `verificationId` for each user who attempts to verify with our system.
In this conversion tracking method you will capture this ID and send it back to us later if that user successfully makes a purchase on your website.

To begin, [Retrieve Your Program ID](#program-id).

The first step in tracking a conversion using this method is capturing the `verificationID`, which is returned when you make a `POST` request to `https://services.sheerid.com/rest/v2/verification`.

In this example we are verifying someone as part of a student program. 
 
**Request**:

```http
POST /rest/v2/verification HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
 
{
	"programId": "5cc3302131ce7e06e3689eff"
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json
 
{
    "verificationId": "5c884a8fc7e5d8109070bf3f",
    "currentStep": "collectStudentPersonalInfo",
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/5c884a8fc7e5d8109070bf3f/step/collectStudentPersonalInfo",
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

In order to return the verificationID to SheerID when this student makes a purchase you will need to store it in a cookie or database. After the purchase workflow is complete make a `POST` request to `https://services.sheerid.com/rest/v2/conversion/verification/<verificationId>` so we can store the purchase amount for this verification. In this example, assume the student you started to verify above was successfully verified and spent $49.99. 

See our API reference for details on the [Verification Conversion]({{ 'rest-api#operation/storeVerificationConversion' | relative_url }}){:target="_blank"} endpoint.

**Request**:

```http
POST /rest/v2/conversion/verification/5c884a8fc7e5d8109070bf3f HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json

{
    "amount": 49.99, // Numeric amount of the transaction
    "currency": "USD", // The currency units (Optional; default: US Dollars)
    "tags": [ "10001", "10002", ... ] // List of tags (optional)
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "id": "1234-abcdef-09876" // a unique ID for the conversion
}
```

Successful requests communicate that the `verificationID` you supplied was valid and the body was formatted correctly. It means that we are storing the purchase amount supplied with the verification and this purchase will be counted towards the values you can see in the [ROI Impact Dashboard]({{ 'reporting#roi-impact-dashboard' | relative_url }}).

### Invalid Request Error Responses

If your request includes an invalid amount, you may see a 400 error response:

```http
HTTP/1.1 400 Bad Request
Content-type: application/json

{
    "systemErrorMessage": "Invalid amount"
}
```

### Other Common Error Responses

Common errors will result in a standard error response with no body. For example:

```
502 Bad Gateway
```

```
503 Service Unavailable
```

## REST API Tracking ID method

Similar to the JavaScript tracking ID method above, in this method you will provide us with a tracking ID with the initial verification. We will store the tracking ID with the verification ID, and refer to it when you
send it again with the conversion request.

To begin, [Retrieve Your Program ID](#program-id).

Send the `trackingId` in the initial verification `POST` request along with your `programId`.

**Request**:

```http
POST /rest/v2/verification HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
 
{
    "programId": "5cc3302131ce7e06e3689eff",
    "trackingId": "userId_123"
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json
 
{
    "verificationId": "5c884a8fc7e5d8109070bf3f",
    "currentStep": "collectStudentPersonalInfo",
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/5c884a8fc7e5d8109070bf3f/step/collectStudentPersonalInfo",
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

After the purchase workflow is complete, make a `POST` request to `https://services.sheerid.com/rest/v2/conversion/account/YOUR_ACCOUNT_ID/trackingId/YOUR_TRACKING_ID` so we can store the purchase amount for this user. In this example, assume the student you started to verify above was successfully verified and spent $49.99. 

See our API reference for details on the [Conversion by Tracking ID]({{ 'rest-api#operation/storeVerificationConversionByTrackingId' | relative_url }}){:target="_blank"} endpoint.

**Request**:

```http
POST /rest/v2/conversion/account/your_account_id/trackingId/user_123 HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
 
{
    "amount": 49.99,
    "currency": "USD",
    "tags": [
        "tag_1",
        "tag_5"
    ]
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "id": "1234-abcdef-09876" // a unique ID for the conversion
}
```

Successful requests communicate that the `trackingID` you supplied was valid and the body was formatted correctly. It means that we are storing the purchase amount supplied with the `trackingID` and this purchase will be counted towards the values you can see in the [ROI Impact Dashboard]({{ 'reporting#roi-impact-dashboard' | relative_url }}).

### Invalid Request Error Responses

If your request includes an invalid amount, you may see a 400 error response:

```http
HTTP/1.1 400 Bad Request
Content-type: application/json

{
    "systemErrorMessage": "Invalid amount"
}
```

### Other Common Error Responses

Common errors will result in a standard error response with no body. For example:

```
502 Bad Gateway
```

```
503 Service Unavailable
```
