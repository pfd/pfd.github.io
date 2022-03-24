---
layout: default
title: Test Program
nav_order: 9
has_children: false
parent: Getting Started
permalink: /getting-started/test
description: Test the success and failure workflows and your consumer messaging copy.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

When a new program is created and customized, it begins in test mode. Test mode lets you easily simulate the various consumer journeys that may be a part of the verification process.

A program in test mode will clearly say that on the program install page as well as at the top of the rendered form, in a red banner. When you are done testing, push the program live to connect to real data sources and real doc review; your program is then ready for sending consumer traffic to it!

{% include image.md name="Test Button" %}

{% include note.html content="It may take a few minutes for recently-made edits to show up in the rendered form" %}

You can test your program flows in two different ways:

- Install the code snippet into your site and interact with the form there.	This is preferred, for end-to-end testing of the consumer journey to see the offer, get verified, and complete the end goal of a purchase or signup.
- For quick testing of only the verification process, click the *See Preview* button beneath the code snippet in MySheerID.<br><br>

## Happy Path

1. Navigate to the page where you are advertising your offer
2. Open the verification form
3. Enter any dummy data you want, for testing. Use a real email address though, to receive the email notifiers.
4. SheerID will simulate an approval. If you’re using a single-use code reward strategy, you will be given one of the real codes.
5. Check you can successfully apply the discount, to convert to your end goal.<br><br>

## Alternative Paths

{% include image.md name="Happy Path Flow" %}

1. Type in **REJECTED** as the first name to simulate no instant match.

    1. Some orgs and verification types support alternative methods of verification, such as SSO or email loop. If the program and org you entered into the form support one of these methods, you will be taken to that step in the process.

    2. Otherwise, you will see the Doc Upload step and be asked to upload a file proving your eligibility for the offer.

2. In the Doc Upload step, you have 3 options. Upload the test documents listed below to simulate the different outcomes.

    1. To simulate *auto-approval*, upload a file with the name `approve_sheerID_docReview_testMode.png`. Within 20 seconds after submitting the document, you’ll be taken to the Approved step.

    2. To simulate *auto-rejection*, upload a file with the name `reject_sheerID_docReview_testMode.png`. Within 20 seconds after submitting the document, you’ll be taken back to the Doc Upload step and be given the chance to try again.

    3. To simulate a *doc review* scenario (aka Pending), upload a file with the name `needs_review_sheerID_docReview_testMode.png`. The verification will stay in doc review pending mode.<br><br>

## Looking Up Test Outcomes

If you want to see more information about test verifications, click on the *Search* tool in the left navigation found within MySheerID. By default, the tool only searches live verifications; to find test mode verifications, add *"testing:"* as a prefix to the search term. Eg if you started a test verification with the email *"johndoe@gmail.com"* then you would search *“testing:johndoe@gmail.com”*<br><br>
