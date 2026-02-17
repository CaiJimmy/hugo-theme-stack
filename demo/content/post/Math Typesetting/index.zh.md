---
title: 数学公式
date: 2026-01-24
description: 在 Stack 主题中启用和使用 KaTeX 的指南
math: true
categories:
    - Documentation
slug: math-typesetting
---

Stack 主题支持使用 [KaTeX](https://katex.org/) 渲染数学公式。

<!--more-->

## 启用 KaTeX

### 按页面启用

要在特定文章中启用 KaTeX，请在文章的前置参数（frontmatter）中包含 `math: true`：

```yaml
---
title: "我的数学文章"
math: true
---
```

### 全局启用

要为所有文章启用 KaTeX，请在网站配置（`params.yaml` 或 `params.toml`）中将 `article.math` 设置为 `true`：

```yaml
article:
    math: true
```

## 示例

### 行内公式

你可以通过将表达式包裹在单个美元符号 `$` 中来包含行内公式。

例如：`$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $` 将渲染为 $ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $

### 块级公式

对于较大的方程式，请使用双美元符号 `$$` 创建数学块。

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$

### 更复杂的公式

$$
f(a) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z-a} dz
$$

---

**注意：** 有关受支持的 TeX 函数的完整列表，请参阅 [KaTeX 文档](https://katex.org/docs/supported.html)。
