A non recoverable error will have `error` as the `currentStep` and will provide both a list of `errorIds` as well as a `systemErrorMessage` that can be used to determine
what caused the failure to assist with debugging. An example error response would look like this:
```json
{
    "verificationId": "111111111111111111111111", // Verification ID that should be used for all future calls
    "currentStep": "error", // The step in the verification flow the current verification is on
    "errorIds": [
        // The errors that occurred when attempting the step
    ],
    "systemErrorMessage": "Debugging message", // A description of the cause for the error to aid with debugging
    "segment": "student", // The current segment we are verifying
    "subSegment": null, // The current subsegment we are verifying if applicable
    "submissionUrl": "https://submission-url.com" // The URL to submit the person data to
}
```

These errors occur when programs or verifications are not found, when internal SheerID errors occur, or when a step can not be completed for a non-user related reason.
