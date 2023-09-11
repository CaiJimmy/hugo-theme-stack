# Article

Configuration for the article page.

Fields under `[Params.Article]`.

## math

- Type: `bool`

Enable math support by [KaTeX](https://katex.org/). Can be overridden by front matter field `toc`.

## toc

- Type: `bool`

Enable by default table of contents. Can be overridden by front matter field `toc`.

::: warning
You will still need to add [`toc` widget](widgets.md#toc) to the sidebar to display the table of contents.
::: 


## readingTime

- Type: `bool`
- Default: `true`

Display an estimated reading time for the article.

## license

- Type: `map[string]:(bool|string)`

Configurations related with license.

### license.enabled

- Type: `bool`
- Default: `false`

Display license information under the article.

### license.default

- Type: `string`
- Default: `Licensed under CC BY-NC-SA 4.0`

Default license text displayed under the article. Can be overridden by front matter field `license`.