---
layout: default
title: Design Program
nav_order: 4
has_children: false
parent: Getting Started
permalink: /getting-started/design-program
description: Design and configure a verification program.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Select Consumer Community

Get started creating a custom gated offer by selecting which consumer community you want to target. SheerID can verify many consumer communities, including Military, Student, Teacher, First Responder, and Age verification programs. For this walkthrough, we will choose the Student card.

{% include image.md name="SheerID Segments" %}.

## Define Your Offer

Once you choose the consumer community you wish to target, you will move to the *Eligibility* step. Here you will provide human-friendly name for your offer and define the communities and regions that are eligible to receive your offer.

{% include image.md name="Define Offer" %}
### Offer Name

Provide a name for your offer, e.g., "Back to School." This name will be used throughout the SheerID dashboard to identify this offer.

### Eligibility

By default, new programs include all applicable sub-segments. Our years of experience have taught us to be as inclusive as possible in the offer definitions. This will both help you reach the broadest possible audience and avoid creating undesired negative consumer sentiment. For example, many veterans get very upset and vocal about being excluded from a military offer.

However, SheerID enables you to narrow the scope of your offer should you wish to do so. Each [segment]({{ 'concepts#segments' | relative_url }}) supports a defined set of [subsegments]({{ 'concepts#subsegments' | relative_url }}). 

After you provide a name for your offer, you may unselect eligible subsegments for your offer under the **"Who is allowed to redeem it?"** header.

If for example you wish to only target college students, you can de-select the other sub-segments. Your changes will be saved and the program automatically updates:

  1. The selectable organizations in the verification form
  2. The data sources used to instantly verify consumers
  3. The document review rules applied to your program

{% include note.html content="If you narrow the scope of your eligibility, you should also update the messaging on the Collect Info step of your verification form. You want to clearly and succinctly state who is eligible, in a way that aligns with your sub-segment selections.
For example, if want to only target college students then you would select only the **Full + part time college students** box. Then navigate to the *Text* step of your program and update the *Collect Info* step to say 'Verify you're a student at a degree-granting university.'" %}

{% include image.md name="Student Align Text" %}

## Customize Experience

After clicking on the *Student* card you will advance to the *Text* section in the
progress header. In this section, and in the subsequent *Theme* and *Codes* sections, you can customize the look and feel of the
different verification steps to meet your brand guidelines.

### Customize Text

In the *Text* step, you will customize the messaging that your users will experience in the following three [steps]({{ 'concepts#steps' | relative_url }}) in a verification [flow]({{ 'concepts#flows' | relative_url }}):

* Collect Info (Collect)
* Success confirmation (Approved)
* Doc Upload (Upload)

{% include image.md name="Customize form" %}

1. Fill in the text fields in the *Collect info step*, *Approved step*, and *Upload document step* with your desired messaging. Note that as you complete the fields, the form preview on the right side of the screen will update to reflect your changes.
1. After you are satisfied with the content, click *Next*.

{% include note.html content="When you are creating your program initially, *Back* and *Next* buttons are available to guide you through the customization steps. When editing an existing program, you will instead be presented with a *Save* button to confirm changes." %}

### Customize Theme

In the *Theme* step, you can upload a logo for your program, select from 7 different web-friendly fonts and customize your lightbox and
font colors to match your branding using a color-picker or hex codes.

{% include image.md name="Customize Styles" %}

To upload your logo, click the *Upload Logo* box, and select a `.png`, `.jpg`, or `.gif` logo file
that is 1MB or less. You can delete the logo and upload a new one at any time by navigating back
to the *Theme* section of your Program page.

Preview the *Collect*, *Approved*, and *Upload* experiences by clicking their respective links
above the lightbox preview.

For a higher level of customization, click the Custom CSS tab and make changes to the lightbox through CSS. A tooltip is available to give common selectors that can be customized.

{% include warning.html content="Changes made in the Custom CSS tab will cascade, layering on top of and potentially changing any work done through the Design tab. Be sure to thoroughly test the final rendered styles." %}

Click *Next* when finished to move on to the *Codes* step.

### Select Promo Codes

The *Codes* step defines the method by which verified consumers can ultimately redeem your offer. You may choose to provide a discount code for the user to enter, validate the offer via account linking, or use a Shopify-generated code for your Shopify storefront.

In this step, click one of the following options:

#### Static Code

A static code is the simplest option, and will be the same for all users, e.g., `BACK_TO_SCHOOL`. This option is the least secure promo code type as it is an easy
target for discount abuse. If you choose to provide a discount code, we recommend
using the next option, Single-Use Codes.

#### Single-Use Codes

If you choose the Single-Use Codes option, you will be prompted to upload
a CSV file containing rows of unique codes. SheerID will issue one unique code per user until all are exhausted.

#### No Code (Account Linking)

An alternative to a static or single-use discount code is to use a webhook and
our API to create an automated, synchronous communication with your customer
database.

To use account linking, you must configure some program settings in MySheerID, and
you will need to write some code on your site to initiate a `verificationId` for your logged-in user and pass it to a webhook on success.

To learn more about account linking, see:

- [Account linking reward strategy](https://resources.sheerid.com/infographic/sheerid-s-account-linking-strategy){:target="_blank"}
- [Account linking flow diagram](https://resources.sheerid.com/infographic/how-information-typically-flows-through-the-account-linking-process){:target="_blank"}

{% include note.html content="If you choose to use account linking, then you will want to update the messaging in the *Approved* (aka Success) step and Approved email notifier to remove mention of discount codes." %}

#### Shopify Single-Use Codes

If your site is powered by Shopify, we provide a special version of single-use codes that are generated Shopify as needed. Contact our Client Delivery team to enable this method.

{% include image.md name="Promo Codes" %}

Once you have defined your offer code, click Save to finish creating your program and save the program name, offer name, and description. You are now ready to install your program.

### Publish Program

You're almost there. Now it's time to publish and test out your offer on your website. Head to the [Install Program]({{ 'getting-started/install' | relative_url }}) section to continue.
