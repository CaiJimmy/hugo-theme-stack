# Default Image

The default image is the image that will be used on a page if no featured image is set. This is useful for Open Graph and Twitter cards.

## opengraph

The default image for Open Graph and Twitter.

### opengraph.enabled

- Type: `bool`
- Default: `false`

Enable the default image for Open Graph and Twitter.

### opengraph.src

- Type: `string`

Path to the image file.

### opengraph.local

- Type: `bool`
- Default: `false`

If `true`, the image is a local file, and must be placed under `assets` folder. Otherwise, it is a remote URL.

For example, if `src` is set to `img/default.jpg`, the image file must be placed under `assets/img/default.jpg`.