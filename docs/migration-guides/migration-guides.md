---
layout: default
title: Migration Guides
nav_order: 7
has_children: true
permalink: /migration-guides
description: Migrate your SheerID verification form to our 2.0 platform.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Background

In 2019 we released SheerID 2.0 - the latest version of the SheerID platform and API which brings enhanced speed, reliability, security, and ease of implementation. These changes leverage new technologies that deliver a better experience to your end users.

We also simplified our APIs, making development easier for our engineers and customers.

And most importantly, we launched our self-service portal, [MySheerID.com](https://my.sheerid.com){:target="_blank"}, allowing you to create, configure, and customize your verification programs in one easy-to-use interface.

## Choose Your Migration Path

In this section, we provide migration guides for our two most common implementation types:

1. **SheerID-hosted**: SheerID hosts your verification forms on our domains, i.e., `verify.sheerid.com` etc. We manage the verification experience from end to end: from online forms to backend verification.
1. **REST API**: You host verification forms on your domain(s), communicating required user and affiliation data to SheerID via our v0.5 REST API.

Each migration path has different development considerations, but the intended outcome is the same. Once completed, your offer programs will be using our most current technology and you will be ready to take advantage of our latest products and features.

To get started, choose the guide that best fits your SheerID setup:

* [Hosted Form Migration]({{ 'migration-guides/hosted' | relative_url }})
* [v0.5 to v2.0 API Migration]({{ 'migration-guides/api' | relative_url }})


## Product Deprecation Schedule

Our **current** Platform/API version is v2.0, and v0.5 is **secondary**.

Current
: The current, recommended Platform or API version. The Current version will get all new features and will continue to change but will not introduce breaking changes.

Secondary
: The secondary Platform/API version. The Secondary version will get critical bug fixes only and will not introduce breaking changes. If you are on the secondary version, you should consider migrating to the Current version as soon as possible. See the schedule below to find out if an end-of-life date has been announced for the Secondary version.


| SheerID Platform/API Version | Status | Documentation | Release Date | End-of-Life Date |
|  --- |  --- |  --- |  --- |
| v2.0 | **Current** | [v2.0]({{ 'rest-api' | relative_url }}) | 2019 | Current recommended version |
| v0.5 | Secondary | [v0.5](https://docs-v05.sheerid.com/docs/) | 2014 | November 2022 |
| Legacy Hosted | Secondary | [SheerID Hosted Verification Applications](https://docs-v05.sheerid.com/hosted-app/) | 2014 | November 2022 |