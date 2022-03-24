---
layout: default
title: Verification Service Definition
nav_order: 9
has_children: false
parent: Reference
permalink: /reference/verification-service-definition
description: '**v1.0 — October 11, 2021**'
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}


## Overview

SheerID sells verification services to our Customers, typically companies, governmental agencies, or other organizations. SheerID verifies one or more attributes about a person’s identity, for example, if they are an active military member, a teacher, or a first responder.

## Verification Service Definition

To provide verification services, SheerID collects personally identifiable information (PII) from consumers. Consumers must “opt-in” to this verification service, giving SheerID consent to perform a verification on one or more identity attributes. If we are unable to verify through one or more instant authoritative data sources, consumers have the option to prove their status by uploading supplemental documentation. If a given document is rejected, a consumer has up to 14 days (by default) to upload supplemental documentation. They have 2 additional opportunities (by default) to upload documentation.

### Verifications Support

Should a consumer feel a particular result was reached in error, they have 90 days (by default) from their most recent interaction with our verification service to contest any result. To do so consumers must contact our verification support at customerservice@sheerid.com.

### Fraud Prevention

As a critical component of our verification services, SheerID works continuously to identify patterns of fraud within programs on behalf of our Customers. Techniques include retrospective studies of consumer verification record data, using statistical analysis, machine learning, and comparison to 3rd party data (including, but not limited to, results from multiple authoritative data sources).

In the rare case where significant fraud is found, we take active steps to block the exploit, notify impacted customers and, if warranted, work with them to put additional prevention measures in place.

SheerID may then retroactively update prior false positive or negative verification results to reflect our understanding of the event, based on this subsequent analysis. If, for example, we detect that a true verification result should be false due to fraud, we would change the result, append a corresponding informational message, and update the modification timestamp. This provides transparency and helps to block future fraud, should the fraudster attempt another exploit.

### Verification Lifespan

As a means to help ensure proper historical recordkeeping for our Customers, a verification result is considered final after a period of 180 days. SheerID will not retroactively change a verification after that period of time.  SheerID also will not change a verification after the termination or expiration of a customer contract.