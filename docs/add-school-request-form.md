---
layout: default
title: Add School Request Form
nav_order: 8
has_children: false
permalink: /add-school-request-form
description: Some consumers need extra assistance locating their school in your verification form. The Add School Request form offers them another path to getting verified.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

The Add School Request form maximizes verifications by giving consumers a second chance to find the right school. SheerID student and teacher forms feature an [organization search component]({{ 'tutorials/fetching-organizations' | relative_url }}) used by the verifying individual to identify where they study or teach. The form uses typeahead search to display matching schools as the consumer enters the name of their institution. In most cases the consumer’s school is quickly located and they can select it and continue the verification process. In the rare case when their school name returns fewer than 5 results and none of them match their institution they will see an option to open the Add School request form. To do so, they simply click “Don’t see your school. Request to have it added” which opens the Add School Request form in a new browser tab.

{% include image.md name="Add School Request Link" %}


## Program specific form

Each SheerID program is backed by a specific configuration of geographies and organizations. The Add School Request form understands this configuration, which allows for a user experience that is tailored to the audience for a specific program. Firstly, only the geographies allowed are presented. Secondly, when a user searches for their school and that school is found, they get specific feedback about whether students or teachers at that school are eligible for verification.

{% include image.md name="Add School Request Blank Form" %}


## Search by website

The Add School Request form begins with searching by website. This maximizes opportunities to find matching schools and allow users to return to the verification form to complete the verification process. It also eliminates confusion around how SheerID might refer to an institution versus how a student or teacher may refer to it.

{% include image.md name="Add School Request Website Search" %}


## Eligible School Results

Because the form is program specific, all search results can be divided by eligible and ineligible schools based on the program’s configuration. Matching schools are presented and if eligible, the user can quickly copy the name and paste it in the verification form, which is still open in the other browser tab. If the search term is too broad, such as “Oregon”, the user will see some results but be asked to refine their search. If no matching schools are found by website the user can enter their school name.

{% include image.md name="Add School Request Eligible Results" %}


## Ineligible School Results

In some cases students and teachers from ineligible schools may try to verify, not see their school in the verification form and use the Add School Request form. These requests are often for schools already known by SheerID which are not eligible for the program. The Add School Request form searches all schools in the chosen geography and will list matching schools and mark them as ineligible. This signals to the user that they are not a candidate for verification. 

{% include image.md name="Add School Request Ineligible Results" %}


## Final Submission

At times a student or teacher from a school not known by SheerID will use the form and needs to submit their request. To assure they have provided clear, accurate information regarding the school website and name they must search for both and refine their name search to return few or no results. If they have not seen their school in either the eligible or ineligible lists, their contact information is collected and the form submitted to SheerID for research. SheerID also displays a confirmation page after their submission. 

{% include image.md name="Add School Request Final Submission" %}
{% include image.md name="Add School Request Submit Confirmation" %}
