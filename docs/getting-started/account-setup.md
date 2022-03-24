---
layout: default
title: Account Setup
nav_order: 3
has_children: false
parent: Getting Started
permalink: /getting-started/account-setup
description: Create and configure your MySheerID account.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

## Create Account

Create a new account or access your existing account to get started with your offer programs.

**New Customers**

If you are a new SheerID customer, your first step is to create an account in our self-service portal, MySheerID.com. [Click here](https://my.sheerid.com/authentication/index.html?authevt=register){:target="_blank"} to create a free account using your work email address.

**Existing Customers**

If you are an existing SheerID customer but you are new to MySheerID.com, **do not create a new account**. You will instead need to contact SheerID support to
access your existing account, in order to migrate your programs to MySheerID.

See our Migration guides for the setup instructions for your implementation type:

* [Hosted Form Migration Guide setup]({{ 'migration-guides/hosted#setup' | relative_url }})
* [API Migration Guide setup]({{ 'migration-guides/api#setup' | relative_url }})

## Two-Factor Authentication

We understand the need for additional security, both for our customers and for their
stewardship of their customers' data. In addition to our industry-standard security measures, such as encrypted server communications, robust web session management, and automatic logouts, we also provide Two-factor authorization (2FA) for added login security.

{% include note.html content="The 2FA program setting protects access by your employees to MySheerID and the program configuration, API keys and consumer Personally Identifiable Information (PII) it includes. This setting is not related to how *consumers interact with your form(s)* when being verified by SheerID." %}

### Getting Started

In the *Settings* »» *My Profile* section of MySheerID, you should see that Two-Factor
Authentication is set to *Off*. Contact SheerID Support to enable the flag for your organization.

{% include image.md name="2fa" %}

Once your account administrator enables
the 2FA flag for your company, all users in your organization must configure 2FA to sign in to [MySheerID](https://my.sheerid.com){:target="_blank"}.


### Setup

After 2FA is enabled for your account, you will be prompted to register with our 2FA provider,
Duo, when you first attempt to log in to MySheerID:

{% include image.md name="2FA Setup" %}

1. Click the *Start setup* button to begin the process.
1. Choose from one of the available device options for the 2FA process. **We strongly recommend choosing Mobile**.
1. Continue through the enrollment process by adding your mobile phone number, selecting your operating system, e.g., Android, iOS, and using the Duo mobile app to authenticate your device.
1. After registering and authenticating your device with the Duo mobile app, you are ready to log into MySheerID. Click "Send Me a Push", and approve the login request from your phone.

{% include image.md name="2FA Finish" %}

If you encounter any issues with the Duo enrollment process, please consult the [Duo Enrollment Guide](https://guide.duo.com/enrollment).


## User Roles and Permissions

When a new company account is registered at [MySheerID](https://my.sheerid.com){:target="_blank"}, the person
who creates the account will have the administrator role. This user can then invite new users to the organization
and assign the appropriate roles and permissions to each user depending on job function(s).

If you have a MySheerID account with an administrator role, click the *Settings* icon on the left-hand navigation menu, then the *Users* tab to manage user roles and permissions. If you do not have the admin role, you will not see the *Users* tab
in this view. Contact an internal MySheerID admin if you require admin access.

{% include image.md name="User Profiles" %}

### Roles

A user may have one of two roles: *Administrator* or *User*. To assign or revoke admin privileges
for a user, click the dropdown caret next to the user's role in the *Role* column.
See above image for an example.

**Administrator**

A user with an Admin role may:

* Access the *Users* tab under *Settings*
* Invite new users to join the account
* Upgrade any user to Admin role
* Delete a user
* Change permissions of a User or Admin, including themself

**User**

A user with a *User* role may not perform the administrator functions above, and must be granted
permissions by an Admin. These permissions are based on job function, e.g., API access for developers,
Customer Service roles for Support personnel, etc. Permissions are defined in the next section.


### Permissions

To assign or unassign permissions for a user, click the edit icon next to the user's permissions
in the *Add-On Permissions* column, and select or deselect as appropriate. See above image for an example.

{% include image.md name="User Permissions" %}

Available permissions with respective access levels are as follows:

**Program Admin**
* Has access to the Programs area
* Can edit any program.

**Reporter**
* Has access to the [Reporting]({{ 'reporting' | relative_url }}) area
* Can see and interact with the Performance Dashboard
* Can download the verification report CSV. The report has full verification detail including any custom metadata saved with the verifications.
* Has access to the [Bundles]({{ 'news/2020/10/14/release/' | relative_url }}) section of Settings and can view the report

**Customer PII**
* Downloaded verification reports can include consumers' name, email, DOB, and any other collected PII

**Customer Service**
* Has access to Customer Search tool within the Reporting area. See [Reporting]({{ 'reporting' | relative_url }}).
* Can search all verification history by customer's full name, email, or `verificationID` and in some cases, also have option to do a wildcard search on phone number.

**Customer Service Specialist**
* When added to a user with the Customer Service permission, adds the ability to access and download documents

**Customer Service Manager**
* When added to a user with the Customer Service permission, adds the ability to access and download documents as well as upload documents for auto-approval and purge Personally Identifiable Information (PII).

**API Access**
* Has access to Access Tokens tab within *Settings* area
* API token access to use REST API endpoints. **Requires Reporter role**; if user also has the Customer PII role, then reports will include PII.
