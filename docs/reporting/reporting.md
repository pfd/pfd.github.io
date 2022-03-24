---
layout: default
title: Reporting
nav_order: 5
has_children: true
permalink: /reporting
description: Measure the success of your Identity Marketing Programs quickly and easily— all from the MySheerID platform.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}


## Overview

The SheerID reporting dashboard is your one-stop shop for your verification tracking data.

To access the dashboard, click the **Reporting** icon in the left-hand navigation menu. Your initial view is
an aggregate picture for all of your programs, including verification and trend visualizations.

{% include image.md name="Reporting Dashboard" %}

## Verifications

When you first access the dashboard, you will see your total verifications across all programs by result, method, and segment. To view data for a specific offer program, choose the program name from the
dropdown menu in the top left-hand corner of the dashboard.

You can also filter the data based on segment, verification results, country, or date. See [Filters](#filters) for details.

{% include note.html content="All accounts have access to a demo performance dashboard that is populated with simulated data, giving you a feel for the types of data and reports that are available within the performance dashboard.

To access the demo dashboard, choose *Demo Dashboard* from the dropdown menu in the upper left corner
of the Reporting section." %}

## Filters

From the main dashboard view, there are several filters that you can apply to drill down into specific programs.

### Program Filter

Click the dropdown caret next to *Dashboard* to view data for a specific offer program.
Data for the selected program will be shown, if available.

{% include image.md name="Program Filter" %}

### Advanced Filters

Slice and dice your key metrics by important program attributes including:

* Segment
* Program
* Country
* Result
* Campaign

Click *Advanced Filters* to reveal additional filtering options.

{% include note.html content="Application of the Campaign filters allows you to slice your verification data based on the values sent for the `utm_campaign` metadata key. N/A is used for verifications without a value for this metadata key. See [Campaign Tracking](/manage-programs/program-settings#campaign-tracking) to learn more about automatically tracking UTM parameters for your program." %}

{% include image.md name="Advanced Filters" %}

### Date Filter

Click the date picker in the upper right-hand corner to choose a beginning and end date for your report.

{% include image.md name="Date Filter" %}

## Campaign Tracking

To help you see impact of your marketing efforts on verification volumes we provide the following visualizations:

Campaigns
: Use this chart to see the ratio and amount of verifications which originated from each of your campaigns, as measured by usage of different values for the `utm_campaign` metadata key. N/A indicates no value for this key is included with the verification.

{% include image.md name="Your Campaigns" %}

Daily verifications by Campaign
: Use this chart to see how your campaigns performed over time.

{% include image.md name="Daily Verifications by Campaign" %}

## Trends Analysis

To analyze how your program performs over time, and how changes impact results by comparing verifications,
we provide the following data visualizations in the dashboard:

Daily Verifications
: See daily verification volume over time.

{% include image.md name="Daily Verifications" %}

Year-over-year
: See year-over-year verification volume.

{% include image.md name="Year Over Year" %}

Month-over-month
: See month-over-month verification volume.

{% include image.md name="Month Over Month" %}

To download these data in CSV format for import into your own business intelligence tools, click the **Report Center** button in the upper right-hand corner of the dashboard (see below).

## Report Center

The **Report Center**, accessed through the button in the upper right-hand corner of the reporting dashboard, provides several options for creating, viewing, and downloading verification reports.

Having accessed the Report Center, you will find two tabs, **Reports** and **Scheduled**. 

In the **Reports** tab all reports created in your account over the preceding 30 days are listed. Past reports will show date and completion status, and can be selected for download or deletion.

{% include image.md name="Past Reports List" %}

The **Scheduled** tab contains a list of all scheduled series of reports and their next run dates. See [Schedule Reports]({{ '#scheduled-reports' | relative_url }}) below.

To generate new verification reports, click the *Create New* button in the upper right-hand corner of the Report Center page. 

There are two options for creating new reports:

### On Demand Reports

Creating an **On Demand** report generates a one-time report for immediate availability. For this option, click *Create New* from the Reports tab. You will then select a date range for the report, and choose whether to include or exclude be Personally Identifiable Information (PII), which is excluded by default.

{% include note.html content="If you do not have Customer PII permission you cannot request or download reports that include PII. If you *do* have this permission, you will be prompted to provide a reason for creating a report (either On Demand or Scheduled) that includes PII. See [reporter permissions](/getting-started/account-setup#permissions) to learn more." %}

You can also choose to be notified via email upon completion of the report. The email will include a link to your report, but you must log in to MySheerID to access it.

{% include image.md name="Create On-Demand Report" %}

Upon making your selections and clicking *Generate*, your new report will be added to the Reports list, showing an "in progress" status while generating and downloading automatically when complete. If you have navigated away from Report Center, your new report will be available when you return through the download icon.

### Scheduled Reports

Scheduled reporting is a new reporting alternative that allows you to create a series of reports to be generated automatically at recurring intervals of your choosing.

To create a Schedule of reports, click on the *Scheduled* tab in Report Center and then click on the *Create New* button. Select the date range you want these reports to capture, as well as when and how frequently you want to receive them.

For example, the image below shows creation of a weekly report that will include data for the previous seven days, and which will be generated every Monday.

{% include image.md name="Schedule Weekly Report" %}

Options for inclusion of PII and email notification are the same as for On Demand reports.

Upon making your selections and clicking the *Generate* button, your new schedule of reports will be listed in the Report Center under the **Scheduled** tab. Here you can view the details of all active report schedules and see when their next reports will be run. Once a scheduled report is run, it will be added to the **Reports** list with all other past reports.

{% include image.md name="Scheduled Reports List" %}

You can also discontinue a report schedule by deleting it from the Scheduled list. To delete a report, hover over the report in the listing, and click the bin icon.

{% include image.md name="Delete Scheduled Reports" %}

## Search

To search for verification details on a specific customer, click the **Search** icon in the left-hand navigation menu.

See [Search]({{ site.baseurl }}{% link docs/reporting/search.md %}) for more information.

## Benchmark Reporting
To view your account’s performance compared to others, click **More Data** at the top of the page and select one of the Benchmark reports.

See [Benchmark Reporting]({{ site.baseurl }}{% link docs/reporting/benchmark-reporting.md %}) for more information.

## Legacy Dashboard

To view legacy dashboards such as the [Performance Dashboard]({{ 'reporting/more-data#performance-dashboard' | relative_url }})
and [ROI Impact Dashboard]({{ 'reporting/more-data#roi-impact-dashboard' | relative_url }}), click **More Data**
at the top of the page.