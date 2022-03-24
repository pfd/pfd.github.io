---
layout: default
title: More Data
nav_order: 9
has_children: false
parent: Reporting
permalink: /reporting/more-data
description: Additional dashboards in MySheerID.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Overview

This page provides an overview of some of the additional reporting features in [MySheerID](https://my.sheerid.com){:target="_blank"}. Access these features by clicking the **More Data** header at the top of the [Reporting Dashboard]({{ 'reporting' | relative_url }}).


## Performance Dashboard

The Performance Dashboard summarizes the last 30 days of
verifications for all your programs. Use this report to quickly view your total volume for this
period broken down by segments, results, and verification methods. Graphs of month-over-month totals
and daily verification volumes are available to help you identify recent trends. If you are looking
for data from a particular date range or a longer or shorter timeframe, use the filter control under the report title to customize the report.

{% include image.md name="Performance Dashboard" %}

## Segment Drill Down

To view a report specific to a particular segment, click on that segment under "Your Programs" and
select "Drill Down". The dashboard will refresh with data only related to that segment, including
additional information on age range, popular organizations and requests by state. Use the filter control to change the timeframe and switch between segments.

{% include image.md name="Student Drilldown" %}
## ROI Impact Dashboard

The ROI Impact Dashboard will appear in your Reporting view with demo data until you begin
to send conversion tracking data to SheerID. Once you begin tracking user conversion data,
the dashboard will provide metrics on:

* Total Program Revenue ($)
* Conversion Rate (%)
* Average Transaction Size ($)
* Likely Fraud Prevented (%)

To get started sending data to the ROI Impact Dashboard, see our [Conversion Tracking Tutorial]({{ site.baseurl }}{% link docs/tutorials/conversion-tracking.md %}).

{% include image.md name="ROI Impact Dashboard" %}

## Bundle Reporting

Bundle reports track your verification volume against your purchased bundles. This feature can be accessed through **More Data** or through the "Bundles" tab in the Settings area of MySheerID. Bundle reports can be viewed by the person who created your account as well as any users with the [Reporter permission]({{ 'getting-started/account-setup#permissions' | relative_url }}).

Reports show any active bundles on your account and the amount of verifications remaining, along with the relevant dates for the bundle. This helps you monitor your usage so you can purchase your next bundle should you start to run low. If you have already purchased another bundle it will appear in the report, labeled “Next Bundle”.

Remaining verifications are counted using the same mechanism as the [reporting Dashboard]({{ 'reporting#overview' | relative_url }}) in MySheerID and will be updated 2-3 times per day and reflect all verifications older than 4 hours.

{% include note.html content="This initial version of Bundle tracking is available to all clients who have purchased bundles and use standard billing rules." %}
## Downloading Data

The Performance Dashboard supports downloads of details on each segment of any graph. To view details
about verifications by program, verification method, day, etc., click on the graph segment, which
will either open the verification details or ask which verifications you want to drill into.
Once viewing the details click "Download Results" to export to one of 6 file types like Excel, CSV and JSON.

You can also download the entire dashboard as a PDF or set of CSVs by selecting the appropriate option from the gear icon above the "Run" button.

{% include image.md name="Download Controls" %}




