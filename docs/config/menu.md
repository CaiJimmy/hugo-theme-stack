# Custom Menu

There are two menus in the theme: the main menu (`menu.main`) and the social menu (`menu.social`, icon only). They can be configured in a similar way.

## First Method (Recommended)
If the menu item you'd like to add is a page, add `menu` field to its Front Matter:

```yaml
menu: 
    main:
        name: title (optional)
        weight: -90
        params:
            icon: icon-name
```

## Second Method

::: warning
This method is not recommended, because the theme can not detect if the current page is in the menu, and the menu item will not be highlighted.
:::

If the menu item you'd like to add is not a page, you can add it to the menu section in the config file:

Example in TOML:

```toml
[menu]
[[menu.main]]
    name = "Home"
    url = "/"
    weight = 10
    identifier = "home"
    [menu.main.params]
        icon = "home"
        newTab = true
```

Or in YAML: 

```yaml
menu:
    main:
        - identifier: home
          name: Home
          url: /
          weight: -100
          params:
            icon: home
            newTab: true
```

* `identifier`: Item ID
* `name`: Display text
* `url`: Link
* `weight`: Priority of the item, lower value means higher priority.
* `params`: 
  * `icon`: Specify which SVG icon should be used
  * `newTab`: Open this link in new tab

If `params.icon` is set to `archive`, theme will look for `archive.svg` under `assets/icons` folder.

## Add custom icon

This theme comes with some SVG icons from [Tabler Icons](https://tablericons.com). You can find them under theme folder `assets/icons`.

To include more icons, just download them from website above, and place them under `assets/icons` folder of your Hugo site.