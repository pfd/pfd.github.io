---
layout: default
title: Hosted Landing Page
nav_order: 88
permalink: /tutorials/hosted-landing-page
parent: Tutorials
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

The offer landing page gives your SheerID program a digital _"home"_. With it, you can grab consumer interest with interesting imagery, describe your offer, and invite them to get verified. It’s an easy yet powerful way to start driving interest in your offer.

## Page functionality
* You can edit all the text on the page, and (soon) upload a logo, change the page styling, and/or swap in your own hero image.
* The page is mobile-responsive and optimized for conversion on all devices
* The page includes open graph tags and functionality to enable easy sharing of your offer via email, SMS, and social networks.
* The page supports metadata provided via query params on the URL. So if you append _"?utm_source=foo"_ then that key-value pair will get saved as metadata with the verification. See also [Metadata Options]({{ 'manage-programs/program-settings#metadata-options' | relative_url }})

## Publishing your offer
* When you are ready to market your offer, simply link to this offer landing page from your social media channels and other campaigns.
* Using the offer landing page is complementary to also publishing your offer in other locations. For example, you could link to the offer landing page in your site footer AND have a button deeper in your checkout flow to prompt your site visitors to get verified.
* Of course, you can also ignore this pre-built page and craft the verification journey in other ways, such as using the [modal]({{ 'tutorials/iframe-scripts#modal' | relative_url }}) or [embedded]({{ 'tutorials/hosted-embedded' | relative_url }}) install scripts.

{% include note.html content="The offer landing page is most commonly used with coupon code reward strategies, in which it is easy for the verification journey to occur independently from other activity on your site. If you are using an account-linking reward strategy, you will likely want to create a custom offer description page that includes step-by-step instructions of what a consumer needs to do."%}

{% include image.md name="Hosted Landing Page Mobile" %}

{% include image.md name="Hosted Landing Page" %}
