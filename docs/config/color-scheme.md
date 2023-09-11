# Color Scheme

Light and dark color schemes are available in this theme. 


## toggle

- Type: `bool`
- Default: `true`

Display the color scheme toggle button.

If it's set to `false`, the color scheme will be determined by the `default` option.

## default

- Type: `string (light|dark|auto)`
- Default: `auto`

The default color scheme, used when the `toggle` option is set to `false` or when the user visits the site for the first time.

When set to `auto`, the color scheme will be determined by the user's system preference (`prefers-color-scheme` media query).