---
layout: default
title: Add School Request API
nav_order: 32
permalink: /tutorials/add-school-request
parent: Tutorials
description: In this guide, we’ll go through the necessary steps to search for eligible and ineligible schools for your program and submit an Add School Request. After completing this tutorial, you should be able to use this API to build your own [Add School Request form](../add-school-request-form). 
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview
To support searching for schools and submitting a request, we provide 3 endpoints:
- `POST organization/addSchool/search/domain`: Search by website domain.
- `POST organization/addSchool/search/name`: Search by name.
- `POST organization/addSchool`: Submit an Add School request.

Searching and submitting a request should be a 3-step process using these methods. Below we will walk you through the flow. For details, see our [API Reference](/rest-api)

## Search by Domain
Your form needs to begin by collecting the school’s country and website domain from the user, then using the API to find any matching schools. Starting with the website domain rather than school name maximizes locating the correct school since it avoids any confusion around school names, which are often abbreviated or shortened. For example, in the USA, Oklahoma State (go.okstate.edu) and Oregon State (oregonstate.edu) are often called OSU, but their website domains are quite different.

Begin by making a `POST` request to the `organization/addSchool/search/domain` endpoint, including your [programID]({{ 'tutorials/api-walkthrough#terminology' | relative_url }}), the website domain to search, and the county where the school is located. All these parameters are required. If any are not provided, a `400` error will be returned. `400` errors will also result if the programID is not valid or the domain submitted is not formatted correctly, for instance it does not contain a period or valid top-level domain.

{% include note.html content="You may only search for schools in countries supported by the programID included in your request. If a country is not configured on the programID provided a `400 Country not eligible for program` error will be returned." %}

Example request:

```http
POST /rest/v2/organization/addSchool/search/domain HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
 
{
  "programId": "<YOUR_PROGRAM_ID>"
  "schoolDomain": "state.edu",
  "schoolCountry": "US" 
}
```

### Eligible and Ineligible Results
Once submitted, we search for schools that match the country and domain in our school database. Matches are divided into Eligible and Ineligible results based on the configuration of your program. Eligible schools are those that are returned when you utilize our [organization search]({{ 'fetching-organizations#overview' | relative_url }}) or typeahead features. Meaning they can be chosen by students and used to submit valid verification requests for your program. Other schools are ineligible. 
For instance, if your program only includes higher education institutions, and we locate a matching high school, it will be included in the ineligible list. This allows you to have clear messaging on your form that the school does not need to be requested as an addition; it is known but not eligible for your offer.

Example successful response (with fictional schools):

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "errorIds": [],
  "eligible": [
    {
      "id": 1,
      "name": "State College"
    }
  ],
  "ineligible": [
    {
      "id": 2,
      "name": "State High School"
    }
  ]
}
```

## Search by Name
If the user’s website domain search returns no results, the school may not be known by SheerID and need to be requested as an addition. To be sure, you should include an option to search by school name. Be sure to collect the full school name from the user to maximize chances for a match. 

To search by name, make a  `POST` request to the `organization/addSchool/search/name` endpoint, including your [programID]({{ 'tutorials/api-walkthrough#terminology' | relative_url }}), the school name to search, and the county where the school is located. All these parameters are required. If any are not provided a `400` error will be returned. As with the domain search, you may only search for schools in countries supported by the programID.

Example request:

```http
POST /rest/v2/organization/addSchool/search/domain HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
 
{
  "programId": "<YOUR_PROGRAM_ID>"
  "schoolName": "Oregon State University",
  "schoolCountry": "US" 
}
```

### Eligible and Ineligible Results
Once submitted, we search schools that match the country and school name in our school database. Like with domain searching, matches are divided into Eligible and Ineligible results based on the configuration of your program. 

Example successful response for a search of “Oregon State University”:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "errorIds": [],
  "eligible": [
    {
      "id": 1,
      "name": "Oregon State University"
    }
  ]
}
```

### Too many organizations error
Because we want all submissions of Add School Requests to be for a specific school, only 25 results are returned for any search. If more than 25 matches are found the response will return the lists of schools and also include an error `tooManyOrganizationMatches`. For example, this error will result if the user enters a search term of “Oregon,” which is not a school, but the name of a state with many schools. You should prevent the submission of an Add School Request when this error is returned. Users should be made to refine their search until the API returns fewer than 25 results. 

Example response with the error `tooManyOrganizationMatches`

```json
{
  "errorIds": [ "tooManyOrganizationMatches" ],
  "eligible": [
    ...all available matches here
  ],
  "ineligible": [
    ...all available matches here
  ]
}
```

## Submit a request
If the user’s website domain and name searches return no results the school may not be known by SheerID and need to be requested as an addition. To submit a request make a  `POST` request to the `organization/addSchool` endpoint, including all of the following:

- User’s First and Last Name
- User’s email address
- School Name
- School website domain
- School country

with the following payload structure:

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "me@email.com",
  "schoolName": "My new school",
  "schoolDomain": "myschool.com",
  "schoolCountry": "US",
  "programId": "<YOUR_PROGRAM_ID>"
}
```
All parameters listed in the example above are required, and the email and schoolDomain are validated. If any parameters are invalid, a `400` response will be provided. If successful, you will see a `204 No Content` success response.

### Request processing
A request to add a school is not a guarantee it will be added. All requests are evaluated by SheerID staff. We highly recommend including messaging to set the right expectations with your users about the next steps. For example, this text is shown after every request is submitted through the [Add School Request forms]({{ 'add-school-request-form' | relative_url }}) linked from SheerID hosted verification forms:  

{% include image.md name="Add School Request Submit Confirmation" %}

## Common errors
The following are examples of common error responses.

### Required field missing
Example response when search does not include the school’s country:

```json
{
  "errorIds": [ "invalidRequest" ],
  "systemErrorMessage": "schoolCountry is required"
}
```
Response code: 400

### Program Not Found
Example response when a matching programID cannot be located:

```json
{
  "errorIds": [ "noProgram" ],
  "systemErrorMessage": "Program with id '222222222222222222' does not exist"
}
```
Response code: 404

### Unsupported Country
Example response when the country submitted is not configured on the program:

```json
{
  "errorIds": [ "invalidRequest" ],
  "systemErrorMessage": "Provided country is not eligible"
}
```
Response code: 400