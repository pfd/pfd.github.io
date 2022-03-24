---
layout: default
title: Program Settings
nav_order: 3
has_children: false
parent: Manage Programs
permalink: /manage-programs/program-settings
description: Configure advanced program settings such as allowed domains, targeted subsegments, and more.
toc: true
---

{% include mainTitleForDocs.html title=page.title description=page.description %}

Navigate to the *Settings* tab of your Program page to configure the following settings.

## Allowed Domains

Specify one or more domains that are allowed when the SheerID system processes a verification attempt or conversion attempt.

{% include image.md name="Allowed Domains" %}

On the Allowed Domains card, click the dropdown caret to reveal a form field
for your allowed domains.

Enter a comma-separated list of domain names, (e.g., `my-site.com,support.my-site.com`) and
click enter.

That's it! Now SheerID will only process verification or conversion attempts that
emanate from the domains that you have specified for your program.
## Emails

Modify your email templates from your Program Settings page. Templates are available for:

* Verification success/approval
* Document review/rejection
* Reminder to complete verification process
* Maximum doc review attempts reached

Click the dropdown caret on the *Emails* card to reveal the default content for verification approved/rejected, maximum attempts and reminder emails, editing for copy as appropriate.

{% include note.html content="We updated our email editor on February 16, 2022. For programs created on or after that date, see *Email Editor* below. Programs created prior to February 16, 2022 did not transfer to the new editor. See [Legacy Email Editor](#legacy-email-editor) for editing older programs." %}

### Email Editor

The default email copy includes a limited number of templates formatted in curly braces, e.g., {Company Name}. These templates will render your program-specific information within the email content.

The following 3 templates are available for use in your emails:

| Variable | Definition |
|---|---|
| {segment}	| The target consumer community for your offer |
| {First Name} |	First Name of the consumer being verified |
| {Company Name} | The company name stored with your SheerID profile |

The styling for the email, including fonts and logo, is inherited from the styling in your program's *Theme* settings.

{% include image.md name="Email Editor" %}

Reward Codes, Buttons, Rejection Reasons and FAQ links are added to the emails as appropriate, per your program settings. Their inclusion and placement cannot be modified; therefore they are not included in the editor.

#### Custom Email Settings

Email editing is disabled in some cases, e.g.,  if the content was modified by our Client Delivery team. In such cases the message "This setting is custom" will be displayed.

{% include image.md name="Custom Setting" %}

Contact [productsupport@sheerid.com](mailto:productsupport@sheerid.com) if further editing of these emails is necessary.

Once you are satisfied with the content of your emails, click *Save*. To test the appearance of the emails, see [Test Program]({{ 'getting-started#test-program' | relative_url }}) and generate
both approved and rejected emails to verify the user experience.
### Legacy Email Editor

