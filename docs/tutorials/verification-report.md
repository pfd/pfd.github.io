---
layout: default
title: Verification Report
nav_order: 11
permalink: /tutorials/verification-report
parent: Tutorials
description: In this guide, we'll go through the necessary steps to generate and download a verification report using our REST API.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}


## Overview

To programmatically consume verification reporting data for your internal systems,
we provide 3 reporting endpoints:

* `POST /report/verification`: Generate a verification report.
* `GET /report/{reportId}/status`: Retrieve report generation status by report ID.
* `GET /report/{reportId}`: Retrieve data for a previously-generated report.

Generating and retrieving reporting data is a 3-step process using these methods. Below
we will walk you through the flow. For details, see our [API reference]({{ 'rest-api' | relative_url }}){:target="_blank"}.

{% include warning.html content="Column order in our verification reports is not fixed and new columns may appear without notice, due to factors including but not limited to:<br><br>- New data points that SheerID exposes in reporting<br>- Metadata that you include in verification requests<br><br>If you are consuming SheerID reports programmatically, code defensively. Your integration should be tolerant of header changes." %}

## Generate a Report

Begin by making a `POST` request to the `/report/verification` endpoint, specifying the `format` as
`CSV`, optionally including a start and end date for the report.

**Example request**:

```http
POST /rest/v2/report/verification HTTP/1.1
Host: services.sheerid.com
Content-Type: application/json
Authorization: Bearer <YOUR_API_TOKEN>

{
	"format": "CSV", // 'format' is a required field. 'CSV' is the only acceptable format value.
	"startDate": "2019-08-01", // Optionally include start and end dates.
	"endDate": "2019-08-17"
	"isPiiIncluded": true // Optionally include PII details in report 
	"piiReason": "Reason to request PII" // Required if requesting PII with 'isPiiIncluded' field.
}
```

{% include note.html content="`REPORTER` role is required. If you have the `PERSON_DATA` role, you will get PII in addition to the other columns in the report. To improve logging of all report requests which include PII, we added an optional `isPiiIncluded` field; when used you must also supply a `piiReason`. These fields will be required in the future. Notice of that change will be communicated via email and [Release Notes](../news)." %}

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json


{
    "id": "5d59a3dcf1d4ac6382441624",
    "status": "PENDING",
    "statusUrl": "https://services.sheerid.com/rest/v2/report/5d59a3dcf1d4ac6382441624/status",
    "retrievalUrl": null,
    "requester": "5c1c45b451cc4d30b7a132c2",
    "created": 1566155740700
}
```

## Check Report Status

With the `statusUrl` returned in the first step, you can check the report's status.

**Example request**:

```http
GET /rest/v2/report/5d59a3dcf1d4ac6382441624/status HTTP/1.1
Host: services.sheerid.com
Authorization: Bearer <YOUR_API_TOKEN>
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "5d59a3dcf1d4ac6382441624",
    "status": "COMPLETE",
    "statusUrl": "https://services.sheerid.com/rest/v2/report/5d59a3dcf1d4ac6382441624/status",
    "retrievalUrl": "https://services.sheerid.com/rest/v2/report/5d59a3dcf1d4ac6382441624",
    "requester": "5c1c45b451cc4d30b7a132c2",
    "created": 1566155740700
}
```

## Download Report Data

Once the report status is `COMPLETE`, your report is ready for download using
the `retrievalUrl` provided in the status step.

**Example request**:

```http
GET /rest/v2/report/5d59a3dcf1d4ac6382441624 HTTP/1.1
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
