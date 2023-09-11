# Shortcodes

Stack comes with a set of [shortcodes](https://gohugo.io/content-management/shortcodes/) that you can use in your content. 

This page only includes the shortcodes that are specific to Stack. Hugo's built-in shortcodes are documented [here](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes).

## Bilibili video

Embed a [Bilibili](https://www.bilibili.com/) video.

```markdown
{{< bilibili VIDEO_ID PART_NUMBER >}}
```

The `Video_ID` can be found in the URL of the video. For example, the video ID of `https://www.bilibili.com/video/av12345678` is `av12345678`. Both `AV` and `BV` are supported.

The `PART_NUMBER` is optional. It can be used to specify the part of the video to play. For example, the part number of `https://www.bilibili.com/video/av12345678?p=2` is `2`.

## Tencent video

Embed a [Tencent Video](https://v.qq.com/) video.

```markdown
{{< tencent VIDEO_ID >}}
```

The `Video_ID` can be found in the URL of the video. For example, the video ID of `https://v.qq.com/x/cover/hzgtnf6tbvfekfv/g0014r3khdw.html` is `g0014r3khdw`.

## YouTube video

Embed a [YouTube](https://www.youtube.com/) video.

```markdown
{{< youtube VIDEO_ID >}}
```

The `Video_ID` can be found in the URL of the video. For example, the video ID of `https://www.youtube.com/watch?v=VIDEO_ID` is `VIDEO_ID`.

## Generic video file

Embed a video file.

```markdown
{{< video VIDEO_URL >}}

{{< video src="VIDEO_URL" autoplay="true" poster="./video-poster.png" >}}
```

The `VIDEO_URL` can be a URL or a path relative to the `static` directory. For example, `src="/video/my-video.mp4"` will embed the video file `static/video/my-video.mp4` of your site folder.

The `autoplay` attribute is optional. It can be used to specify whether the video should be played automatically. The `poster` attribute is optional. It can be used to specify the poster image of the video.

## GitLab

Embed a [GitLab](https://gitlab.com/) snippets.

```markdown
{{< gitlab SNIPPET_ID >}}
```

The `SNIPPET_ID` can be found in the URL of the snippet. For example, the snippet ID of `https://gitlab.com/-/snippets/1234567` is `1234567`.

## Quote

```markdown
{{< quote author="A famous person" source="The book they wrote" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}
```