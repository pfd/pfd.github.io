---
layout: default
title: JavaScript Library
nav_order: 5
has_children: false
permalink: /js-library
description: The SheerID JavaScript library is at once a client for the SheerID REST API, an engine for rendering verification forms on your site, and a data collection tool for your verification programs.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

This guide introduces advanced topics for using the SheerID JavaScript library, including UI
customization, available JSAPI methods, and form restructuring options.

In order to proceed, you must have already created an account and a new verification
at [MySheerID](https://my.sheerid.com){:target="_blank"}. If you have not done so, please see the
[Account Setup]({{ 'getting-started/account-setup' | relative_url }}) page in our Getting Started documentation.

## Installation

{% include programs.md %}

Then install the JS library using a script tag, calling the library from our CDN.

{% include installation.md %}

You should now see a rendered form on your site. To test the form's functionality,
see the [Test Program]({{ '/getting-started/test' | relative_url }}) page in our Getting Started section.

{% include note.html content="SheerID uses [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to ensure that your target resources are securely downloaded over CDN." %}

## Customization

You have full control over the appearance of the verification forms on your site, from an out-of-the=box
implementation using a form rendered by our JavaScript library, to a completely custom form that bypasses our JavaScript
library and interacts with SheerID directly through our REST API.

This guide assumes that you would like to use our JavaScript library in part to perform at least one
of the following functions:

* Render a verification form and/or individual fields on your site.
* Collect user-submitted data for reporting and marketing purposes.
* Interact with the SheerID service as an API client, handling requests and responses to move verifications along efficiently.

If so, great! We'll get into some of the available customization options below.

If you are planning to render your own forms and collect your own user data, and only need to communicate with our
REST API, see [REST API]({{ 'api-quickstart' | relative_url }}).

### CSS

We encourage you to include SheerID's stylesheet to provide basic style for the form.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.css" type="text/css" crossorigin="anonymous" />
```

#### Override CSS

You can override styles by including your own stylesheet after SheerID's.
View an example of overwritten styles on <a href="https://jsfiddle.net/AaronSheerID/n5h46dao/" target="_blank">JSFiddle</a> here.


#### Direct Step Access

When rendering the <a href="../docs/examples/entire-form.html" target="_blank">entire form</a>, you can directly access any step in the [flow]({{ 'concepts#flows' | relative_url }}) with a query parameter. This makes it easy to refresh the page and see your CSS changes, without having to fill out the form repeatedly.

We recommend styling each of these steps to suit your brand, since it's likely that many users will reach all of them.

{% include note.html content="Mock steps are not connected to our servers and will not work if you submit data. To test the flow, see [Test Program](../../getting-started#test-program)." %}

The following examples show how to mock the various steps on a student verification.

* Collect Student Personal Info Step
[?mockStep=collectStudentPersonalInfo](../docs/examples/entire-form.html?mockStep=collectStudentPersonalInfo){:target="_blank"}

* Pending State
[?mockStep=pending](../docs/examples/entire-form.html?mockStep=pending){:target="_blank"}

* Success
[?mockStep=success](../docs/examples/entire-form.html?mockStep=success){:target="_blank"}

* Doc Upload
[?mockStep=docUpload](../docs/examples/entire-form.html?mockStep=docUpload){:target="_blank"}

* Doc Review Limit Exceeded
[?mockStep=docReviewLimitExceeded](../docs/examples/entire-form.html?mockStep=docReviewLimitExceeded){:target="_blank"}

* Error
[?mockStep=error](../docs/examples/entire-form.html?mockStep=error){:target="_blank"}

* Loading<sup>1</sup>
[?mockStep=loading](../docs/examples/entire-form.html?mockStep=loading){:target="_blank"}

<sup>1</sup> This is a special case where we show the loading spinner so it can be styled. Program information is not available for this application state.


<!-- The following section temporarily removed until this feature is repaired -->
<!-- ### Form Restructuring

If you do not wish to render the entire form, or would like to render the fields in
a different order, you can customize the layout.

#### Discrete Fields

To render only certain fields, you can render fields discretely. In the following example
we render only the `birthDate` field:

```html
<div id="birthdate-field"></div>
<script>
var myBirthdateField = new sheerId.BirthdateField(document.getElementById('birthdate-field'));
myBirthdateField.setValue('2014-8-24'); // set the value (optional)
</script>
```

See the available [DiscreteField](/jslib-api?interfaces/discretefield.html) methods in our library reference.

**Example**:

In this [custom form example](../docs/examples/custom-form.html){:target="_blank"}, the customer
renders the fields in a custom order using fields from an existing shopping cart. -->

### Internationalization (i18n)

We offer language for your verification form in a layered approach. The layers are:

1. SheerID default messages
2. Per-program (overrides "default")
3. JavaScript Library (overrides "per-program" and "default")


#### SheerID Default Messages

All of the words and phrases shown in our verification flows are offered in a variety of languages. You can see which messages are available in the REST API reference.

#### Per-Program Overrides

Certain phrases can be customized by editing your program at [MySheerID](https://my.sheerid.com){:target="_blank"}, using the Customize Experience step.

#### JavaScript Library Overrides

You may specify messages when initializing your form using the `setOptions` method in Javscript.

```html
<script>
sheerId.setOptions({
    messages: {
        'step.personalInfo.title': 'Verify (js options override)'
    }
});
</script>
```

Note that all messages objects are flattened, so you can use a dot-string property or full objects:

```html
<script>
sheerId.setOptions({
    messages: {
        // dot-string works
        'step.personalInfo.title': 'Verify (js options override)',

        // object works too!
        step: {
            personalInfo: {
                subtitle: 'Verify Subtitle (js)',
            }
        }
    }
});
</script>
```

*See a live example* [here](../docs/examples/language-override.html){:target="_blank"}.


## JSAPI Methods

The JavaScript library provides the following JSAPI methods to assist you with customizations.

* `setOptions()`
* `setMetadata()`
* `getMetadata()`

See our [JavaScript Library Reference](/jslib-api?interfaces/sheeridjsapi.html){:target="_blank"} for details.

### setOptions()

Accepts the following keys: `restApi`, `logLevel`, `mockStep`, `locale`, `messages`, `urlStudentFaq`, `urlSeniorFaq`, `urlMilitaryFaq`, and `urlTeacherFaq`

**Example**:

```js
sheerId.setOptions({
    logLevel: 'info',
})
```
### setMetadata()

Accepts up to 20 custom key/value pairs and will pass data through with verification request.
Each key and value has a max length of 256 characters. Any metadata keys/values added here will
be included in our verification reports.

**Example**:

```js
sheerId.setMetadata({
    key1Name: 'value1',
    key2Name: 'value2',
})
```

Using our pre-defined metadata key `optin` will render an opt-in checkbox on your program. Example:

```js
sheerId.setMetadata({
    optin: '',
})
```

### getMetadata()

Returns an object containing all current metadata key/value pairs.

**Example**:

**In**:

```js
sheerId.getMetadata()
```
**Out**:

```json
{
   key1Name: 'value1',
   key2Name: 'value2',
   optin: '',
}
```
