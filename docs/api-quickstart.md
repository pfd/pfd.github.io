---
layout: default
title: REST API
nav_order: 7
has_children: false
permalink: /api-quickstart
description: For advanced implementations, you may use our REST API directly and bypass the JavaScript library as an API client. This section will introduce you to the basics of our REST API, including how to handle responses, errors, and to move successfully from step to step. See our [REST API reference](/rest-api){:target="_blank"} for details.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

{% include rest-api-basics.md %}

## Retrieve Theme

If you would like to use the CSS and messaging that you configured at [MySheerID](https://my.sheerid.com){:target="_blank"}, then you must first fetch the
[program theme]({{ 'api-quickstart#program-theme' | relative_url }}). To do this, make a `GET` request to the  `/program/{programId}/theme` endpoint:


```http
GET /rest/v2/program/<YOUR_PROGRAM_ID>/theme HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
```

See [Program Theme]({{ 'api-quickstart#program-theme' | relative_url }}) for
more information about what is contained in the program theme object, and [Get Program Theme]({{ 'rest-api#operation/getProgramTheme' | relative_url }}){:target="_blank"} for the
detailed API reference.

## Retrieve Verification Segment

Now we need to begin a verification. This will retrieve what kind of segment you will be verifying against (Student, Active Military, Inactive Military, Teacher, etc.).

To retrieve the initial step for your [flow]({{ 'concepts#flows' | relative_url }}), make the following `POST` request:

```http
POST /rest/v2/verification HTTP/1.1
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN>

{
    "programId": "<YOUR_PROGRAM_ID>"
}
```

Response:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "collectStudentPersonalInfo", // The step in the verification flow the current verification is on
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/111111111111111111111111/step/collectStudentPersonalInfo", // The URL to hit for the current step
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

At this point a verification has begun and can be referenced with the `verificationId`, in the example case `111111111111111111111111`. This ID will be used for all
future interactions with this verification ID.

## Verify a User

Now that we have our step (in our demo case we are verifying a student, so our step is `collectStudentPersonalInfo`), we can submit a verification subject to verify.
We will be submitting a student for verification, so we will need to fill out this structure:

{% include note.html content="As a best practice, you should allow up to 11 seconds in your integration to receive a response. Generally, our sources respond instantly but we have found that an 11s timeout provides a sufficient cushion in the event of upstream latency issues caused by our authoritative sources or other factors."%}


```json
{
    "firstName": "",
    "lastName": "",
    "birthDate": "YYYY-MM-DD",
    "email": "",
    "organization": {
        "id": 0,
        "name": ""
    }
}
```

Schemas for all verification subjects can be found [here](/jslib-api).

Once all data has been collected, make a `POST` call to the URL collected in the previous step's `submissionUrl` response with the data, e.g.

```json
{
    "firstName": "Randy",
    "lastName": "Random",
    "birthDate": "YYYY-MM-DD",
    "email": "name@example.com",
    "organization": {
        "id": 1,
        "name": "Organization name"
    }
}
```

This example will cause an instant success response because it uses any name in the First Name field. The only string that wouldn't work in this example is `REJECTED`.
Using `REJECTED` as the value for `firstName` would yield an unsuccessful verification and take you to the `docUpload` step.

To see comprehensive testing rules, see the [Test Program]({{ 'getting-started#test-program' | relative_url }}) documentation.



### Success

If the verification was successful, then you will receive a response like this:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "success", // The step in the verification flow the current verification is on
    "rewardCode": "REWARD", // The reward code that was configured in the self service tool
    "errorIds": [],
    "segment": "student", // The current segment we are verifying
    "subSegment": null // The current subsegment we are verifying if applicable
}
```

After providing the `rewardCode` to your user to be used in your system, you're done!

### Document Review

If the verification was unsuccessful, then you will need to collect document(s) that prove the user is part of the verification segment to be provided to SheerID
for review. The document review response will be returned after submitting the personal info of the user if the user could not be verified instantly, and will look
something like this:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "docUpload", // The step in the verification flow the current verification is on
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/111111111111111111111111/step/docUpload/1234", // The URL to hit for the current step
    "errorIds": [],
    "segment": "student", // The audience segment targeted in your program
    "subSegment": null // The audience subsegment, if applicable
}
```

After collecting the documents, they should be submitted to SheerID by making a `POST` request to the `submissionUrl` provided in the doc upload response. This
request must use the `multipart/form-data` `Content-Type` header, and should specify each file with a key beginning with `file` e.g.

```
file1=first file...
file2=second file...
file3=third file...
```

Once all files have been submitted, you will receive a `pending` response.

### Pending

If documents have been successfully uploaded to SheerID for review, then you will receive a response that looks like this:

