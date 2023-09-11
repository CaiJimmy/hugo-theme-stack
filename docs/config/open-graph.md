# Open Graph

The Open Graph protocol enables any web page to become a rich object in a social graph. 

For more information, see [Open Graph protocol](http://ogp.me/).

Fields are under `[Params.opengraph]` section.

## twitter

- type: `map[string]string`

Available fields:

### site

- type: `string`

The Twitter account name of the site (without `@`).

### card

- type: `string`

[Twitter card type](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards). Available values: `summary`, `summary_large_image`.

