# Comments

Comment system is a very important part of a blog. It allows readers to express their opinions and thoughts about the post. It also allows the author to interact with the readers.

Stack currently supports the following comment systems:

- [Cactus](https://cactus.chat/)
- [Cusdis](https://cusdis.com/)
- [Disqus](https://disqus.com/)
- [DisqusJS](https://github.com/SukkaW/DisqusJS)
- [Giscus](https://giscus.app/)
- [Gitalk](https://github.com/gitalk/gitalk)
- [Remark42](https://remark42.com/)
- [Twikoo](https://twikoo.js.org/)
- [utterances](https://utteranc.es/)
- [Vssue](https://vssue.js.org/)
- [Waline](https://waline.js.org/)

Each comment system has its own configuration options placed under `[Params.Comments.COMMENT_SYSTEM]` section. 

For example, utterances's configuration options are placed under `[Params.Comments.utterances]` section.

::: tip
A full list of supported configuration options can be found in [here](https://github.com/CaiJimmy/hugo-theme-stack/blob/master/config.yaml#L38)

For more information about the meaning of each configuration option, please refer to the documentation of the comment system.
:::

::: warning
In case of Disqus, the only configuration option is `disqusShortname`, which is not available at `[Params.Comments.disqus]` section. Instead, it is placed at root section of configuration file.
:::

## enabled

- Type: `bool`
- Default: `false`

Enable / disable comment system.

## provider

- Type: `string`

Comment system provider. Possible values are:

- `cactus`
- `cusdis`
- `disqus`
- `disqusjs`
- `giscus`
- `gitalk`
- `remark42`
- `twikoo`
- `utterances`
- `vssue`
- `waline`