# Widgets

Widgets are placed at right sidebar of the blog. They are used to display some information such as categories, tags, etc.

You can configure which widgets to display and their order in the homepage and post page.

`widget.homepage` and `widget.page` are arrays of maps. Each map contains two keys: `type` and `params`. `type` is the name of the widget. `params` is the configuration of the widget.

## Available widgets

### archives

Display a list of years with the number of posts published in each year.

You need to create a page with `layout: archives` previously.

#### Paramters

- `limit`: Number of years to display. Default: `10`.

### search

Display a search box. 

You need to create a page with `layout: search` previously.

### categories

Display a list of categories available in the blog.

#### Parameters

- `limit`: number of categories to display. Default: 10

### toc

Display a table of contents of the page.

### tag-cloud

Display a tag cloud.

#### Parameters

- `limit`: number of tags to display. Default: 10

