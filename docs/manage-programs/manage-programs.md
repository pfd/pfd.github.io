---
layout: default
title: Manage Programs
nav_order: 4
has_children: true
permalink: /manage-programs
description: Manage your SheerID programs from the Programs menu.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## My Programs

Click the *Programs* icon in the left navigation menu to view a list of your offer
programs.

The list view displays all of your active programs that are either in *Test* or *Live* mode, in reverse chronological order by creation date, with the following information for each program:

* Offer Name
* Offer Type
* Codes Remaining (Single-use codes only)
* Offer Status: either *Test* or *Live*

Click on a program to edit the program or [Program Settings]({{ site.baseurl }}{% link docs/manage-programs/program-settings.md %}).

## Archive Program

Archiving a program disables the program for use by consumers. You may wish to archive
a program rather than deleting it to:

* Keep your list of programs clean
* Avoid accidental editing of a program that is no longer in use

Data for archived programs is excluded from reporting by default. You can override the default
setting to include archived program data by choosing *All Programs, including Archived* in your reporting [Program Filter]({{ 'reporting#program-filter' | relative_url }}).

To archive a program:

1. Click the *Programs* icon in the left-hand menu.
1. From the *My Programs* page, click the kebab (3 dots) menu icon for your program. The menu will appear to the right of the Status column when you hover over it.
1. Click *Archive Program*.
1. Confirm your choice by clicking the *Archive* button:

{% include image.md name="Archive Program" %}

## Clone Program

To clone a program:

1. Click the *Programs* icon in the left-hand menu.
1. From the *My Programs* page, click the kebab (3 dots) menu icon for your program. The menu will appear to the right of the Status column when you hover over it.
1. Click *Clone Program*.
1. Select a segment for the new program from the dropdown menu.
1. Confirm your choice by clicking the *Clone* button.

{% include image.md name="Clone Program" %}