```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "pending", // The step in the verification flow the current verification is on
    "statusUrl": "https://services.sheerid.com/rest/v2/verification/111111111111111111111111", // The URL to poll for current status
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

The `statusUrl` is the URL used to retrieve the current status of the verification. This endpoint can be polled to watch for changes to the verification state. If
a document review is completed and marked successful (the document proved the user was associated with the segment), then you will receive the `success` response.
If the document review was marked rejected (the document did not prove the user was associated with the segment), the you will receive the `docUpload` response so
the user has a chance to upload different documentation. The user has a limited number of times they can perform this operation. If the document review is still in
progress, you will continue to get the `pending` response.

### Getting Current Status

The current status of a verification can be retrieved at any time by making a `GET` request to `https://services.sheerid.com/rest/v2/verification/{verificationId}`. The
response from this endpoint will match the responses you get a various points through the flow (`success`, `docUpload`, `pending`, `error`, etc.). This endpoint can be
used to continue a verificaiton that was halted at any point.

### Program Theme

The program theme object contains all theme and messaging information that was configured for a program in the self-service tool at [MySheerID](https://my.sheerid.com){:target="_blank"}. The theme includes a full CSS stylesheet
that can be included when rendering the form (as long as CSS selectors match), and any messaging that should be used throughout the verification process, including
field labels, success messages, etc.

### Internationalization (i18n)

The program theme contains an `intl` property which is a structured JSON object containing translated messaging to use when rendering the forms to collect the data
necessary for the verification flow. This object will also include custom messaging that was configured in the self-service tool.

### ErrorId

The `errorId` property under the `intl` property can be used to find error messaging to display to users when a given error is thrown. Any time a response has an
`errorIds` property, it means an error occurred and appropriate messaging should be looked up here in the program theme based on the error ID that was returned.

### Custom CSS

The `customCss` property on the program theme contains a CSS stylesheet as it was configured in the self-service tool. This is heavily reliant on certain selectors
existing on the page, so it may or may not be useful when not using the JavaScript library.

## Errors

Any response while interacting with the API could be an error response. There are two types of possible errors: recoverable and non-recoverable.

### Recoverable Errors

{% include recoverable-errors.md %}

#### Messages

Recoverable errors can be caused by invalid entries from the user, so the messaging that should be shown can be found in the [program theme]({{ 'api-quickstart#program-theme' | relative_url }}).
of the response that was returned. The messaging found in the `errorId` section of the messages should be appropriate to show users.

#### Example

When submitting a student subject for the `collectStudentPersonalInfo` if you sent this request:
```json
{
    "firstName": "First",
    "lastName": "Last",
    "birthDate": "1-1-1",
    "email": "notValidEmail,com",
    "organization": {
        "id": 1,
        "name": "Organization name"
    }
}
```

You would receive the following `errorId`s:

```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "collectStudentPersonalInfo", // The step in the verification flow the current verification is on
    "errorIds": [
        "invalidBirthDate",
        "invalidEmail"
    ],
    "segment": "student",
    "subSegment": null
}
```

This lets you know that you need to perform the `collectStudentPersonalInfo` step again, and you should find the `invalidBirthDate` and `invalidEmail` messages in the
[program theme]({{ 'api-quickstart#program-theme' | relative_url }}) to find the message to display to the user.

### Non Recoverable Errors

{% include non-recoverable-errors.md %}

#### Messages

The supplied `errorIds` can be used to look up the user facing messages in the [program theme]({{ 'api-quickstart#program-theme' | relative_url }}) just like for recoverable errors, however
these can potentially be much more generic messages and difficult to understand. So to provide feedback for the integrator, the `systemErrorMessage` property can be used
to understand what went wrong. These messages are NOT intended to be displayed to users, they are only for the integrators benefit.

#### Example

When submitting a student subject for the `collectStudentPersonalInfo` step, if you sent this request:
```json
{
    "firstName": "First",
    "lastName": "Last",
    "birthDate": "1-1-1",
    "email": "notValidEmail,com",
    "invalidKey": "something"
}
```

You would receive the following error response:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "error", // The step in the verification flow the current verification is on
    "errorIds": [
        "invalidRequest"
    ],
    "systemErrorMessage": "Unexpected property 'invalidKey', expected one of: firstName, lastName, birthDate, email, universityId, metadata"
}
```

This lets you know you need to change the structure of your student subject request. Look
up the `invalidRequest` error in the [program theme]({{ 'api-quickstart#program-theme' | relative_url }}) to find the message to show to the user. The `systemErrorMessage` tells you that you need to remove the `invalidKey` property
and only use the provided allowed keys.

Make sure you have your program ID before starting.

{% include programs.md %}
