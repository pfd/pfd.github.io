---
layout: default
title: Reverification
nav_order: 12
permalink: /tutorials/reverification
parent: Tutorials
description: In this guide, we'll go through the necessary steps to submit batches of reverification requests to reverify end users on a regular basis.
toc: true
published: false
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

The `reverification` endpoint lets you create a worklow to reverify previously-verified users
on a regular cadence. For details, see our [API reference]({{ 'rest-api' | relative_url }}){:target="_blank"}.

You will need the `BULK_VERIFIER` user role to perform reverifications. Contact SheerID Support to obtain this role for your account.

## Create a Reverification Task

Begin by making a `POST` request to the `/verification/reverify` endpoint, specifying the relevant `programId` and the `verificationIds` for the end users you wish to reverify.

**Example request**:

```http
POST /rest/v2/verification/reverify HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
Authorization: Bearer <YOUR_API_TOKEN>

{
	"programId": "5d4a5d2a7b9ca962e0b6a901",
	"verificationIds": [
		"5d4a5b672988eb627bb6ffa6",
		"5d4a5eea2988eb627bb70001",
		"5d4a65ba2988eb627bb700b9",
		"5d54a6a12de9ad624429424c"
	]
}
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json


{
    "batchId": "7740a4ea7df746b1956d3126021874a9",
    "statusUrl": "https://services.sheerid.com/rest/v2/verification/reverify/7740a4ea7df746b1956d3126021874a9",
    "reportUrl": "https://services.sheerid.com/rest/v2/report/reverify/7740a4ea7df746b1956d3126021874a9"
}
```

## Check the Reverification Status

With the `statusUrl` returned in the first step, you can check the status of your reverification.
A successful response will return a `batchId` that you can use to request a report for the
reverification.

**Example request**:

```http
GET /rest/v2/verification/reverify/{batchId} HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_API_TOKEN>
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "batchId": "91fdf69ef8134d8f94ed4ae4e4dbe648",
    "created": 1571525194820,
    "status": "COMPLETE",
    "totalRecords": 4,
    "recordsProcessed": 4
}
```

## Request a Report for the Reverification

Using the `batchId` from the previous step, make a `POST` call to `/report/reverify/{batchId}`
to initiate a report.

A successful response will include an `id` parameter. Use the value of the `id` as the `reportId` path parameter when downloading the report.


**Example request**:

```http
POST /rest/v2/report/reverify/{batchId} HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_API_TOKEN>
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "5dab925358435a645cbe733c",
    "status": "PENDING",
    "statusUrl": "https://services.sheerid.com/rest/v2/report/5dab925358435a645cbe733c/status",
    "retrievalUrl": null,
    "requester": "5c0d45b651cc4d31b7a222c2",
    "created": 1571525203545
}
```

##  Check the Status of the Reverification Report


**Example request**:

```http
GET /rest/v2/report/{reportId}/status HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_API_TOKEN>
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "5dab925358435a645cbe733c",
    "status": "COMPLETE",
    "statusUrl": "https://services.sheerid.com/rest/v2/report/5dab925358435a645cbe733c/status",
    "retrievalUrl": "https://services.sheerid.com/rest/v2/report/5dab925358435a645cbe733c",
    "requester": "5c0d45b651cc4d31b7a222c2",
    "created": 1571525203545
}
```

## Download Reverification Report


**Example request**:

```http
GET /rest/v2/report/{reportId} HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_API_TOKEN>
```

**Example response**:

```csv
"Request ID","Request Timestamp","Account ID","User ID","Username","Result","Status","Errors","ErrorCodes","Person ID","Organization ID","Organization Name","Organization Phone","Organization Street","Organization City","Organization Zip","Organization State","Organization Country","Organization Type","Verification Types","Requested Affiliation Types","Confirmed Affiliation Types","Data Updated Date","Period Begin Date","Period End Date","Test Mode","PHONE_NUMBER","EMAIL","SSN_LAST4","COMPANY_NAME","MIDDLE_NAME","USERNAME","LAST_NAME","IP_ADDRESS","ADDRESS1","CITY","STATUS_START_DATE","JOB_TITLE","SSN","RELATIONSHIP","FULL_NAME","BIRTH_DATE","POSTAL_CODE","FIRST_NAME","STATE","ID_NUMBER","SUFFIX","EMAIL2","ADDRESS2","Program Name","amount","currency","trackingId","marketConsentValue","rewardCode","baz","foo","templateId","token","verifyUrl","transactionId"
"5d4a5b672988eb627bb6ffa6","2019-08-07 05:03:43","5c1c45b451cc4d30b7a132c2","5c1c45b451cc4d30b7a132c2","user@company.com","false","COMPLETE","Person is ineligible for verification because of age.","UNDERAGE_PERSON","5d4a5baf7b9ca962e0b6a8c5",,,,,,,,,"AGE_ID","AUTHORITATIVE","AGE","AGE","","","","true",,"end-user@isp.com",,,,,"jackson","24.21.170.221",,,,,,,,"2000-1-30","97239","phil",,,,,,"Olive Garden Closing Sale",,,,"true",,,"bar","5d1314a34e15d06159132e03",,,
"5d4a5eea2988eb627bb70001","2019-08-07 05:27:46","5c1c45b451cc4d30b7a132c2","5c1c45b451cc4d30b7a132c2","user@company.com","true","COMPLETE",,,"5d4a61527b9ca962e0b6a96e","3679","UNIVERSITY OF SOUTHERN CALIFORNIA",,,"LOS ANGELES",,"CA","US","UNIVERSITY","AUTHORITATIVE","STUDENT_FULL_TIME, STUDENT_PART_TIME","STUDENT_FULL_TIME","","","","true",,"end-user@isp.com",,,,,"johnson","24.21.170.221",,,,,,,,"1990-1-30",,"phil",,,,,,"metadata test",,,,"false","EXAMPLE-CODE",,"bar","5d4a5d2a7b9ca962e0b6a901",,,
"5d4a65ba2988eb627bb700b9","2019-08-07 05:47:31","5c1c45b451cc4d30b7a132c2","5c1c45b451cc4d30b7a132c2","user@company.com","true","COMPLETE",,,"5d4a65f37b9ca962e0b6a9f2","4343","YALE UNIVERSITY",,,"NEW HAVEN",,"CT","US","UNIVERSITY","AUTHORITATIVE","STUDENT_FULL_TIME, STUDENT_PART_TIME","STUDENT_FULL_TIME","","","","true",,"end-user@isp.com",,,,,"Jetson","24.21.170.221",,,,,,,,"1990-10-1",,"Joe",,,,,,"metadata test",,,,"false","EXAMPLE-CODE","lurhmann","bar","5d4a5d2a7b9ca962e0b6a901",,,
"5d54a6a12de9ad624429424c","2019-08-15 00:28:27","5c1c45b451cc4d30b7a132c2","5c1c45b451cc4d30b7a132c2","user@company.com","true","COMPLETE",,,"5d54a72b088ba462375748b5","3499","UNIVERSITY OF CALIFORNIA LOS ANGELES (UCLA)",,,"LOS ANGELES",,"CA","US","UNIVERSITY","AUTHORITATIVE","STUDENT_FULL_TIME, STUDENT_PART_TIME","STUDENT_FULL_TIME","","","","true",,"student@university.com",,,,,"johnson","24.21.170.221",,,,,,,,"1998-1-31",,"john",,,,,,"metadata test",,,,"false","EXAMPLE-CODE",,,"5d4a5d2a7b9ca962e0b6a901",,,
```
