# Writing

Stack uses Hugo's **page bundles** to organize your content. A page bundle is a directory that contains a content file and any related resources. For example, a page bundle for a blog post might look like this:

```
content
└── post
    └── my-first-post
        ├── index.md
        ├── image1.png
        └── image2.png
```

This is the recommended way to organize your content. You can read more about page bundles in [Hugo's documentation](https://gohugo.io/content-management/page-bundles/).

::: warning
Inserting external images is supported, but **it is not recommended**. 

Features like image gallery and image zooming will not work with external images. Those feature needs to know the image's dimensions, which is not possible with external images.
:::

With above organization, you can insert images in your content like this:

```markdown
--- content/post/my-first-post/index.md ---
![Image 1](image1.png)
![Image 2](image2.png)
```

## Insert image gallery

To insert an image gallery, you need to create a page bundle for the gallery. For example:

```
content
└── gallery
    └── my-first-gallery
        ├── index.md
        ├── image1.png
        ├── image2.png
        └── image3.png
```

Then, you can insert the gallery in your content like this:

```markdown
--- content/gallery/my-first-gallery/index.md ---
![Image 1](image1.png) ![Image 2](image2.png)
![Image 3](image3.png)
```

Which will render in two rows, with two images in the first row and one image in the second row.
