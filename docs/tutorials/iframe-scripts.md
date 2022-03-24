---
layout: default
title: JavaScript Library Iframe Scripts
nav_order: 31
permalink: /tutorials/iframe-scripts
parent: Tutorials
description: In this guide, we’ll go through the display options and features of the iframe installation scripts in our JavaScript API. The end result is a verification form which displays as you prefer and takes advantage of the customization options we offer.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

The SheerID [JavaScript Library]({{ site.baseurl }}{% link docs/js-library.md %}) is at once a client for the SheerID REST API, an engine for rendering verification forms on your site, and a data collection tool for your verification programs. With it, you have full control over the appearance of the verification forms on your site. This guide assumes you created an account at [MySheerID](https://my.sheerid.com){:target="_blank"}, and would like to use our JavaScript Library to render a verification form. 

### Install script

The Display Method scripts below assume that you have the SheerID JavaScript library installed on the page which launches your verification form. Install the JavaScript library using a script tag, calling the library from a CDN.

Add the following to the `<head>` of your html file.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.css" type="text/css" crossorigin="anonymous" />
<script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/metrics.js" crossorigin="anonymous"></script>
```

Add the SheerID JavaScript library in the `<body>`.
```html
<script src="https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/sheerid.js" crossorigin="anonymous"></script>
```

### Program Id
To use the scripts below you will need to insert your `programId` into the URL. Retrieve your `programId` from your [Program tab]({{ 'getting-started#install-program' | relative_url }}) in [MySheerID](https://my.sheerid.com){:target="_blank"}. The URL format is `https://services.sheerid.com/verify/YOUR_PROGRAM_ID/`

## Display methods
There are two methods to display a verification form. Choose which fits the best with the user experience of your website.

### Inline iframe
Choose `loadInlineIframe` to render your form within an iframe. The iframe is created inside an element that you specify through an id. In this example the id=`“my-container”`:

```html
<div id="my-container"></div>
<script>
  sheerId.loadInlineIframe(
    document.getElementById('my-container'),
    'https://services.sheerid.com/verify/YOUR_PROGRAM_ID/',
  );
</script>
```

{% include image.md name="Install Inline Iframe" %}

### Modal
Choose `loadInModal` to render your form inside a modal element. Provide a button or element which when clicked triggers opening the modal containing the verification iframe. In this example a button with the label “Confirm Eligibility” launches the form.

```html
<a onclick="displayVerification()">Confirm Eligibility</a>
<script>
  function displayVerification() {
    sheerId.loadInModal(
      'https://services.sheerid.com/verify/YOUR_PROGRAM_ID/', {
        mobileRedirect: false,
      });
  }
</script>
```

{% include image.md name="Install Modal" %}

#### MODAL CONFIGURATION
The modal script above supports several configuration keys which can be added to customize the modal’s behavior. This table summarizes the options: 

{% include modal-configurations.html %}

This example shows a `loadInModal` script using all the available configuration keys:

```html
<a onclick="displayVerification()">Confirm Eligibility</a>
<script>
  function displayVerification() {
    sheerId.loadInModal(
      'https://services.sheerid.com/verify/YOUR_PROGRAM_ID/', {
    	mobileRedirect: true,
    	mobileThreshold: 320,
    	stopPropagation: true,
    	closeButtonText: 'Close!'
  	});
  }
</script>
```

## Customize using CSS
You can add or overwrite the styling of elements for either of the display methods shown above. Use this list of class names to create CSS selectors.

{% include iframe-css-selectors.html %}

## Troubleshooting the Modal Display

The install snippet will automatically handle the modal height and width. This means the modal will automatically adjust to the consumer’s screen size and the height of the content.

If a customer adds a fixed height (eg by adding `style="height:1400px;"`) it will break the way we calculate the height. **Please do not try to make it fixed height**. [Here is a short video that illustrates this](https://www.youtube.com/watch?v=TCAK70kWoD4).

#### Scrolling problems with the modal? Things to try:

1. As mentioned on this [tutorial]({{ 'tutorials/iframe-scripts#overview' | relative_url }}), `sheerid.css` styles should be included on the `<head>` tag of the page. If they are inside a `<body>` tag, the page scrolling with modal open may break.

2. Same for the `sheerid.js` file, it is being included at the top level of the `<body>` tag, not inside a `<main>` tag inside the body.

3. If you’re still having trouble, work on modifying the iframe wrapper via CSS. [This section]({{ 'tutorials/iframe-scripts#customize-using-css' | relative_url }}) highlights what class name you can use to modify the styles of the iframe. You could try changing styles on the `sid-modal__wrapper` class, to adjust the top position only when the header is affecting the height of the container.

4. There is a known issue for Chrome in Windows 10 where the contents of the iFrame appear blurry when using `border-radius` on the iFrame. To fix this blurriness, add a css rule like this on the install page (the page that loads the iFrame):

```
.sid-modal__iframe {
    border-radius: 0 !important;
}
```
