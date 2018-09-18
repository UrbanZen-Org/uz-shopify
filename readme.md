# Urban Zen Shopify Development Documentation (shop.urbanzen.com)

This documentation is for the shopify portion of urbanzen.com.
The wordpress site is stored on git at https://github.com/UrbanZen-Org/urbanzen.

## Codebase
The code for the site is stored on Github.
https://github.com/UrbanZen-Org/uz-shopify

##### Deployment
Documentation:
https://shopify.github.io/themekit/

Deployment to the server is done through shopify theme kit. The settings for this are in config.yml. The branches are called dev and prod.  The 'dev' branch pushes changes to urban-zen-foundation.myshopify.com for staging and the 'prod' branch pushes changes to the main shopify site.
 
 You can watch for changes with theme kit by running:
``` sh
theme watch -e prod
```

## SCSS/JS Development
Documentation:
https://webpack.js.org/guides/
http://sass-lang.com/documentation/file.SASS_REFERENCE.html

The theme was initially setup (before I started) using static files in the theme. -_-
These are located in ``` assets/styles.scss.liquid ```.  Don't make changes here, make them in the additional css area, outlined below. There is also JS baked into random parts of the theme... Sorry. Of course, make JS updates in the additional area as well.

Additional SCSS/JS Development is compiled through 'gulp'. The files are located in ``` src/scss ``` and ``` src/js ```, respectively. 
The main SCSS file is ``` src/scss/css-additional-styles.scss ``` and it is compiled to ``` /assets/css-additional-styles.css ```
The main JS file is ``` src/scss/main.js ``` and it is compiled to ``` assets/js-additional-js.js ```

The files are compiled through gulp.
This command (from the root) will watch the src directory for changes using gulp:
``` sh
gulp
```
