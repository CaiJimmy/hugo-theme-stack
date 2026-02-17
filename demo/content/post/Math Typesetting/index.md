---
title: Math Typesetting
date: 2026-01-24
description: Guide to enabling and using KaTeX in the Stack theme
math: true
categories:
    - Documentation
slug: math-typesetting
---

The Stack theme supports rendering mathematical notation using [KaTeX](https://katex.org/).

<!--more-->

## Enabling KaTeX

### Per-page basis

To enable KaTeX for a specific post, include `math: true` in the post's frontmatter:

```yaml
---
title: "My Math Post"
math: true
---
```

### Globally

To enable KaTeX for all posts, set `article.math` to `true` in your site configuration (`params.yaml` or `params.toml`):

```yaml
article:
    math: true
```

## Examples

### Inline Math

You can include math inline by wrapping the expression in single dollar signs `$`.

For example: `$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $` renders as $ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $

### Block Math

For larger equations, use double dollar signs `$$` to create a math block.

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$

### More Complex Formula

$$
f(a) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z-a} dz
$$

---

**Note:** For a full list of supported TeX functions, refer to the [KaTeX documentation](https://katex.org/docs/supported.html).
