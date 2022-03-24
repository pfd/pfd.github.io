---
term: Status
---

The current status of the verification request. There are four possible values for this data element:

* `NEW` indicates that the verification request has not yet been submitted to any Verification Source
* `PENDING` indicates that the final response from verification sources has not been received. Requests with this status have either not completed Document Review Verification or are in-progress of verifying through Single Sign On sources
* `OPEN` indicates that the verification request has been submitted to a verification source but the individual has not been matched. In most cases, `OPEN` statuses will have a blank *Result* and did not submit a document for review.
* `COMPLETE` indicates that the verification request has been submitted to a verification source and the individual has been matched and has a result of `TRUE` or `FALSE`.
