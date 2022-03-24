---
layout: default
title: How it Works
nav_order: 1
has_children: false
permalink: /concepts
description: Each SheerID verification follows a distinct *flow*, which is made up of discrete *steps*. As your user proceeds through the steps, our API will return a step name for what it expects to receive next, to progress the verification through its flow. In this section you'll learn about flows and steps, and what to do if you encounter an error along the way.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Flows

A SheerID *flow* is the series of *steps* that lead to a verification outcome. If a subject can be instantly
verified, the flow is very simple:

{% include image.md name="Successful instant flow" %}

In the case of a successful instant verification, we will receive the data from the user, run it against
an authoritative data source for verification, and return a `success` response, indicating that you may
now proceed to checkout.

Unfortunately, not all verifications will be successful on the first try, so you must account for all
possible user journeys, including an unsuccessful instant outcome, which sends a user to the
document review step, data entry errors, and so on.

The image below represents a complete flow for a US student verification, which is typical of most
segment flows. If an instant verification is not possible, the flow proceeds to the Doc Upload step,
in which the user is asked to upload documentation verifying their eligiblity for the offer. If the
documentation is successfully uploaded, proceed to the Pending step, and so on, until an outcome is
determined, either successful or unsuccessful.

{% include image.md name="Student Flow" %}

See [Flow Diagrams]({{ 'reference#flow-diagrams' | relative_url }}) for detailed flows for the various
supported segments.

## Steps

A SheerID verification happens one step at a time. Steps combine together into a [flow]({{ 'concepts#flows' | relative_url }}). Step names may
vary slightly depending on the [segment]({{ 'concepts#segments' | relative_url }}), e.g., "Collect student info" vs. "Collect military status," but
the basic steps are similar from one segment to the next.

Below we will discuss the basic details of the different steps you will encounter in the verification
process.


### Collect Info

Collecting information from a user is the first step in a verification. This is where you render a form.

{% include image.md name="Collect Student Info" %}


### Success

If you go straight from the collect info step to success, congratulations! Typically a
reward code is shown to the user on success. More seamless transitions can be achieved
with JavaScript such as redirecting the user, or auto-applying a code to their cart.

{% include image.md name="Success" %}

### Doc Upload

Instant verification may not be possible for a given user or verification type.
In these cases, we will require that the user uploads documentation in order to complete
the verification. Documents will be reviewed manually by SheerID staff.

The image below is an example of a student experience for the `docUpload` step, giving
the user the option to upload the required documentation.

{% include image.md name="Doc Upload" %}

### Pending

When the user uploads documentation, the flow moves to the `pending` step, during which time SheerID staff will review the provided documentation to verify its authenticity and adherence to the rules of the offer.

Below is an example user experience for a student who has successfully uploaded the
requested documentation.

{% include image.md name="Processing step" %}

Since the document review process is manual, it takes some time, and you should assume
that the user will not wait on your site for the approval. Provide an experience that
allows them to redeem their offer from the approval email that you configured in
[MySheerID](https://my.sheerid.com){:target="_blank"}.

{% include note.html content="Exact timing for document review varies by segment and geography." %}

### Attempts Exhausted

If the user fails to provide valid documentation, after 3 attempts the verification will move to the *error* step. At this point the verification has failed, and you must start a new verification process.

{% include image.md name="Doc Review Limit Exceeded" %}

## Segments

At SheerID, we verify the inclusion of visitors to your site within your target population, or *Segment*.
This documentation pertains to segments that you can create and configure in our self-service web portal ([MySheerID](https://my.sheerid.com){:target="_blank"})
and JavaScript library.

Currently we support the following six segments in our self-service platform: US Student, Military, First Responder, Age, Teacher, and Medical Professional. The links below will take you to detailed flow diagrams for each segment.

* [US Student]({{ 'reference#student-flow' | relative_url }})
* [Military]({{ 'reference#military-flow' | relative_url }})
* [First Responder]({{ 'reference#first-responder-flow' | relative_url }})
* [Age]({{ 'reference#age-flow' | relative_url }})
* [Teacher]({{ 'reference#teacher-flow' | relative_url }})
* [Medical Professional]({{ 'reference#medical-professional-flow' | relative_url }})

If you are looking for a segment other than those listed above, please see [Who We Verify](https://www.sheerid.com/we-verify-for-you/) on our corporate website, and contact your Account Manager for more details.

## Subsegments

Within certain *Segments*, there may be eligible *Subsegments* to which you can offer a narrower
targeted offer. Available subsegments include:

| Segment  | Subsegment |
| -------- | ----------- |
| Student | - Full + part time college students<br>- College-bound high school students<br>- All high school students 16 and older<br>- High school students accepted into a college|
| First Responder | - Firefighter<br>- Emergency Medical Technician<br>- Police |
| Medical | - Nurse<br>- Doctor<br>- Other Health Worker<br> |
| Military | - Active Duty<br>- Veteran<br>- Retiree<br>- Reservist<br>- Registered Military Dependents<br> |
| Age | *Subsegments are determined by an age range selector*. |

The verification flow for a subsegment is inherited from the parent segment. We recommend including
all available subsegments in your offer for maximum reach, and using subsegments only when they align
with your specific offer criteria.

You can configure [Eligible Subsegments]({{ 'manage-programs/program-settings#eligible-subsegments' | relative_url }})
in the Programs Settings section of MySheerID.

## Errors

Errors may occur during verification flows, primarily due to improperly inputted data
from the user. Fortunately, such errors are recoverable, and when encountered, our API
will provide you with the information you need to retry the step.

Certain rare errors are non-recoverable and may require you to start the verification process
anew.

To learn more about errors and how to handle them, see [Errors]({{ '/api-quickstart#errors' | relative_url }}) in our REST API documentation.

For a complete list of possible `errorIDs`, see our [JavaScript library reference](/jslib-api?index.html#errorid).
