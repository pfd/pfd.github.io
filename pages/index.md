---
layout: landing
title: Home
nav_exclude: true
permalink: /
---

<div class="desktop-only">
{% include image.md name="mainLandingImg" %}
</div>

{% include title-with-text.html name="overMainImage" fixedPosition=true %}

<div class="split-content-container" id="split-content-container">
{% for title in site.data.landingTitles %}
  {% if title.name != 'overMainImage' %}
    {% include title-with-text.html name=title.name %}
  {% endif %}
{% endfor %}

<!-- <div class="desktop-only">
{% include title-with-text.html name="overMainImage" fixedPosition=true %}
</div> -->
