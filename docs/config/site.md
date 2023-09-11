# Site-wide settings

Fields under `[Params]`:

## description

- Type: `string`

Site description. By default, it falls back to `.Params.Sidebar.Subtitle`.

## mainSections

- Type: `[string]`
- Default: `["post"]`

Pages places under this/those sections will be shown on homepage and archive page.

For more information, take a look at Hugo's documentation on [Content Sections](https://gohugo.io/content-management/sections/).

## featuredImageField

- Type: `string`
- Default: `image`

Front Matter **field** used to get the featured image of a page. 

## rssFullContent

- Type: `bool`
- Default: `true`

Output page's full content in RSS.

## favicon

- Type: `string`

Site favicon path. 

For example, if you want to use the favicon in `static/favicon.ico`, set `favicon` to `/favicon.ico`.