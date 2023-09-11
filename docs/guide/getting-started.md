# Getting Started

::: tip
Try this quickstart template to get started with Stack and Hugo in a few minutes: 
https://github.com/CaiJimmy/hugo-theme-stack-starter
:::

## Requirements
Before you start, make sure you have installed Hugo **extended version**. For more information, see [Hugo's documentation](https://gohugo.io/getting-started/installing/).

This theme uses SCSS and TypeScript, that's why Hugo extended version is required. If you are using a non-extended Hugo installation, you will get the following error:

```
Error: Error building site: TOCSS: failed to transform "scss/style.scss" (text/x-scss): this feature is not available in your current Hugo version
```

Once you have installed Hugo, you can check the version by running the following command:

```bash
hugo version
```

Which should output something like this (the version number may be different), notice the `extended` keyword:

```
hugo v0.102.3-b76146b129d7caa52417f8e914fc5b9271bf56fc+extended windows/amd64 BuildDate=2022-09-01T10:16:19Z VendorInfo=gohugoio
```

The minimum required Hugo version can be seen in the [theme's `theme.toml` file](https://github.com/CaiJimmy/hugo-theme-stack/blob/master/theme.toml#L23)

## Installation

### Git
On the master branch, you can find the theme's latest source code. To use the latest version, you can clone the repository to `themes/hugo-theme-stack` by running the following command in the root directory of your Hugo site:

```bash
git clone https://github.com/CaiJimmy/hugo-theme-stack/ themes/hugo-theme-stack
```

If you are already using Git for your site, you can add the theme as a submodule by running the following command in the root directory of your Hugo site:

```bash
git submodule add https://github.com/CaiJimmy/hugo-theme-stack/ themes/hugo-theme-stack
```

### Hugo module

::: warning
Using this method, there won't be any file under `themes` directory. In order to modify the theme, you will have to copy the file you want to modify to the same directory under `layouts` directory.

For example, in order to modify the `themes/hugo-theme-stack/layouts/partials/header.html` file, you will have to copy it to `layouts/partials/header.html` and modify it there (copy the code from theme's repository). The same applies to `assets` and `static` directories.
:::

This theme is also available as a [Hugo module](https://gohugo.io/hugo-modules/). Run the following command in the root directory of your Hugo site:

First turn your site into a Hugo module (in case you haven't done it yet):

```sh
hugo mod init github.com/me/my-new-blog
```

Then import the theme as a dependency adding the following line to the `module` section of your site's configuration file.

```toml
# config.toml
[[module.imports]]
path = "github.com/CaiJimmy/hugo-theme-stack/v3"
```

```yaml
# config.yaml
module:
  imports:
    - path: github.com/CaiJimmy/hugo-theme-stack/v3
```

This makes Hugo use the latest stable `v3` version of the theme (available in release page, which probably won't coincide with the latest commit in the `master` branch).

To update the theme to the latest version, run the following command:

```sh
hugo mod get -u github.com/CaiJimmy/hugo-theme-stack/v3
hugo mod tidy
```

::: info
In the future, if a new major version of the theme is released, you will need to manually update the version number in the `path` field.
:::

### Download manually (not recommended)

You can also download the theme from the [release page](https://github.com/CaiJimmy/hugo-theme-stack/releases) and extract it to `themes/hugo-theme-stack` directory. 