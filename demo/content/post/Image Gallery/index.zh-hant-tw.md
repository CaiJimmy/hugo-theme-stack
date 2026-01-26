---
title: 相簿
description: 展示內置的相簿支持
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

Stack 主題內置了對相簿的支持。你只需要簡單地將多張圖片並排放置，就可以創建一個精美的相簿。

## 示例相簿

![Photo by Florian Klauer on Unsplash](florian-klauer-nptLmg6jqDo-unsplash.jpg)  ![Photo by Luca Bravo on Unsplash](luca-bravo-alS7ewQ41M8-unsplash.jpg) 

![Photo by Helena Hertz on Unsplash](helena-hertz-wWZzXlDpMog-unsplash.jpg)  ![Photo by Hudai Gayiran on Unsplash](hudai-gayiran-3Od_VKcDEAA-unsplash.jpg)

## 它是如何工作的

相簿由 **Photoswipe** 和一個自定義的內部腳本驅動。它會根據圖片的寬高比自動計算出最佳佈局。

要創建一個相簿，你只需要將多張圖片放在同一行（或同一個段落）中。

### 語法

```markdown
![圖片 1](image1.jpg)  ![圖片 2](image2.jpg) 

![圖片 3](image3.jpg)  ![圖片 4](image4.jpg)
```

> **注意**: 圖片之間應該有兩個空格，以確保它們在 Markdown 中保持在同一行。

---

相簿語法啟發自 [Typlog](https://typlog.com/)
