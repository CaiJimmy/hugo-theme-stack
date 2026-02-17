---
title: 短代码
date: 2026-01-26
description: 展示 Stack 主题支持的各种短代码。
categories:
    - Documentation
tags:
    - 隐私
---

Stack 主题还提供了一些自定义短代码来增强你的内容。

<!--more-->

## 引用 (Quote)

`quote` 短代码允许你显示带有作者、来源和 URL 的引用。

{{< quote author="一位名人" source="他们写的书" url="https://zh.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
{{< /quote >}}

### 用法

```markdown
{{</* quote author="作者名字" source="文章标题" url="https://example.com" */>}}
这里是引用内容。
{{</* /quote */>}}
```

## 视频 (Video)

`video` 短代码允许你嵌入自托管或远程视频文件。

{{< video src="https://www.w3schools.com/html/mov_bbb.mp4" >}}

### 用法

```markdown
{{</* video src="https://example.com/video.mp4" */>}}
```

## Bilibili

嵌入来自 Bilibili 的视频。支持 `av` 和 `bv` 号。

{{< bilibili "BV1634y1t7xR" >}}

### 用法

```markdown
{{</* bilibili "BV1634y1t7xR" */>}}
```

## YouTube

Hugo 内置的 YouTube 短代码。

{{< youtube ZJthWmvUzzc >}}

### 用法

```markdown
{{</* youtube ZJthWmvUzzc */>}}
```

## 腾讯视频 (Tencent Video)

嵌入来自腾讯视频的视频。

{{< tencent "u00306ng962" >}}

### 用法

```markdown
{{</* tencent "u00306ng962" */>}}
```

## GitLab Snippet

嵌入来自 GitLab 的代码片段。

{{< gitlab 2349278 >}}

### 用法

```markdown
{{</* gitlab 2349278 */>}}
```

## 图表 (Diagrams)

Stack 出箱即用地支持 [Mermaid](https://mermaid.js.org/) 图表。

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 用法

将你的 Mermaid 代码包裹在语言设置为 `mermaid` 的代码块中。

<pre><code>```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```</code></pre>
