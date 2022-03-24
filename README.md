# SheerID Public Dev Center

This is the repo for the publicly-accessible SheerID [Developer Center](http://developer.sheerid.com/).

## Requirements
  - Ruby and/or rbenv

## Building Locally

1. Clone the Docs-V2 repo
    ```
    $ git clone git@github.com:sheerid/docs-v2.git
    ```
1. cd into the repo
    ```
    cd docs-v2
    ```
1. Start jekyll (using Docker)

        export JEKYLL_VERSION=3.8
        docker run --name pfd \
            -p 4000:4000 \
            --volume="$PWD:/srv/jekyll" \
            -it jekyll/jekyll:$JEKYLL_VERSION \
            jekyll serve

Or, if you don't want to use Docker, run through the [Jekyll Quickstart](https://jekyllrb.com/docs/) so that your local environment is able to build from this directory.

**Note**: You will probably need to set up [rbenv](https://github.com/rbenv/rbenv) if your local ruby environment is fussy.
1. Build the local server.
    ```
    $ bundle exec jekyll serve
    ```
1. browse to http://localhost:4000
1. If you have trouble, ping in #happy_devs Slack channel.

## Site structure

The site is a fairly basic Jekyll instance that is based on the [Just the Docs theme](https://github.com/pmarsceill/just-the-docs).

The homepage is custom HTML/CSS.

### API Reference

The API Reference uses [Redoc](https://github.com/Redocly/redoc) to generate the API docs based on the publicly-available spec at https://services.sheerid.com/rest/v2/swagger.yaml.

`pages/rest-api.html` builds the reference based on the layout at `_layouts/api.html`. There are a lot of options available for the redoc library. It's currently using an out of the box setup with a few options. Custom theming is possible. A good example to follow is the [Docker API docs](https://docs.docker.com/engine/api/v1.25/#) for theming.

### Regular Pages

For normal docs updates, the markdown files are located in the `docs` folder. This is the standard Jekyll stuff, but keep in mind
that the theme is based off of [Just the Docs theme](https://github.com/pmarsceill/just-the-docs) so there may be some issues with markdown flavoring, etc. that diverge from other Jekyll sites.

### Required fields table

One custom feature that is popular with Sales is the [Required Fields Reference](http://developer.sheerid.com/reference#required-fields). In the old (0.5) docs, this was generated automatically.

The current fields tables are generated from a template, but they are not automatic.

Jekyll builds the tables using the data located in `_data/methods.yaml` and the HTML and (terrible inline) CSS in `_includes/required-fields.html`.

To update the rendered tables, update the properties in `_data/methods.yaml`. It's self-explanatory how the yaml objects are organized. If you want to change the properties of the tables, update the liquid/html in the include.


### Reporting Glossary

The [Reporting Glossary](http://developer.sheerid.com/reporting/glossary) is also rendered by Jekyll, using terms defined in the `_glossary` index, `_include/glossary.html` and the `glossary` layout.

Individual terms are each their own file in the `_glossary` directory, e.g.:

```
---
term: Organization State
---

The US state in which the requested organization is located.
```

Just define the `term` in the front matter and provide the definition below.

### Algolia (Search)

We use the free version of [Algolia](https://www.algolia.com/) to power the site search. Algolia settings are in the `_config.yaml` and when you run the publish script, the Algolia plugin updates the records automatically and reports how many records
are updated in the output.

Kevin Scullin has the login/pass for the Algolia dashboard.

## Publishing

The live site is hosted on GitHub Pages, and there is a script that publishes the site automatically from the master branch. Prior to publishing live, you may
want to generate a development preview to facilitate internal reviews. [Netlify](https://www.netlify.com/) is one easy way to host a development site for review.

### Publishing a Development/Staging Branch

If you are working on a feature branch, or need to circulate a preview version of the site for e.g., the Product or Marketing teams, you can build the site folder and deploy
to Netlify. Set up a free Netlify account and connect the docs-v2 repo to a new site.

1. Build the `_site` folder using the dev environment overrides:
    ```
    $ JEKYLL_ENV=development bundle exec jekyll b --config "_config.yml,_config_dev.yml"
    ```
1. Drag and drop the `_site` folder to a Netlify workspace. See the Drag & Drop video tutorial on the [Netlify docs](https://www.netlify.com/docs/manual-deploys/).

You will notice that every page using the default layout has an admonition: **"This is a development preview."** at the top of the page when using the dev config.


### Production

The production site is hosted by Github Pages, using the `gh-pages` branch as the source for the static content. The publish script below builds the site in a `_site` folder and pushes to the remote `gh-pages` branch for publication. 

To deploy the site, make sure that you are on master with a clean working directory and up to date with origin. 

Delete any local versions of the `gh-pages` branch:

```
$ git branch -D gh-pages
```
Run the publish script:

```
$ ./publish_script
```

### Publishing the API Reference

Note that publish script does not currently automatically update the API reference. There is code that grabs the latest Swagger spec and puts it in `_data/swagger.yaml` — but this was originally there to generate the docs using [Swagger UI](https://swagger.io/tools/swagger-ui/) which we replaced with ReDoc.

To update the API reference to reflect any recent public changes, use `.swagger_script_prod`. This script does the following:

1. Fetches the public spec and places it at `swagger-prod.yaml`
1. Takes any local updates from `swagger-merge.yaml` and merges them along with the spec into `swagger.yaml` which is the source for generating the API reference via ReDoc.
1. Cleans up

Note that the only reason to have any swagger object in `swagger-merge.yaml` is in case you need to update public API content before SheerID devs had had a chance to add the fields to the public swagger file. Once it's updated there, you can remove any of the merge content.

### Publishing the JS Lib Reference

The JS lib docs located at http://developer.sheerid.com/jslib-api are out of date. We need to update the source code to generate the reference per https://sheerid.atlassian.net/browse/HD-350.

Once that is complete, uncomment

```
# Fetch the latest js-lib spec archive, unarchive and transform it, and commit it
# TODO: Once HD-XXX is done, uncomment the following commands and populate ARCHIVE_URL
#./_build-tools/build-jslib-api-docs.sh "ARCHIVE_URL"
#git add -A
#git commit -m "Updating jslib spec"
```

in the publish script in order to get the docs to build.

## Site features

### Admonitions

There are 4 admonitions available: note, success, warning, and danger, which are defined in the `_includes` directory. Example usage:

{% include note.html content="This is my sample note." %}

{% include success.html content="yay!" %}

{% include warning.html content="There may or may not be dragons in thar." %}

{% include danger.html content="This could be bad." %}

### Internal Links

**Link to page**:

[steps]({{ site.baseurl }}{% link docs/concepts.md %})

**Link to anchor** (use relative url):

[flow]({{ 'concepts#flows' | relative_url }})
[step]({{ 'concepts#steps' | relative_url }})

**Link to API Reference**

[Verification Details]({{ 'rest-api#operation/getVerificationDetails' | relative_url }}) (`/verification/{verificationId}/details`){:target="_blank"}

### Images

To include an image in a page

1. Add the image file to the `assets/images/` directory.
1. Describe the image as a yaml object in the `images.yaml` file located at `_data/images.yaml`, providing
a name, path, and description. "click to preview" is the default description. Clicking the image generates
a lightbox preview. Example image item:
    ```
    - name: 'Standard flow'
    path: '/assets/images/student_standard_flow.jpg'
    description: 'click to preview'
    ```
1. Call the `image.md` include and provide the image name to render the image in the page with lightbox preview:

    `{% include image.md name="US Student Flow" %}`

### Style Guide

**Headers**

* Use title case as part of our brand style. Caps for most words used in titles and headers (except and, the, or, and prepositions)

* The page title will render from the `title` key in the frontmatter, and should be the only H1 on the page. Use H2s and below in the body of a page, always use:
    
    1. As descriptive a title as possible and
    1. Some paragraph text below the header.

    Descriptive headers and "flavor" text will improve search results.

**Linking to MySheerID**

When referencing my.sheerid.com, use the following format, which will render a link
to the self-service application in a new window:

`[MySheerID](https://my.sheerid.com){:target="_blank"}`

**Narrative Voice**

* Use first person when referring to SheerID's capabilities, e.g., "We provide you with the best APIs."
* Use second person when instructing a user, e.g., "In this step, you will accomplish X."

**JavaScript Resources**

When referencing the JavaScript library or SheerID stylesheets in code samples, use
`/jslib@latest/` in the markdown. `replace-jslib-version-snippet.js` will automatically
insert the latest version of the resource and an integrity hash in the rendered HTML.
