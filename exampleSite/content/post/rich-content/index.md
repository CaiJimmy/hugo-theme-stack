+++
author = "Hugo Authors"
title = "Rich Content"
date = "2019-03-10"
description = "A brief description of Hugo Shortcodes"
tags = [
    "shortcodes",
    "privacy",
]
+++

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.
<!--more-->
---

## YouTube Privacy Enhanced Shortcode

{{< youtube ZJthWmvUzzc >}}

<br>

---

## Twitter Simple Shortcode

{{< twitter_simple user="DesignReviewed" id="1085870671291310081" >}}

<br>

---

## Vimeo Simple Shortcode

{{< vimeo_simple 48912912 >}}

## bilibilibi Shortcode

{{< bilibili av498363026 >}}

## Gist Shortcode

{{< gist spf13 7896402 >}}

## Gitlab Snippets Shortcode

{{< gitlab 2349278 >}}

## Quote Shortcode

Stack adds a `quote` shortcode.  For example:

{{< quote author="A famous person" source="The book they wrote" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote source="Anonymous book" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote source="Some book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote author="Somebody">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

---

## Inline Footnote Shortcode

Stack adds an `footnote` shortcode for inline footnotes that display as popups. For example:

This is a sentence with an inline footnote{{< footnote id="1" >}}This is the footnote content that will appear in a popup when you click on the footnote number. You can include **markdown formatting** and [links](https://example.com) in the footnote content.{{< /footnote >}} that demonstrates the functionality.

You can also have multiple footnotes in the same paragraph{{< footnote id="2" >}}This is another footnote with different content. Footnotes are automatically numbered and can contain any markdown content.{{< /footnote >}} to show how they work together.

The footnotes appear as small numbered circles that you can click to reveal the content in a popup. The popup can be closed by clicking the × button, clicking outside the popup, or pressing the Escape key.
