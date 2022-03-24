---
layout: default
title: What We Offer
nav_order: 0
has_children: false
permalink: /introduction
description: At SheerID we enable gated offers by verifying participants so you don’t have to. Increase conversion rates for your highest-value customer segments with our powerful verification service.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## What is SheerID?

SheerID is a hosted user verification service. We provide front-end tools backed by authoritative data sources to confirm
the eligibility of your site visitors for your gated offer programs. We support multiple target *segments*, or demographic populations, for your programs, such as students, military, etc.

Whether you are offering a discount to college students, military personnel or seniors,
we make the process seamless for your customers and give you all the tools you need to convert users to your targeted programs.

## What is a Verification?

A *verification* is either the successful or unsuccessful outcome of a verification [flow]({{ 'concepts#flows' | relative_url }}), which is made up of a series of verification [steps]({{ 'concepts#steps' | relative_url }}).

We determine the success or failure of a verification by cross-referencing user-provided data with authoritative data sources. If a user cannot be
verified instantly through these sources, we provide a document review service to make a final determination.

Depending on the verification *type*, or [segment]({{ 'concepts#segments' | relative_url }}), individual steps in a flow may vary slightly,
but a typical flow looks something like this one, in which we verify a US student:

{% include image.md name="Student Flow" %}

## Verification Flows

As you can see in the above diagram, there are many paths to a successful verification, the simplest
coming from a successful *instant verification*. Failing instant success, we proceed to the "Doc upload" step, prompting the student to upload proof
of their student status.

As a verification flow proceeds from step to step, we will keep track of the current step and provide the
tools for you to prompt the user to proceed to the next step until the verification is complete, at which
time you may present them with an offer code.

For a more detailed look at flows, see [flows]({{ 'concepts#flows' | relative_url }}).

## Verification Methods

Verifications may be performed instantly, through our network of authoritative data sources,
or by document review, by SheerID documentation staff.

### Instant Verification

At the core of SheerID's platform is the instant verification engine that accesses hundreds
of authoritative data sources in real time and delivers results with
sub-second latency to ensure a seamless user experience.

If a user provides data that can be verified instantly, we will move the verification
directly to the "Success" step, as depicted in this simple flow diagram:

{% include image.md name="Successful instant flow" %}

Otherwise, we will move to the Document Review step.

### Document Review

If an instant verification is not available, users can upload documentation to complete
the process. The document upload process happens behind the scenes from a user's perspective,
and is supported in all of our verification flows.

{% include note.html content="You should include Document Review verification whenever applicable, to ensure that 100% of the eligible audience has a verification opportunity." %}

To see how the Document Review step is incorporated into a verification flow, see our different
[Flow Diagrams]({{ 'reference#flow-diagrams' | relative_url }}).

