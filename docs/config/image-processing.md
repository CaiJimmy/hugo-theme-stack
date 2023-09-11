# Image Processing

This theme uses Hugo's built-in image processing features to resize and optimize local images (included using page bundle feature). This is done automatically when you build your site.

When there are many images in your site, this can slow down the build process. You can choose to disable this feature here.

## cover

- Type: `map[string]bool`

### cover.enabled

- Type: `bool`
- Default: `true`

Enable image processing for cover (featured) images.

## content

- Type: `map[string]bool`

### content.enabled

- Type: `bool`
- Default: `true`

Enable image processing for images in content.