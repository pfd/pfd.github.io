---
layout: default
title: Searching Organizations
nav_order: 30
permalink: /tutorials/fetching-organizations
parent: Tutorials
description: In this guide, we'll go through the necessary steps to support searching for organizations via the REST API. The end result is a user experience able to support the search and display of organizations based on user input.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

The organization search feature is used to return a list of supported organizations
based on the full or partial name supplied by your user. Organization `name` and `id`
are required fields to initiate a verification flow, so you should make sure that your
user experience includes a way to fetch names and IDs from us.

One way to do so is using our API to request matching results based on a text string.

## Execute a Search

To search for organizations that match a user-provided query string, perform
a `GET` request with the following:

1. The `orgSearchUrl`, which you will retrieve from your program configuration.
1. Your search query, appended to your `orgSearchUrl`.

**Example**: Searching student organizations for “Harvard”

```http
GET /rest/v2/program/{programId}/theme HTTP/1.1
```

A successful request returns a `200 OK` response with a JSON object containing the `orgSearchUrl`.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    ...

    "config": {
        
        ...

        "orgSearchUrl": "https://orgsearch.sheerid.net/rest/organization/search?country=US&type=UNIVERSITY&name="
    }
}
```

{% include note.html content="We recommend pulling the `orgSearchUrl` on page load to ensure that you have the most up-to-date value based on your program configuration." %}

Using the `orgSearchUrl` you obtained from your theme config, call the URL with the search term appended.

```http
GET /rest/organization/search?country=US&type=UNIVERSITY&name=Harvard HTTP/1.1
Host: orgsearch.sheerid.net
```

A successful request returns a `200 OK` response with an array of organizations that match the query string “Harvard” in the name key, along with their corresponding IDs.

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": 1426,
        "name": "HARVARD UNIVERSITY (CAMBRIDGE, MA)",
        "country": "US",
        "type": "UNIVERSITY"
    },
    {
        "id": 1421,
        "name": "HARVARD - LAW SCHOOL (CAMBRIDGE, MA)",
        "country": "US",
        "type": "UNIVERSITY"
    },
    {
        "id": 1423,
        "name": "HARVARD GRADUATE SCHOOL OF EDUCATION (CAMBRIDGE, MA)",
        "country": "US",
        "type": "UNIVERSITY"
    },

    ...
]
```

## Executing a Search with Multiple Countries

When executing a search with multiple countries configured in your program, the `orgSearchUrl` will
return with a list of configured countries, e.g., `?country=US%2CCA`. Making a query to this endpoint will return a list of both US organizations and CA organizations. 


To narrow your search to a specific country or countries, parse the URL and replace the `country` query string with
an expression containing only the countries you wish to search on, e.g.: `?country=CA`. This will return only the CA organizations.


**Example**: Searching student organizations for “University of Toronto” for a Student program for US, UK and Canadian students. 

```http
GET /rest/v2/program/{programId}/theme HTTP/1.1
```

A successful request will return a JSON object containing the `orgSearchUrl` and the list of countries configured for the program.


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    ...

    "config": {
        "countries": [
            "US",
            "CA",
            "XK",
            "ME"
        ],

        ...

    "orgSearchUrl": "https://orgsearch.sheerid.net/rest/organization/search?country=US%2CCA%2CXK%2CME&type=UNIVERSITY&name="
  }
}
```

To make a request only to Canadian organizations, grab the `orgSearchUrl` up to the `?`. Set the country query string to `country=CA`. Use the type specified in the `orgSearchUrl` query string and then append the `name` with the search term.

```http
GET /rest/organization/search?country=CA&type=UNIVERSITY&name=Toronto HTTP/1.1
Host: orgsearch.sheerid.net
```

This will return a list of organizations that exist only in Canada with the `name` matching the string "Toronto".

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
	{
    	"id": 328033,
    	"name": "University of Toronto",
    	"country": "CA",
    	"type": "UNIVERSITY"
	},
	...
]
```

{% include note.html content="In a prior version of the API, we had a separate endpoint that looked up the organization for you. Now the search endpoint is generated from your program and is now provided in the theme. For backward compatibility, we support the deprecated `/program/{programId}/organization` endpoint. If you are using this method, please migrate to using the `orgSearchUrl`." %}

## Verify your User

In the examples above, the strings and IDs returned by your org search request should be included in the
request body for the `/step/collectStudentPersonalInfo` `POST` request. For more details on verification steps, see [Verification]({{ 'rest-api#/verification' | relative_url }}) in our API reference.

{% include note.html content="The `organizationID` submitted with each request is checked for eligibility for the program. If an ineligible `organizationID` is submitted, the recoverable error `invalidOrganization` is returned. Read more about [recoverable errors](/api-quickstart#recoverable-errors) in the [REST API section](/api-quickstart#basics)." %}


**Request**:

```http
POST ​/verification​/program​/{programId}​/step​/collectStudentPersonalInfo HTTP/1.1
Content-Type: application/json

{
    "firstName": "Jane",
    "lastName": "Ivy",
    "email": "jane@harvard.edu",
    "birthDate": "1999-09-30",
    "organization": {
        "name": "Harvard University",
        "id": 1426
    },
    "metadata": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
    }
}
```

A successful response will return a `200 OK` status code and your new `currentStep` in the response body. If the user is succesfully verified
instantly, your `currentStep` will be `success` and you can proceed to checkout with the offer code defined in your program.

If the API request was a success, but the user was *not succesfully verified instantly*, your current step will be `docUpload`
and the response body will include the `submissionUrl` where you can submit the uploaded documentation.


**Successful Instant Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "currentStep": "success",
    "verificationId": "5c82b3ab8119982db2c2845a",
    "rewardCode": "YOUR_OFFER_CODE",
    "errorIds": [],
    "segment": "student",
    "subSegment": null
}
```

**Unsuccessful Instant Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "currentStep": "docUpload",
    "verificationId": "5c82b0a58119982db2c28418",
    "submissionUrl": "https://services.sheerid.com/rest/v2/verification/5c82b0d68229982db2c28418/step/docUpload/693c7bdc83d04c9987008ee705690490",
    "segment": "student",
    "subSegment": null,
    "errorIds": []
}
```
