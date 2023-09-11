# Sidebar

Settings related with left-side sidebar.

Fields are under `[Params.Sidebar]` section.

## compact

- Type: `bool`
- Default: `false`

Enable compact version of sidebar.

## emoji

- Type: `string`

Emoji displayed above the avatar.

## subtitle

- Type: `string`

Subtitle displayed below the site title.

## avatar

- Type: `map[string]:(bool|string)`

Configurations related with avatar.

### avatar.enable

- Type: `bool`
- Default: `true`

Enable avatar.

### avatar.src

- Type: `string`
- Default: `img/avatar.png`

Path to avatar image.

### avatar.local

- Type: `bool`
- Default: `true`

If `true`, the avatar image should be placed at `assets/${avatar.src}`, this allows theme to automatically resize the image.
