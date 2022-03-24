A recoverable error will include the step the verification was on before the error occurred. So if you were attempting to submit a student subject for the `collectStudentPersonalInfo` step, you could receive this response:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "collectStudentPersonalInfo", // The step in the verification flow the current verification is on
    "errorIds": [
        // The errors that occurred when attempting the step
    ],
    "segment": "student", // The current segment you are verifying
    "subSegment": null, // The current subsegment you are verifying if applicable
    "submissionUrl": "https://submission-url.com" // The URL to submit the person data to
}
```
The `errorIds` will indicate what went wrong, but since the `currentStep` is not `error` it means the issue could be corrected. These errors occur when bad data was
supplied, e.g. an invalid birth date, invalid email, invalid organization, etc. 


