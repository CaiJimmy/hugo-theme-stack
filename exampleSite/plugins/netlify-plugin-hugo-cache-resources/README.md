> Original Repo: https://github.com/cdeleeuwe/netlify-plugin-hugo-cache-resources
> 
# Netlify Build Plugin: Persist Hugo resources Between Builds

Persist [Hugo](https://gohugo.io/) resources folder between Netlify builds for huge build speed improvements! ⚡️

This plugin caches the `resources` folder after build. If you are processing many images, this would improve build duration significantly.

Note: Restoring cache only comes from the production branch. So once cache is saved on the production branch, the next preview build would use the cache. For example, when pushing to the same preview build, the latest preview build will not get the cache from the previous preview build, but will get it from master.

## Usage

To install, add the following lines to your `netlify.toml` file:

```toml
[build]
  publish = "public"

[[plugins]]
  package = "netlify-plugin-hugo-cache-resources"

	[plugins.inputs]
	# If it should show more verbose logs (optional, default = true)
	debug = true
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.