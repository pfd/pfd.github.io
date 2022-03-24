---
layout: default
title: Install Program
nav_order: 7
has_children: false
parent: Getting Started
permalink: /getting-started/install
description: 
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

Now that the program is created, it is ready for installing on your site, so your target audience can find it.

We offer 3 main options:

1. If you want to install the program deep within an existing customer journey and have strong developer resources, you can use our [REST API]({{ '/rest-api' | relative_url }}) or [JavaScript Library]({{ '/jslib-api' | relative_url }}).
1.	If you want to install the program in a simple location on a page you host / own, such as your site’s homepage or a marketing page, you can use the SheerID install snippets.
1.	Otherwise, you can make use of the offer landing page that SheerID has built for you.

This page covers options 2 and 3. You can see these options in MySheerID UI.

{% include image.md name="Install program" %}

## Install Snippets
### Modal (aka Lightbox)
Use this option to tag a button on a page you host; clicking the button will open a modal lightbox with the verification form.

{% include image.md name="Install Modal" %}
### Embedded Iframe
Use this option to add the verification form as an embedded iframe within a page you host. You define the space on the page, and the Lightbox will auto-size.

{% include image.md name="Install Inline Iframe" %}

For details on using either of these simple install snippets, see our [JavaScript Library Iframe Scripts Tutorial]({{ '/tutorials/iframe-scripts#install-script' | relative_url }})

When you are satisfied with how your program looks on your site, proceed to the Test section below.

## Offer Landing Page
This is the simplest method you can use to launch your program to a live audience. SheerID has created simple but powerful page for you, that is hosted by us. All you have to do is to link this page from your website and marketing campaigns, and SheerID handles the rest. 

{% include image.md name="Hosted Landing Page" %}

For more details, see [This page]({{ '/tutorials/hosted-landing-page#page-functionality' | relative_url }})
