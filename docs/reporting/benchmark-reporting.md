---
layout: default
title: Benchmark Reporting
nav_order: 8
has_children: false
parent: Reporting
permalink: /reporting/benchmark-reporting
description: "Compare your account's performance to a sample of other SheerID clients."
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}


## Overview
The two Benchmark Reports in MySheerID provide you with comparative metrics for your MySheerID programs.

To access the Benchmark Reports dashboard, click the Reporting icon in the left-hand navigation menu and locate them under More Data.

{% include image.md name="Benchmark Reporting More Data" %}

{% include tip.html content="For a quick introduction to these reports, see this [Benchmark Reporting Tour](https://youtu.be/hMVszyye-hc) video." %}

## Consumer Community Benchmark Report
The Consumer Community Benchmark Report compares your account’s performance against a large sample of other SheerID clients which target the same consumer communities, also known as [segments]({{ 'concepts#segments' | relative_url }}). Upon load, the Student segment is chosen by default. If you do not have a student program or want to view data about a different consumer community, click the carat next to Filters to open the filter pane and make another selection. You can also change the months included in the report.

{% include image.md name="Benchmark Reporting Consumer Community Filter" %}

The consumer communities supported are listed in the filter: Military, Student, Teacher/Faculty, Medical and First Responder. Only companies with offers targeting those consumer communities will see this report. You must also have active verifications going back at least one full month. Only verifications from the United States are counted for either the Consumer Community or Industry Benchmark Reports.

Each Consumer Community Benchmark Report includes a sample size range to show the estimated number of comparison points for the charts. We also identify which Consumer Community filter is applied as well as some introductory text about the report.

{% include image.md name="Benchmark Reporting Consumer Community How To" %}

The charts included do not differ between the two Benchmark Reports and are described below, after the introduction to the Industry Benchmark Report.

## Industry Benchmark Report
The Industry Benchmark Report compares your account’s performance against a sample of other SheerID clients in the same industry which target the same consumer communities. Upon load, the Student segment and Apparel industry is chosen by default. Your industry is listed under the “How to use this dashboard” content.

If you are not in the Apparel Industry or want to view data about a different consumer community, click the carat next to Filters to open the filter pane and make another selection. You can also change the months included in the report.

{% include image.md name="Benchmark Reporting Industry Filter" %}

The industries used for benchmarking are defined below:

| Apparel | Companies which produce and sell clothing and fashion accessories |
| D2c Manufacturing | Non-Apparel companies which make goods for sale, through their own channels and other retail outlets |
| Software | Companies which produce and sell computer software products |
| Omnichannel Retail | Companies which sell goods online, in brick & mortar stores, or both |
| Media & Entertainment | Companies which offer print, online or streaming media & entertainment products |
| Travel & Leisure | Companies which provide products and services related to tourism and leisure activities |

Each Industry Benchmark Report includes a sample size range alongside which Industry and Consumer Community filters are applied. Some introductory text about the report also appears.

{% include note.html content="A statistically significant sample must exist to provide Industry Benchmark reporting. If you have not received this report or data is not included for all your consumer communities, this significance was not present for your industry or industry-consumer community combination."%}

## Seasonal Volume Trend graph
The Seasonal Volume Trend graph presents your monthly total verification volume alongside the monthly volume percentage for the benchmark sample. This graph shows you where the high volume peaks are throughout the calendar year and whether your verification volume follows a similar trend. Use this chart to gain awareness of seasonality for a particular consumer community so you can plan accordingly.

{% include image.md name="Benchmark Reporting Seasonal Volume Trend" %}

Aside from the Industry label, this graph is identical between the Consumer Community and Industry Benchmark reports. Because it is a yearly trend graph it does not change if fewer months are applied in the filters.
## Age Distribution chart
The Age Distribution chart shows comparative audience composition by age ranges. Each column represents the percent of verifications done by consumers in that age range, for you and for the sample group.

In the example below the company in question did slightly better than the sample in 25 to 34 year olds, since 32.9% of their verifications were from this age group, versus 30.6% for the sample. Use this chart to identify some opportunities to capture consumers in particular age groups.

{% include image.md name="Benchmark Reporting Age Distribution" %}

This chart is identical between the Consumer Community and Industry Benchmark reports. When using either report, changing the month filter will recalculate these values.

## Geographic Distribution chart
The Geographic Distribution chart shows comparative audience composition by state. Each state is colored on a green (you did more than average) to red (you did fewer than average)  scale. To see a metric for your variance from the average for the sample, simply hover over a particular state. The number displayed represents the difference in the distribution of your verifications vs the sample’s average distribution.

In the image below the -1.55 for Texas means that on average 1.55% less of your total traffic comes from Texas then those companies in the sample set. For example, if 2% of your traffic comes from Texas and the sample averages 3.55% of their traffic from Texas, you will see that -1.55% metric. Use this chart to identify some opportunities to capture more consumers in particular states or regions.

{% include image.md name="Benchmark Reporting Geographic Distribution" %}

This chart is identical between the Consumer Community and Industry Benchmark reports. When using either report, changing the month filter will recalculate these values.

## Top Orgs Tables
The Top Organization tables lists the top 25 organizations for your account alongside the top 25 organizations for the sample accounts. Use this chart to identify some organizations not in your list that are with the sample.

{% include image.md name="Benchmark Reporting Top Orgs" %}


These tables are identical between the Consumer Community and Industry Benchmark reports. When using either report, changing the month filter will recalculate these lists.
