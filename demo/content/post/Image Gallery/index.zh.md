---
title: 相册
description: 展示内置的相册支持
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

Stack 主题内置了对相册的支持。你只需要简单地将多张图片并排放置，就可以创建一个精美的相册。

## 示例相册

![Photo by Florian Klauer on Unsplash](florian-klauer-nptLmg6jqDo-unsplash.jpg)  ![Photo by Luca Bravo on Unsplash](luca-bravo-alS7ewQ41M8-unsplash.jpg) 

![Photo by Helena Hertz on Unsplash](helena-hertz-wWZzXlDpMog-unsplash.jpg)  ![Photo by Hudai Gayiran on Unsplash](hudai-gayiran-3Od_VKcDEAA-unsplash.jpg)

## 它是如何工作的

相册由 **Photoswipe** 和一个自定义的内部脚本驱动。它会根据图片的宽高比自动计算出最佳布局。

要创建一个相册，你只需要将多张图片放在同一行（或同一个段落）中。

### 语法

```markdown
![图片 1](image1.jpg)  ![图片 2](image2.jpg) 

![图片 3](image3.jpg)  ![图片 4](image4.jpg)
```

> **注意**: 图片之间应该有两个空格，以确保它们在 Markdown 中保持在同一行。

---

相册语法启发自 [Typlog](https://typlog.com/)
