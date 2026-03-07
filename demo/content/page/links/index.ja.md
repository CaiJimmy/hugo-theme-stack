---
title: "リンク"
layout: links
menu:
  main:
    weight: -50
    params:
      icon: link
comments: false
---

この機能を使用するには、ページの front matter に `layout: links` を追加し、同じページ bundle ディレクトリに `links.<言語>.json` ファイルを作成してください。

## カテゴリ形式（推奨）

カテゴリオブジェクトの配列を使用します。各オブジェクトには `title`（カテゴリ名）、`links`（リンク配列）、およびオプションの `compact` フラグがあります。カテゴリは配列内の順序で表示されます。

**標準カテゴリ：**

```json
[
  {
    "title": "友達",
    "shuffle": true,
    "links": [
      {
        "title": "GitHub",
        "description": "GitHub は世界最大のソフトウェア開発プラットフォームです。",
        "website": "https://github.com",
        "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      }
    ]
  }
]
```

**コンパクトカテゴリ** — `compact: true` を設定すると、密集アイコングリッド（デスクトップで1行6個）でアバターと名前のみ表示されます：

```json
[
  {
    "title": "冷凍冬眠ポッド",
    "compact": true,
    "links": [
      {
        "title": "Qiita",
        "website": "https://qiita.com",
        "image": "https://qiita.com/favicon.ico"
      }
    ]
  }
]
```

同一配列内で両方のカテゴリスタイルを自由に混在させることができます。

## フラット形式（旧バージョン互換）

`title`/`links` ラッパーなしの純粋なリンクオブジェクト配列もサポートしており、カテゴリタイトルなしの単一標準グリッドとしてレンダリングされます：

```json
[
  {
    "title": "GitHub",
    "description": "GitHub は世界最大のソフトウェア開発プラットフォームです。",
    "website": "https://github.com",
    "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  }
]
```

## サポートされているフィールド

### カテゴリフィールド

| フィールド | 必須   | 説明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| `title`    | はい   | カテゴリ見出し                                               |
| `links`    | はい   | リンクオブジェクトの配列                                     |
| `compact`  | いいえ | `true` で密集アイコングリッド（アバターと名前のみ）を有効化 |
| `shuffle`  | いいえ | `true` でページ読み込みのたびにカテゴリ内のリンクをランダムに並び替え |

### リンクフィールド

| フィールド    | 必須   | 説明                                           |
| ------------- | ------ | ---------------------------------------------- |
| `title`       | はい   | リンクの表示名                                 |
| `website`     | はい   | リンク先 URL                                   |
| `description` | いいえ | 説明文。未指定の場合は URL が表示されます      |
| `image`       | いいえ | アバター画像。ローカルファイル名または外部 URL |
| `alt`         | いいえ | アバター画像の alt テキスト                    |

多言語サイトでは言語ごとにファイルを作成してください：`links.en.json`、`links.ja.json` など。
