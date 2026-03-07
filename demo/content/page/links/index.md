---
title: Links
layout: links
menu:
  main:
    weight: -50
    params:
      icon: link

comments: false
---

To use this feature, add `layout: links` to the page's front matter, then create a `links.<lang>.json` file in the same page bundle directory.

## Categorized format (recommended)

Use an array of category objects. Each object has a `title`, a `links` array, and an optional `compact` flag. Categories are displayed in the order they appear in the array.

**Standard category:**

```json
[
  {
    "title": "Friends",
    "shuffle": true,
    "links": [
      {
        "title": "GitHub",
        "description": "GitHub is the world's largest software development platform.",
        "website": "https://github.com",
        "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      }
    ]
  }
]
```

**Compact category** — set `compact: true` to render a dense icon-grid (6 per row on desktop) showing only avatar and name:

```json
[
  {
    "title": "Cryosleep Pod",
    "compact": true,
    "links": [
      {
        "title": "Reddit",
        "website": "https://www.reddit.com",
        "image": "https://www.reddit.com/favicon.ico"
      }
    ]
  }
]
```

Both category styles can be mixed freely in the same array.

## Flat array format
A flat array of link objects (without `title`/`links` wrapper) is also supported and will be rendered as a single uncategorized standard grid:

```json
[
  {
    "title": "GitHub",
    "description": "GitHub is the world's largest software development platform.",
    "website": "https://github.com",
    "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  }
]
```

## Supported fields

### Category fields

| Field     | Required | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| `title`   | Yes      | Category heading                                           |
| `links`   | Yes      | Array of link objects                                      |
| `compact` | No       | `true` to render a dense icon-grid (avatar + name only)    |
| `shuffle` | No       | `true` to randomly reorder links within this category on each page load |

### Link fields

| Field         | Required | Description                              |
| ------------- | -------- | ---------------------------------------- |
| `title`       | Yes      | Display name of the link                 |
| `website`     | Yes      | Target URL                               |
| `description` | No       | Short description; falls back to the URL |
| `image`       | No       | Avatar — local filename or external URL  |
| `alt`         | No       | Alt text for the avatar image            |

For multilingual sites, create one file per language: `links.en.json`, `links.zh.json`, etc.
