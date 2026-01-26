---
title: ショートコード
date: 2026-01-26
description: Stack テーマでサポートされているさまざまなショートコードを紹介します。
categories:
    - Documentation
tags:
    - 隐私
---

Stack テーマには、コンテンツを強化するためのカスタムショートコードがいくつか用意されています。

<!--more-->

## 引用 (Quote)

`quote` ショートコードを使用すると、著者、出典、URL を含む引用を表示できます。

{{< quote author="有名な人" source="彼らが書いた本" url="https://ja.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
{{< /quote >}}

### 使い方

```markdown
{{</* quote author="著者名" source="出典タイトル" url="https://example.com" */>}}
ここに引用内容を入力します。
{{</* /quote */>}}
```


## ビデオ (Video)

`video` ショートコードを使用すると、セルフホストまたはリモートのビデオファイルを埋め込むことができます。

{{< video src="https://www.w3schools.com/html/mov_bbb.mp4" >}}

### 使い方

```markdown
{{</* video src="https://example.com/video.mp4" */>}}
```


## Bilibili

Bilibili からビデオを埋め込みます。`av` および `bv` ID の両方をサポートしています。

{{< bilibili "BV1634y1t7xR" >}}

### 使い方

```markdown
{{</* bilibili "BV1634y1t7xR" */>}}
```


## YouTube

Hugo 内蔵の YouTube ショートコードです。

{{< youtube ZJthWmvUzzc >}}

### 使い方

```markdown
{{</* youtube ZJthWmvUzzc */>}}
```


## 騰訊視頻 (Tencent Video)

Tencent Video からビデオを埋め込みます。

{{< tencent "u00306ng962" >}}

### 使い方

```markdown
{{</* tencent "u00306ng962" */>}}
```


## GitLab Snippet

GitLab からスニペットを埋め込みます。

{{< gitlab 2349278 >}}

### 使い方

```markdown
{{</* gitlab 2349278 */>}}
```


## 図表 (Diagrams)

Stack は [Mermaid](https://mermaid.js.org/) 図表を標準でサポートしています。

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 使い方

Mermaid コードを、言語を `mermaid` に設定したコードブロックで囲みます。

<pre><code>```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```</code></pre>
