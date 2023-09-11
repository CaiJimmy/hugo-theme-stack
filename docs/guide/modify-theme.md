# Modify theme

Depending on how you installed the theme, it might be harder or easier to modify it. 

## Hugo module

Using this method, there won't be any file under `themes` directory. In order to modify the theme, you will have to copy the file you want to modify to the same directory under `layouts` directory.

For example, in order to modify the `themes/hugo-theme-stack/layouts/partials/head/custom.html` file, you will have to copy it to `layouts/partials/head/custom.html` and modify it there (copy the code from theme's repository). 
The same applies to `assets` and `static` directories.

## Git submodule

::: tip
The method described above for Hugo module works here too. In fact it's the recommended way for small changes.
:::

If you installed the theme through Git / Git submodule, you can modify the theme file directly and see the changes in your local site. 

However, **you can not commit and push the changes directly** since you don't have the permission to push to the theme repository. 

You need to **fork** the theme repository and push your changes to your forked repository (change submodule's repository url). Then, you can commit those changes to your site repository.
