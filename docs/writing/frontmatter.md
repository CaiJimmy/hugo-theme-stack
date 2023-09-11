# Frontmatter Configs

[[toc]]

## description

* Type: `string`
* Available in: single pages and list pages

Description of the page.

## image

* Type: `string`
* Available in: single pages and list pages

Featured image of the page.

## comments

* Type: `bool`
* Available in: single pages

Show / hide comment section of the page.

## license

* Type: `string|bool`
* Available in: single pages
* Default: `.Site.Params.Article.License.Default`

License of the page. If it's set to `false`, the license section will be hidden.

## math

* Type: `bool`
* Available in: single pages

Enable / disable KaTeX rendering.

## toc

* Type: `bool`
* Available in: single pages
* Default: `.Site.Params.Article.toc`

Show / hide table of contents of the page.

::: info
TOC will be shown only if the page has at least one heading.
::: 

## style

* Type: `map[string]string`
* Available in: list pages

Additional CSS styles for taxonomy term badge that appears in article page.

Currently only `background` (background of the badge) and `color` (text color) are supported.

## keywords

* Type: `[]string`

Keywords of the page. Useful for SEO.

## readingTime

* Type: `bool`
* Default: `.Site.Params.Article.ReadingTime`

Show / hide reading time of the page.
