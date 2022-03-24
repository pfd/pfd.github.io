---
layout: default
title: API Walkthrough
nav_order: 6
permalink: /tutorials/api-walkthrough
parent: Tutorials
description: In this guide, you'll go through the necessary steps to perform a verification using our REST API. After completing this tutorial, you should have a grasp on the fundamental concepts involved in a SheerID API integration.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

We will use the example of a [verification flow for a US student]({{ 'reference#us-student' | relative_url }})
in this tutorial, beginning with a `/verification/` `POST` request, which
will return a `verificationId` along with the `submissionUrl`, which you will use in subsequent requests
until the verification is complete.

## Terminology

Before you begin, let's get familiar with the attributes you will encounter in this process.

{% include term.md label="API token" %}
**`programId`**: {% include programs.md %}
{% include term.md label="verificationId" %}
{% include term.md label="submissionUrl" %}
{% include term.md label="currentStep" %}
{% include term.md label="errorIds" %}
{% include term.md label="segment" %}
{% include term.md label="subSegment" %}
{% include term.md label="statusUrl" %}

For details on the endpoints and parameters found in this walktrough, see our [REST API Reference](/rest-api).

## Initiate Verification

Begin a verification process for a student by performing a `POST` request passing your `programId`
to SheerID.

A successful response will return a `200 OK` status and provide you with the following information to help you
continue the verification:

* `"currentStep": "collectStudentPersonalInfo"`: The verification is successful and now it is time to present the user with a form asking for their details.
* `verificationId`: You will need this identifier to see this verification through to completion.
* `submissionUrl`: You will use this URL in the next step after you collect the user's data. Note that the `submissionUrl` value that was returned includes the `verificationId`.


**Request**:

```http
POST /rest/v2/verification HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json

{
	"programId": "5c0c514b2cd3bc121b4ac71b"
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

<!---
### curl

```bash
curl -X POST \
  https://services.sheerid.com/rest/v2/verification \
  -H 'Content-Type: application/json' \
  -d '{
	"programId": "5c0c514b2cd3bc121b4ac71b"
    }'
```
-->

## Submission Request

With the `submissionUrl` from the `verification` response, you may now submit the user data for verification.

In this step we will test the two possible immediate outcomes when submitting student personal info: a *successful instant verification*
and an *unsuccessful instant verification*. In the case of a successful instant, your `currentStep` will be `success` and you will
be free to proceeed to checkout, providing the user with the offer code. With an unsuccessful instant, hope is not lost, you just
need to proceed to the `docUpload` step.

{% include note.html content="You would normally
gather this information from a web form, either rendered via our JavaScript library or by a form of your making, but for this
tutorial we are walking through steps manually."  %}

### Successful Instant Verification

In this first example, you will submit test user data to simulate a successful
instant verification. Use any name in the `firstName` field to simulate success.

See [Test Program]({{ 'getting-started#test-program' | relative_url }}) for details on
simulating outcomes in development mode.

**Example Request 1: Successful Instant**:

```http
POST /rest/v2/verification/{verificationID}/step/collectStudentPersonalInfo HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json

{
	"firstName": "Jane",
	"lastName": "Ivy",
	"birthDate": "1990-01-01",
	"email": "jane@albanylaw.edu",
	"organization": {
		"id": 4597,
		"name": "ALBANY LAW SCHOOL"
	}
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "currentStep": "success",
    "verificationId": "5c8c19ffdac79a594a5a1320",
    "rewardCode": "YOUR_OFFER_CODE",
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

### Unsuccessful Instant Verification

In this example, you will submit test user data to simulate an usuccessful
instant verification. Use `REJECTED` as the `firstName` to simulate this outcome.
You will then proceed to the `docUpload` step.

See [Test Program]({{ 'getting-started#test-program' | relative_url }}) for details on
simulating outcomes in development mode.

**Example Request 2: Unsuccessful Instant**:

```http
POST /rest/v2/verification/{verificationID}/step/collectStudentPersonalInfo HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json

{
	"firstName": "REJECTED",
	"lastName": "Ivy",
	"birthDate": "1990-01-01",
	"email": "jane@albanylaw.edu",
	"organization": {
		"id": 4597,
		"name": "ALBANY LAW SCHOOL"
	}
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "currentStep": "docUpload",
    "verificationId": "<YOUR_VERIFICATION_ID>",
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/<YOUR_VERIFICATION_ID>/step/docUpload/<YOUR_DOC_UPLOAD_TOKEN>",
    "segment": "student",
    "subSegment": null,
    "errorIds": []
}
```

<!---
### curl

```bash
curl -X POST \
  https://services.sheerid.com/rest/v2/verification/5c884a8fc7e5d8109070bf3f/step/collectStudentPersonalInfo \
  -H 'Content-Type: application/json' \
  -d '{
	"firstName": "Jane",
	"lastName": "Ivy",
	"birthDate": "1990-01-01",
	"email": "dav.is.pe.te@gmail.com",
	"organization": {
		"id": 4597,
		"name": "ALBANY LAW SCHOOL"
	}
}'
```
-->

{% include note.html content="Consumers may need multiple attempts to provide the necessary documents to be verified. You must provide 3 document upload attempts per verification. SheerID will verify adherence to this guideline before your program can be launched in production."  %}

## Doc Upload

**Request**:

```http
POST /rest/v2/verification/5c88710bb107283f54d84904/step/docUpload/b29a860d79404db0bec93d99120b1cda HTTP/1.1
Host: services.sheerid.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="filename"; filename="/Users/sheerId/Desktop/test-file.png


------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "currentStep": "pending",
    "verificationId": "5c886b92b107283f54d84854",
    "statusUrl": "https://preview.sheerid.com/rest/v2/verification/5c886b92b107283f54d84854",
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

<!---
### curl

```bash
curl -X POST \
  https://preview.sheerid.com/rest/v2/verification/5c88710bb107283f54d84904/step/docUpload/b29a860d79404db0bec93d99120b1cda \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F filename=@/Users/sheerId/Desktop/test-file.png
```
-->

## Get Verification Details

Now that your verification is in the `pending` step, you may want to check the status.

**Request**:

```http
GET /rest/v2/verification/5c886b92b107283f54d84854/details HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_ACCESS_TOKEN>
```

**Response**:

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "programId": "5c0d45f251cc4d31b7a222ca",
    "created": 1552444306323,
    "updated": 1552444363224,
    "lastResponse": {
        "currentStep": "pending",
        "verificationId": "5c886b92b107283f54d84854",
        "statusUrl": "https://preview.sheerid.com/rest/v2/verification/5c886b92b107283f54d84854",
        "errorIds": [],
        "segment": "student",
        "subSegment": null
    },
    "personInfo": {
        "firstName": "Joe",
        "lastName": "Ivie",
        "email": "dav.ispe.te@gmail.com",
        "birthDate": "1990-01-01",
        "metadata": null,
        "organization": {
            "id": 4597,
            "name": "ALBANY LAW SCHOOL"
        }
    },
    "docUploadRejectionCount": 0
}
```

<!---
### curl

```bash
curl -X GET \
  https://preview.sheerid.com/rest/v2/verification/5c886b92b107283f54d84854/details \
  -H 'Authorization: Bearer c0e30596385a4b0794d1a7bd77a19623' \
```
-->
