---
title: "Styling Guidelines"
order: 5
hidden: true
---

## Writing Semantic HTML
Writing semantic HTML markup is a core part of front-end web development. Semantic markup helps developers understand the layout or outline of your pages, as well as machines (search engines, screen readers, etc). Included are some resources if you are unfamiliar with semantic HTML elements or when to use them:
- General basics and elements overview: http://html.com/semantic-markup/
- Thinking about how and when to use semantic markup: https://internetingishard.com/html-and-css/semantic-html/
- More of a think piece on the importance on semantic HTML: https://alistapart.com/article/semanticsinhtml5

Semantic HTML elements may not be available for every scenario, but CSS class names also help add semantic value so remember to think about semantics when naming your classes as well.
 
## CSS
Even though we typically write in SCSS at GoInvo, CSS is still at the core. [Googling 'learn CSS'](http://lmgtfy.com/?q=learn+CSS) should come up with plenty of courses, tutorials, etc to help you get started. Once you have some of the basics down, also check out these resources:
- CSS Reference: https://www.w3schools.com/CSSref/
- A good article on CSS cascading and specificity: http://simurai.com/blog/2015/09/09/back-to-the-roots
- This resource helps you determine what browsers support various CSS rules: http://caniuse.com/
- Easing functions (used for transitions or animations): http://easings.net/
- If you ever run into an issue where you need CSS styles to vary based on the number of siblings present or likewise, this article is amazing: https://alistapart.com/article/quantity-queries-for-css
- Ol' faithful: https://css-tricks.com/
 
## SCSS (or SASS)
At GoInvo we usually use a CSS preprocessor language called SASS, using SCSS files which incorporate both SASS and CSS. Learn more about SASS and SCSS here:
- http://sass-lang.com/guide
- http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html
 
## Understanding SCSS files and how CSS is naturally global
(Note: The following is _not_ true for [CSS Modules](https://github.com/css-modules/css-modules) which are [sometimes used with React](https://github.com/gajus/react-css-modules))
Though CSS rules are usually broken out into separate SCSS files that may correspond to UI components, all rules exist globally in the browser document. In additional CSS (Cascading Style Sheets) rules literally "cascade", so duplicate rule definitions included below will override ones above. So you still need to name classes appropriately for components and add rules in the appropriate spots in the application. For example, imagine there are two files with the same selector declared in both:
```CSS
// dashboard.scss
.tile {
    padding: 10px;
    background-color: $c-purple;
    border: 1px solid $c-global-border;
}
```
```CSS
// detail.scss
.tile {
    padding: 5px;
    border: 1px solid $c-global-border;
    box-shadow: $box-shadow-small;
}
```
```CSS
// app.scss
@import './dashboard';
@import './detail';
```

 Across the _whole_ application, `.tile` will render with these rules in the browser:
```CSS
.tile {
  padding: 5px; // from detail.scss
  background-color: $c-purple; // from dashboard.scss
  border: 1px solid $c-global-border; // from detail.scss
  box-shadow: $box-shadow-small; // from detail.scss
}
```

As you can see, the `.tile` selector, although defined in separate files, will render with the combined rules from `dashboard.scss` and `detail.scss` rules, with duplicate rules from `detail.scss` overriding the same from `dashboard.scss`. This is because in our `app.scss` file, `detail.scss` was imported _after_ `dashboard.scss` (cascading rules in action!). Don't be fooled into thinking that separate SCSS files for components means the CSS is inherently specific only to that component or page. In the example above, the rules for `.tile` should probably be generalized and live somewhere else, or the selectors could be changed to be more specific to the component, depending on the situation.

## Build process
We most often write SCSS here at Invo, which means you need some sort of build process, however small, to compile to CSS. You may also need build processes to build icon sprites, optimize images/files, concat files, do cache-busting, linting, minification, watching files and directories for changes, and even testing. There are plenty of methods to do this ranging from command line, configurable scripts, custom code, and GUIs. The build process is often influenced by the rest of the project and any frameworks being used. For instance, if you are working with React then you'll likely be using Webpack and loaders, and with Ruby you will likely use Ruby Gems (like `ruby-sass`). Usually you'll have tasks or scripts to run from the command line to trigger certain aspects of your build process. Most often we are working with Node packages, through yarn (or npm). Here's a brief review of some of the common tools used:
- [Node](https://nodejs.org/en/): A JavaScript run-time environment that let's you run JavaScript code outside of a browser (a.k.a. on a server or on your machine). This tool is used to script tasks and work with other Node based tools.
- [npm](https://www.npmjs.com/): The package manager (sometimes called dependency manager) tool for Node. This lets you install Node packages on your machine and scoped to your project.
- [yarn](https://yarnpkg.com/en/): The same type of tool as npm, but newer, faster, and more secure, as well as some other differences.
- [webpack](https://webpack.js.org/): This is a Node-based module bundler, not exclusive to but often used in React environments. Essentially it takes a modules and their dependencies and bundles them together, creating static files/assets which can then be delivered to the client.
- [gulp](https://gulpjs.com/): A Node-based toolkit/task runner which allows the user to create a streaming build system from custom and third party module tasks.
- [grunt](https://gruntjs.com/): Another Node-based task runner similar to Gulp, but with different implementations. With Gulp you write code and use third-party packages in your code. With Grunt you configure packages with configuration objects.

These are just a few of the base level tools for creating a build process. Webpack, Gulp, and Grunt are used to run tasks that often rely on third-party packages/dependencies installed through yarn or npm, all of which run on Node. There are thousands and thousands of packages for these tools, so we won't review them all, but it's safe to assume there is a tool to achieve most build tasks you would ever need (e.g. `sass-loader`, `gulp-sass`, `grunt-sass`). There is plenty of information and tutorials on the net about working with build tools, so happy Googling.
 
## Autoprefixer
Usually you'll want to incorporate [Autoprefixer](https://github.com/postcss/autoprefixer) into your build process, so you don't need to add browser prefixes to any of your CSS properties. Just write the plain property and the build process will output the correct prefixes in the compiled CSS. There are Autoprefixer packages for all the main task runners. Browser prefixes are properties that start with:

```
-moz-     // Firefox and other browsers using Mozilla's browser engine
-webkit-  // Safari, Chrome and browsers using the Webkit engine
-o-       // Opera
-ms-      // Internet Explorer (but not always)
```
 
## Styling guidelines (or you could call them preferences)
<!-- TODO: Should probably distill our own guidelines from the linked ones -->
There are a couple articles to understand general styling guidelines when writing CSS code, [one from Medium](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06) and [another from CSS Tricks](https://css-tricks.com/sass-style-guide/). These are good places to familiarize yourself with some recommended practices when writing CSS (**like, actually read those though**). They may overlap and/or vary at points, but in general you can distill some core principles. **At GoInvo, we generally follow something along these lines.** Rather than copy/pasting the rules, I've just provided the links for now, so again, definitely read through those guides. At some point we will get around to distilling our own version. If you're working in a codebase and see something that doesn't conform to the guidelines, and you have the availability, you should confer with your colleagues and consider refactoring. It's also important to understand that these guidelines are merely preferential choices made at the conception of a project. As with all code, it is open for adjustment and improvement over time, especially as new and better practices are introduced. In the time being, it is recommended to stick to these guidelines in order to maintain a consistent codebase. A couple important starters are as follows.
- All new selectors and rules should be on a single new line.
- You should always put spaces between a selector and curly bracket, as well as after the colon trailing a CSS property.
- Another thing to keep in mind is the order in which you list your CSS properties. To help keep things consistent and allow for quick interpretation of code, group properties in the following way:

```
1. Includes, extends, etc.
2. Display, positioning, content, and float properties
3. Additional Flex properties
4. Sizing properties
5. Margin and padding
6. Background properties
7. Borders, shadows, etc.
8. Font properties
9. Other textual properties (text-underline, color, etc.)
10. Catch-all area (transforms, cursor, etc.)
11. Transitions
```

For example (not that you'd ever really use this code):

```CSS
.my-element {
  .my-include;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 500px;
  padding: 10px 0;
  margin: 5px;
  background-color: $c-sidebar-bg;
  border: 1px solid $c-global-border;
  border-radius: $border-radius;
  font-size: $font-size-small;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all 200ms;
}
```
 
## Nesting, Including, and Extending
Yes, SCSS allows us to nest CSS rules... but this isn't something that should always happen. Nesting does help keep code DRY, and is particularly great for things like applying modifier classes and building modular selectors. What needs to be avoided is mimicking the DOM structure or name-spacing just because, both of which result in very long and specific CSS selectors which are inherently not reusable and hard to override when required. Also, when nesting a selector you should group your CSS properties at the top and add a blank newline between the CSS properties and the next selector. Group children and modifiers appropriately, generally with modifiers after children (as it's possible they may need to the children again, even though this is generally a less preferable practice).

**Bad:**
```CSS
.results {
    display: flex;
    justify-content: space-around;
    .result-tile {
        flex: 0 0 25%;
        padding: 10px;
        border: 1px solid $c-global-border;
        a.result-title {
            &:hover {
                text-decoration: none;
            }
        }
        &.result-tile-xl {
            flex: 0 0 50%;
            .result-content {
                p {
                    max-width: 800px;
                }
            }
        }
        .result-content {
            p {
                max-width: 600px;
            }
        }
    }
}
```

**Good:**
```CSS
.results {
    display: flex;
    justify-content: space-around;
}
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;

    &-xl {
        flex: 0 0 50%;
        // <- Note the blank new line between CSS props and child selector when nesting
        .result-content {
            max-width: 800px;
        }
    }
}
.result-content { // Here, maybe it made more sense to put "result-content" class directly on the p element
    max-width: 600px;
}
.result-title:hover {
    text-decoration: none;
}
```

 A quick note about the above code. You can see that instead of typing out `.result-tile` & `.result-tile-xl`, we can use SCSS nesting to create both selectors. Be advised that in the examples above, `.result-tile-xl` does NOT inherit the styles from `.result-tile`. Let's look at a few different scenario's output to better illustrate this.

**Scenario 1** (`.result-tile-xl` does not inherit styles):
```CSS
// LESS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
 
    &.result-tile-xl {
        flex: 0 0 50%;
    }
}
 
// Compiled CSS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
}
.result-tile.result-tile-xl { // Note that both classes are required for associated rules to take place
    flex: 0 0 50%;
}
```

**Scenario 2** (`result-tile-xl` does not inherit styles):
```CSS
// LESS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
 
    &-xl {
        flex: 0 0 50%;
    }
}
 
// Compiled CSS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
}
.result-tile-xl {
    flex: 0 0 50%;
}
```

**Scenario 3** (`result-tile-xl` inherits styles by extending the original selector):
```CSS
// LESS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
 
    &-xl:extend(.result-tile) {
        flex: 0 0 50%;
    }
}
 
// Compiled CSS
.result-tile,
.result-tile-xl {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
}
.result-tile-xl {
    flex: 0 0 50%;
}
```

**Scenario 4** (`result-tile-xl` inherits styles by including the original selector and thus its properties):
```CSS
// LESS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
}
.result-tile-xl {
    .result-tile;
    flex: 0 0 50%;
}
 
// Compiled CSS
.result-tile {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
}
.result-tile-xl {
    flex: 0 0 25%;
    padding: 10px;
    border: 1px solid $c-global-border;
    flex: 0 0 50%;
}
```

There isn't necessarily a right or wrong when it comes to these scenarios, it just depends on the goal. Be mindful of what your techniques output though, as using these practices incorrectly can quickly bloat your compiled CSS. The following articles will help you understand more about CSS preprocessor nesting (don't worry that the examples use SASS, the nesting guidelines apply in the same way) as well as extending, including, and mixins.

- http://thesassway.com/beginner/the-inception-rule
- http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css
- http://markdotto.com/2015/07/20/css-nesting/
- Learning about SASS mixins: https://www.sitepoint.com/sass-basics-the-mixin-directive/
- Extend vs. Include/Mixin: https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/
 
## Modular CSS
(Different than CSS Modules) Thinking about how to nest CSS properly also brings ones attention to the concept of modular CSS. The general idea is that you should build CSS components similar to how you would build a reusable javascript component. Say we want to make a simple tile component. The core styles shared across all tiles would be in the `.tile` class:
```CSS
.tile {
    padding: 10px;
    border: 1px solid $c-global-border;
    border-radius: $border-radius;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .2);
}
```

Then we could use sub-classes to create additional variations of a tile, so our selector becomes this:
```CSS
.tile {
    padding: 10px;
    border: 1px solid $c-global-border;
    border-radius: $border-radius;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .2);

    &--featured {
        border-color: $c-border-accent;
    }
    &--muted {
        box-shadow: none;
        border-color: lighten($c-global-border, 20%);
    }
}
```

Finally, with this methodology, we would implement this component writing the markup like this (note we need the core class + the modifier class):
```HTML
<div class="tile tile--featured"></div>
```

This is the same approach [Bootstrap](https://getbootstrap.com/) uses (although the above example uses BEM syntax) to create modular CSS classes. When in doubt or if at all confused, use this methodology when making your CSS classes/components. When naming my component and sub classes, use a noun to represent the component, and adjectives to represent the subclasses or modifier. Noun: "tile", adjective: "featured". If there were a sub-component of tile, a noun-noun relationship could be used, like `tile__button`. The following will help with understanding the basics of thinking modularly with your CSS and naming:
- http://thesassway.com/advanced/modular-css-naming-conventions
- http://thesassway.com/advanced/modular-css-an-example

As additional reading resources on the subject, here are some of the top approaches being taken today for writing modular CSS, with our current favorite being BEM.
-  BEM:
  - https://en.bem.info/methodology/css/ 
  - https://css-tricks.com/bem-101/
-   OOCSS:
  - https://github.com/stubbornella/oocss/wiki
  - https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/  
- SMACSS:
  - https://smacss.com/ 
  - http://vanseodesign.com/css/smacss-introduction/
 
## Naming classes
This area closely relates to our guidelines, nesting rules, and modularity rules. So when creating new classes for components in our SCSS, keep those things in mind first. Think about what already exists in the vendor or project code base that can be reused to keep code DRY, whether it be via CSS includes, or using existing classes when building our component's HTML. Next, think about the main component and its sub-components. Name these in a meaningful, semantic way. If there is an inherent relationship, make that clear in the naming. For example you could build a `relevancy-indicator` component which has `relevancy-badge` and a `relevancy-bar`. Again, refer to [this article](http://thesassway.com/advanced/modular-css-naming-conventions) for the basics of naming in a modular way.
 
## Naming assets and variables
Again, when in doubt, consult the guidelines when naming. Assets should be preceded by the type of asset they are and separated by a dash. For instance `icon-home` or `logo-header`. Color variables are preceded by `c- `, like `c-accent` and `c-global-border`. Property specific variables are named as such, for instance `font-weight-bold`, `transition-duration-expand`, `z-index-header`.
 
## Images
When working with images (or videos, for that matter), there are varying levels of file, device, and storage optimization to consider.

Even in this day and age, images can be tough to load in the browser for slower connections and mobile devices, so you'll always want to ensure your files are optimized. This includes exporting images at reasonable dimensions for their use (thumbnail vs. hero image), and an appropriate format for the web (like `png` or `jpeg`). Beyond that, you'll want to further optimize for the web with tools specifically built for web image optimization and compression. These are available as Node packages and [web interfaces](https://kraken.io/).

You may wish to further consider optimizing based on device size. This topic is still evolving and there are various approaches with equally varying support. For now, here is an [article](https://internetingishard.com/html-and-css/responsive-images/) describing the basic technique using HTML and CSS.

In terms of storage, if you don't have hundreds or thousands of images to display, then you can probably get away with keeping images directly in your project. An example of this could be a static website where you have a handful of logos, icons, and images to display. Beyond that, you'll probably want to host images somewhere else (like Amazon S3) and link to them in your app. An example of something like this could be Instagram or Facebook.

Google has a [robust guide](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/) on image optimization considerations.

Last note on images, be sure to include the [`alt`](https://www.w3schools.com/tags/att_img_alt.asp) attribute to describe your image for screen readers and in the cases where it can't be loaded.
 
## Icons
At Invo we often use icons in SVG format through a spritesheet. This makes things easy to use and manage, as well as providing caching for all icons. SVG's are generally also easiest to work with. As per the naming conventions, all icons are prefixed with `icon-` in the filename. The filename of the icon will also usually be used as the unique ID (or 'symbol' ID) to reference the icon from the sprite sheet, so be sure icon file names are unique.

When working with SVG icons, it is easiest to have the entire icon be composed of fills. Thus you can use a single CSS property to change the `fill` of the icon. It is possible to use strokes in icons as well, but more often than not, you won't need them.

Most SVG exports from a design tool will include the `fill` color inline on the SVG elements. Since inline rules take precedence over rules from your CSS files, these need to be removed in the build process in order to have control over icon fill color with your CSS. Keep in mind that any other style attributes applied on your SVG (like stroke-width, stroke, etc.) will be treated as inline styles and override any CSS.

In general, you'll want to be sure your SVG files have a "viewbox" attribute set for proper size scaling. This is usually exported with the SVG but if not, you can usually build a viewbox attribute using the width and height of the SVG (`viewbox="0 0 {width} {height}"`).

Icons are included in the DOM with an SVG and use element. If we added an icon called `icon-arrow.svg` to our sprite sheet, we could include it as follows:
```HTML
<svg class="icon icon-arrow">
    <use xlink:href="/images/icon-sprite.svg#icon-arrow" />
</svg>
```

As seen above, it can be beneficial to use a base `.icon` CSS class that will provide some default styles for all icons, like a reasonable size and standard icon color. Then icon-specific classes can be used to override properties as needed on a per icon basis. It's generally a good idea to include this class on your icons even if you don't need it initially, since you may want to make broad changes down the road.

CSS Tricks has [an article](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) outlining how to make a sprite sheet using Grunt, though there are similar approaches available with Gulp etc.

## Responsiveness
As the array of devices and resolutions connected to the web expand, it's no surprise that this is one of the first things we consider as designers and developers today. When writing CSS, you'll often start by designing things on mobile and then scale up to desktop sizes using [breakpoints](https://www.w3schools.com/css/css_rwd_mediaqueries.asp). Even though everything on the web has 100 ways to be done and is all debatable, [this article](https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862) does a pretty decent job summing up an approach to using breakpoints.

Think about which parts of your screen should be responsive vs. fixed width. For example, you may have a fixed-width sidebar with a responsive content section. Something to look out for in responsive text areas is that the length of the line is not too long, thus making it hard to read. Ideally there should be around 50-75 characters per line. If interested in this topic you can read more [here](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/).

Consider using [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), [CSS grids](http://learncssgrid.com/), percentage widths, or column frameworks (like [Bulma](https://bulma.io/documentation/columns/basics/), [Gumby](https://gumbyframework.com/docs/grid/), [Skeleton](http://getskeleton.com/), [pure CSS](https://purecss.io/grids/)... 800 new CSS frameworks come out every day so excuse me if these are dated at the time of reading) to achieve responsive design. Flexbox is especially great if your browser set supports it, [once you get the hang of it](http://flexboxfroggy.com/).

**Always do exploratory testing to check responsiveness when adding or updating items in the application regardless of whether you think they will be affected or not.**

You can test responsiveness by using various devices (see below) and making your browser window narrower/wider. Also consider checking various heights as you test responsiveness, especially if you have full or fixed height elements. In Chrome, you'll see your browser's window dimensions when the developer panel is open. Note that window dimensions are in CSS pixels, not your device's pixels.
 
## Cross-browser testing
Always check CSS changes in all supported browser and device combinations. This can be one of the most troublesome and annoying aspects of writing CSS, because sometimes different browsers interpret CSS rules differently. None-the-less, it is vital that you ensure your code works across all supported browsers. http://caniuse.com/ will also help you in determining cross-browser compatibility for CSS rules.

At the moment, typical browser support (and devices they are commonly used on) is as follows:
- Chrome (Current + last version)
  - Windows
  - OSX
  - Android
  - iOS
- Firefox (Current + last version)
  - Windows
  - OSX
  - Android
  - iOS
- Safari (Current + last version)
  - OSX
  - iOS
- IE11
  - Windows
- Microsoft Edge (Current + last version)
  - Windows

Of course, testing on real devices is preferable but not always possible. However, you can get simulations of many devices:
- [Virtual Box](https://www.virtualbox.org/wiki/Downloads) can run various operating systems
- [xCode](https://developer.apple.com/xcode/) can simulate iOS phones and tablets
- [Android Studio](https://developer.android.com/studio/index.html) can simulate android devices and tablets
- [Browser Stack](https://www.browserstack.com/) can simulate most everything
