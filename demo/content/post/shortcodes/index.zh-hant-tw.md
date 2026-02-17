---
title: 短代碼
date: 2026-01-26
description: 展示 Stack 主題支持的各種短代碼。
categories:
    - Documentation
tags:
    - 隐私
---

Stack 主題還提供了一些自定義短代碼來增強你的內容。

<!--more-->

## 引用 (Quote)

`quote` 短代碼允許你顯示帶有作者、來源和 URL 的引用。

{{< quote author="一位名人" source="他們寫的書" url="https://zh.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
{{< /quote >}}

### 用法

```markdown
{{</* quote author="作者名字" source="文章標題" url="https://example.com" */>}}
這裡是引用內容。
{{</* /quote */>}}
```

## 視頻 (Video)

`video` 短代碼允許你嵌入自託管或遠程視頻文件。

{{< video src="https://www.w3schools.com/html/mov_bbb.mp4" >}}

### 用法

```markdown
{{</* video src="https://example.com/video.mp4" */>}}
```

## Bilibili

嵌入來自 Bilibili 的視頻。支持 `av` 和 `bv` 號。

{{< bilibili "BV1634y1t7xR" >}}

### 用法

```markdown
{{</* bilibili "BV1634y1t7xR" */>}}
```

## YouTube

Hugo 內置的 YouTube 短代碼。

{{< youtube ZJthWmvUzzc >}}

### 用法

```markdown
{{</* youtube ZJthWmvUzzc */>}}
```


## 騰訊視頻 (Tencent Video)

嵌入來自騰訊視頻的視頻。

{{< tencent "u00306ng962" >}}

### 用法

```markdown
{{</* tencent "u00306ng962" */>}}
```


## GitLab Snippet

嵌入來自 GitLab 的代碼片段。

{{< gitlab 2349278 >}}

### 用法

```markdown
{{</* gitlab 2349278 */>}}
```


## 圖表 (Diagrams)

Stack 出箱即用地支持 [Mermaid](https://mermaid.js.org/) 圖表。

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 用法

將你的 Mermaid 代碼包裹在語言設置為 `mermaid` 的代碼塊中。

<pre><code>```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```</code></pre>