{% include important.html content="For programs created prior to February 16, 2022, the interface for the email editor differs
slightly from the interface for new programs. This section refers to the user experience with the legacy editor." %}

The default email copy includes various templates formatted in curly braces, e.g., {Company Name}. Each template will render personalized text or HTML specific to your consumer or program, depending on the variable.
The following table lists the variables available for use in your emails:

| Variable | Definition |
|---|---|
| {segment}	| The target consumer community for your offer |
| {First Name} |	First Name of the consumer being verified |
| {Reward Code} |	The coupon given to the consumer upon successful verification |
| {Redirect Button} |	The button to direct the consumer to your website |
| {Company Name} | The company name stored with your SheerID profile |
| {Reasons} |	Reasons why a document was rejected |
| {Upload Button} |	Opens the document upload step of the verification form |
| {Finish Verifying Button} |	Opens the appropriate step of the consumer's verification form |
| {FAQ Link} | Links to the program's Frequently Asked Questions content |

The styling for the email, including fonts and logo, is inherited from the styling in your program's *Theme* settings.

{% include image.md name="Legacy Email Editor" %}

Once you are satisfied with the content of your emails, click *Save*. To test the appearance of the emails, see [Test Program]({{ 'getting-started#test-program' | relative_url }}) and generate
both approved and rejected emails to verify the user experience.

## SMS Notifier

The SMS Notifier feature adds a phone number collection field to your form and sends an SMS to your user when uploaded documents are approved.

Click the dropdown caret on the *SMS Notifier* card to reveal the text field box and on/off
toggle for the feature.

{% include image.md name="SMS Notifier" %}

If your users prefer SMS to email as a contact method, consider enabling this optional field for your program. If enabled, your form will include a phone number field:

{% include image.md name="SMS Field" %}

Upon approval of the uploaded documents, users who enter a valid phone number will recieve
an SMS with the text you entered into the SMS Notifier setting field.

## Marketing Consent

If you would like to contact end users with marketing messages in the future, activate the
*Marketing Consent* module in your program's Settings page.

{% include image.md name="Marketing Consent" %}

On the Marketing Consent card, click the dropdown caret to reveal the three elements
of the module.

1. Click the toggle switch to *On* to turn on Marketing Consent.
1. Optionally check the "Marketing Consent is required" box to make consent a required field for getting verified.
1. Optionally edit the message that accompanies the Marketing Consent option in your verification form. Note that the default `{Company Name}` template in the text box will pull your company
name from your MySheerID account configuration.
1. Preview your Marketing Consent experience by navigating back to the *Program* tab and clicking the *See Preview* button.

{% include image.md name="Email Opt-In" %}

## Campaign Tracking

To capture all campaign tracking UTM parameters automatically as metadata on your verifications, turn on the setting *Automatically track campaign tags* in the Program Settings page. This setting is enabled by default on programs created after this feature was added in October 2021.

{% include image.md name="Campaign Tracking" %}

When enabled, this setting automatically defines program metadata keys for the [5 UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters){:target="_blank"} used to track performance of digital marketing campaigns. These parameters are:

* `utm_campaign`
* `utm_source`
* `utm_medium`
* `utm_content`
* `utm_term`

**Examples**

To submit values for these keys, pass them as parameters in your verification URL. The first example passes a value of `vets_day` for the `utm_campaign` key. The second example passes two values: `vets_day` for the `utm_campaign` key and `email` for the `utm_source` key.

```
https://services.sheerid.com/verify/5d4a5d1a7b9ca962e0b6a901/?utm_campaign=vets_day
```

```
https://services.sheerid.com/verify/5d4a5d1a7b9ca962e0b6a901/?utm_campaign=vets_day&utm_source=email
```

### Campaign Data in Reporting

Now that campaign tracking keys are defined for your program, they will appear as column headers in your verification reports, alongside other captured fields such as Request ID, Status, and any others you are collecting. Note that verification reports will only include metadata columns for keys currently specified in your settings. If you disable the campaign tracking setting your reports will no longer include any columns for these five UTM parameters.

Filters and charts are also included in our reporting dashboard to provide data on the values sent for the `utm_campaign` key specifically. See the [Reporting]({{ 'reporting' | relative_url }}) section for more detail.

## Metadata Options

If you would like to pass additional key-value pair data with your verification, e.g., `"status": "platinum"` or `"favorite_color": "blue"`, you may add the key(s) in the *Campaign and Metadata Options* card in the Program Settings page.

{% include image.md name="Metadata Options" %}

1. On the *Campaign and Metadata Options* card, click the dropdown caret to display the metadata options control field.
1. Click the toggle switch to *On* to turn on Metadata.
1. Enter the name of the key you would like to report on, followed by either a space or a comma. Upon entering the space or comma, your key will be saved in your program.
1. Repeat the above process if you wish to track multiple key-value pairs in your verification reporting.

{% include note.html content="We recommend using lowercase letters (and optionally underscores) when defining your keys, e.g., `customer_id`. The keys and the corresponding values will be passed to SheerID in the URL of the verification, and are meant to be human-readable when reviewing reporting data. Including special characters in your key may result in avoidable parsing errors." %}

**Metadata Reporting**

Now that your metadata keys are defined for your program, they will appear as column headers in your
verification reports, alongside other captured fields such as *Request ID*, *Status*, and any others you are collecting. Note that verification reports will only include metadata columns for keys currently specified in your settings, e.g., if you had tracked `favorite_color` for a month, and then removed it, the report will no longer include the `favorite_color` column.

**Examples**

To submit values for your defined keys, pass them as parameters in your verification URL. Below
are two examples. The first example passes a value of `bar` for the `foo` key. The second example
passes two values: `two` and `blue` for the `fish_number` and `fish_color` keys, respectively.

```
https://services.sheerid.com/verify/5d4a5d1a7b9ca962e0b6a901/?foo=bar
```

```
https://services.sheerid.com/verify/5d4a5d1a7b9ca962e0b6a901/?fish_number=two&fish_color=blue
```

{% include tip.html content="To test if your metadata is being sent properly, go to your *Program* tab and get the URL from the code snippet that looks like `https://services.sheerid.com/verify/YOUR_PROGRAM_ID/`, append the parameters as in the examples above, and generate a report." %}

<!--- Test API call. add this later?
```http
POST /rest/v2/verification/{verificationId}/metadata HTTP/1.1
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN>

{
    "foo": "bar",
    "baz": "lurhmann",
    "marketConsentValue": "false"
}
```
-->

## Privacy Policy

If you would like to include a link to your company’s privacy policy from the footer of your verification form you may add the URL in the *Edit Privacy Policy Link* card in the Program Settings page. When a privacy policy link is present in your Program Settings that policy will be linked from your verification form for that program.

{% include note.html content="It is not required to link to your company’s Privacy Policy. If this setting is left untouched your form will link to the [SheerID Privacy Policy](https://www.sheerid.com/privacy_notice_services/)" %}

To add the privacy policy link simply click the dropdown caret to reveal a textbox. Paste the full URL of your company’s privacy policy, including http or https. You will be shown an invalid url error if applicable.


{% include image.md name="Privacy in Program Settings" %}

To view your form’s footer with the link enabled visit the Program tab for the program and click “See Preview”. This example shows a fictional “ABC Company” which has included a link to their privacy policy in their Program Settings.

{% include image.md name="Form With Footer" %}

## Webhooks

Use [webhooks](https://en.wikipedia.org/wiki/Webhook) to be notified when a successful verification occurs for your program, in order to continue moving users through your workflow.

You can define an HTTP callback (webhook) when setting up your program. Once set, SheerID will return the user's `verificationId` to the provided URL upon a successful verification. You can use the
ID to retrieve all the details about a verification, including user- and program-related information
such as reward code and email address, etc.

On the Webhooks card, enter the URL that will receive the callback including the `verificationId`.

{% include image.md name="Webhooks" %}

To learn more about using webhooks with SheerID, see our [Creating Webhooks Tutorial]({{ site.baseurl }}{% link docs/tutorials/webhooks.md %}).


## Redirect URL

If you would like to pass additional metadata in the Redirect URL , e.g., `rewardCode=EXAMPLE-CODE` or `verificationID=580aa6900cf2c54b4733de9c`, you may add the key(s) in the *Redirect URL data* card in the Program Settings page. When a RedirectURL is present on a program it designates where the user is taken after they click on a button from the approved message on a verification form or from the email sent after a successful verification. For example, the button “Use code now” in this example is linked to the redirect URL.

{% include image.md name="Metadata In Use Code Now Button" %}

By adding metadata to a redirect URL you can do things like associate a consumer’s accountID with a verificationID from SheerID. Or associate a verification with a particular ad campaign you are tracking using [Metadata Options]({{ '/manage-programs/program-settings#metadata-options' | relative_url }}).

{% include note.html content="Before using this setting, make sure you have a Redirect URL specified in the [Customize Text](/getting-started#customize-text) area of your program. Once the Redirect URL setting is turned on in Program Settings the Redirect URL cannot be edited via the Customize Text area. If you have neglected to add a Redirect URL in the Customize Text area of your program you will need to turn off The Redirect URL card, add the URL in Customize Text and then turn the Redirect URL card back on." %}

{% include image.md name="Metadata In Redirect URL" %}

On the Redirect URL card, click the dropdown caret to reveal the on/off toggle for the redirect URL feature and the text box where you will enter your key(s) and select their value. Some options for the values will be available automatically: rewardCode, verificationID and any metadata you have set in [Metadata Options]({{ '/manage-programs/program-settings#metadata-options' | relative_url}}). To create keys and map them with values follow these instructions:

1. Click the toggle switch to On to turn on adding metadata to the redirect URL
2. Enter the name of the key you want included in the URL and choose what value you want included with it
3. You may repeat step 2 by clicking “Add more” until you reach 10 keys and values. The same value may be associated with different keys if desired
4. Click Save to commit your changes

To test that your redirect URL contains the values you have selected return to the Program tab, click “See Preview” and [test your program]({{ '/getting-started#test-program' | relative_url}}). Type in any first name and complete the form to simulate an instant match approval. Once approved click the button on the approval step. You will be directed to a URL containing the values you have selected.

## Customize Offer Has Ended

SheerID supports the following methods of ending an offer:

1. Capping total rewards given away
2. Setting an offer deadline
3. Manually turning off a program

**Capping total rewards given away.** Such as when supplies are limited and you only want to give away 10,000 free makeup kits to nurse.

This functionality is enabled by default, if you're using a reward pool of single-use coupon codes. When all the codes are gone (because they've been awarded to consumer who successfully verified for your offer), the program is effectively paused. To re-activate, simply upload more reward codes.

Additionally, when the reward pool is getting low, we can insert a special message informing the consumer that the offer is almost gone. You can turn on and edit this message in your program’s advanced settings, and set the reward threshold. When the reward pool gets below the threshold, the special message will be shown.

{% include image.md name="Low Reward Pool" %}

errorID used in the form is `noRemainingRewardCodes`

**Setting an offer deadline.** Such as your offer should only run over Labor Day weekend and you want it to turn off on a specific day and time.

To achieve this, reach out to Product Support and ask them to set an offer deadline of an explicit DATE and TIME. When that date and time is reached, the program is automatically de-activated. To re-activate an expired program, reach out to Product Support.

errorID used in the form is `expiredProgram`

**Manually turning off a program.** For whatever reason.

To achieve this, reach out to Product Support.

errorID used in the form is `inactiveProgram`

### Messaging Your Customers

When an offer has ended, we need to inform consumers who are trying to verify for the offer. If any of the above scenarios are triggered, we will show them the below default message:

{% include image.md name="Offer Ended" %}

In MySheerID, under the program's advanced settings, you can customize the messaging and choose where to send the consumer to next. We recommend linking to a consolation offer. For example, let's say you have an evergreen offer for 20% off for Teachers. For teacher appreciation week, you create a new program with a special 50% off offer and limit it using a reward pool of 10,000 single use codes; if / when those 50% off codes are all given away to verified Teachers, you can point any new traffic to the evergreen 20% off offer.

Note that customizing the messaging in MySheerID updates all three errorIDs. So no matter which flavor of Offer Has Ended that you wish to use, you can easily control this messaging.

To preview the Offer Has Ended state, use mocksteps. For more info, see [https://developer.sheerid.com/js-library#css](https://developer.sheerid.com/js-library#css)
