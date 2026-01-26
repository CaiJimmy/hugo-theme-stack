---
title: 写真ギャラリー
description: 内蔵の写真ギャラリー機能を披露
date: 2026-01-26
slug: image-gallery
image: helena-hertz-wWZzXlDpMog-unsplash.jpg
categories:
    - Documentation
tags:
    - Gallery
    - Photoswipe
toc: false
---

Stack テーマには、写真ギャラリー機能が内蔵されています。複数の画像を並べて配置するだけで、美しいギャラリーを作成できます。

## ギャラリーの例

![Photo by Florian Klauer on Unsplash](florian-klauer-nptLmg6jqDo-unsplash.jpg)  ![Photo by Luca Bravo on Unsplash](luca-bravo-alS7ewQ41M8-unsplash.jpg) 

![Photo by Helena Hertz on Unsplash](helena-hertz-wWZzXlDpMog-unsplash.jpg)  ![Photo by Hudai Gayiran on Unsplash](hudai-gayiran-3Od_VKcDEAA-unsplash.jpg)

## 仕組み

ギャラリーは **Photoswipe** と独自の内部スクリプトによって動作します。画像の縦横比に基づいて、最適なレイアウトが自動的に計算されます。

ギャラリーを作成するには、同じ行（または同じ段落）に複数の画像を配置するだけです。

### 構文

```markdown
![画像 1](image1.jpg)  ![画像 2](image2.jpg) 

![画像 3](image3.jpg)  ![画像 4](image4.jpg)
```

> **注意**: Markdown で画像が同じ行に保持されるように、画像の間には 2 つのスペースを入れる必要があります。

---

ギャラリーの構文は [Typlog](https://typlog.com/) にインスパイアされています。
