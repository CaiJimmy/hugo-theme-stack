---
title: "鏈接"
layout: links
menu:
  main:
    weight: -50
    params:
      icon: link
comments: false
---

要使用此功能，請在頁面 front matter 中添加 `layout: links`，然後在同一頁面 bundle 目錄下建立 `links.<語言>.json` 檔案。

## 分類格式（推薦）

使用分類物件陣列。每個物件包含 `title`（分類名稱）、`links`（連結陣列）和可選的 `compact` 標記。分類按陣列中的順序顯示。

**標準分類：**

```json
[
  {
    "title": "好夥伴",
    "shuffle": true,
    "links": [
      {
        "title": "GitHub",
        "description": "GitHub 是世界上最大的軟體開發平台。",
        "website": "https://github.com",
        "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      }
    ]
  }
]
```

**緊湊分類** — 設定 `compact: true`，以密集圖示網格渲染（桌面端每行 6 個），只顯示頭像和名稱：

```json
[
  {
    "title": "冷凍休眠艙",
    "compact": true,
    "links": [
      {
        "title": "PTT",
        "website": "https://www.ptt.cc",
        "image": "https://www.ptt.cc/favicon.ico"
      }
    ]
  }
]
```

同一陣列中可以自由混用兩種分類樣式。

## 扁平格式（相容舊版）

也支援不帶 `title`/`links` 包裹的純連結物件陣列，將作為無分類標題的單一標準網格渲染：

```json
[
  {
    "title": "GitHub",
    "description": "GitHub 是世界上最大的軟體開發平台。",
    "website": "https://github.com",
    "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  }
]
```

## 支援的欄位

### 分類欄位

| 欄位      | 必填 | 說明                                       |
| --------- | ---- | ------------------------------------------ |
| `title`   | 是   | 分類標題                                   |
| `links`   | 是   | 連結物件陣列                               |
| `compact` | 否   | `true` 啟用密集圖示網格（只顯示頭像和名稱） |
| `shuffle` | 否   | `true` 在每次頁面載入時隨機排序該分類內的友站 |

### 連結欄位

| 欄位          | 必填 | 說明                         |
| ------------- | ---- | ---------------------------- |
| `title`       | 是   | 友站名稱                     |
| `website`     | 是   | 目標 URL                     |
| `description` | 否   | 簡介，未填時顯示 URL         |
| `image`       | 否   | 頭像，支援本地檔名或外部 URL |
| `alt`         | 否   | 頭像圖片的 alt 文字          |

多語言網站請為每種語言單獨建立檔案：`links.en.json`、`links.zh.json` 等。
