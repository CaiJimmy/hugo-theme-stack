---
title: "链接"
layout: links
menu:
  main:
    weight: -50
    params:
      icon: link
comments: false
---

要使用此功能，请在页面 front matter 中添加 `layout: links`，然后在同一页面 bundle 目录下创建 `links.<语言>.json` 文件。

## 分类格式（推荐）

使用分类对象数组。每个对象包含 `title`（分类名）、`links`（链接数组）和可选的 `compact` 标记。分类按数组中的顺序显示。

**标准分类：**

```json
[
  {
    "title": "好伙伴",
    "shuffle": true,
    "links": [
      {
        "title": "GitHub",
        "description": "GitHub 是世界上最大的软件开发平台。",
        "website": "https://github.com",
        "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      }
    ]
  }
]
```

**紧凑分类** — 设置 `compact: true`，以密集图标网格渲染（桌面端每行 6 个），只显示头像和名称：

```json
[
  {
    "title": "冷冻休眠舱",
    "compact": true,
    "links": [
      {
        "title": "V2EX",
        "website": "https://www.v2ex.com",
        "image": "https://www.v2ex.com/favicon.ico"
      }
    ]
  }
]
```

同一数组中可以自由混用两种分类样式。

## 扁平格式（兼容旧版）

也支持不带 `title`/`links` 包裹的纯链接对象数组，将作为无分类标题的单一标准网格渲染：

```json
[
  {
    "title": "GitHub",
    "description": "GitHub 是世界上最大的软件开发平台。",
    "website": "https://github.com",
    "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  }
]
```

## 支持的字段

### 分类字段

| 字段      | 必填 | 说明                                     |
| --------- | ---- | ---------------------------------------- |
| `title`   | 是   | 分类标题                                 |
| `links`   | 是   | 链接对象数组                             |
| `compact` | 否   | `true` 启用密集图标网格（只显示头像和名称） |
| `shuffle` | 否   | `true` 在每次页面加载时随机排序该分类内的友链 |

### 链接字段

| 字段          | 必填 | 说明                           |
| ------------- | ---- | ------------------------------ |
| `title`       | 是   | 友链名称                       |
| `website`     | 是   | 目标 URL                       |
| `description` | 否   | 简介，未填时显示 URL           |
| `image`       | 否   | 头像，支持本地文件名或外部 URL |
| `alt`         | 否   | 头像图片的 alt 文本            |

多语言站点请为每种语言单独创建文件：`links.en.json`、`links.zh.json` 等。
