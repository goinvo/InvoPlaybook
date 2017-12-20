---
title: "Styling Guidelines"
order: 5
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
TODO
 
## Auto-prefixer
Usually you'll want to incorporate [autoprefixer](https://github.com/postcss/autoprefixer) into your build process, so you don't need to add browser prefixes to any of your CSS properties. Just write the plain property and the build process will output the correct prefixes in the compiled CSS. Browser prefixes are properties that start with:

```
-moz-     // Firefox and other browsers using Mozilla's browser engine
-webkit-  // Safari, Chrome and browsers using the Webkit engine
-o-       // Opera
-ms-      // Internet Explorer (but not always)
```
 
## Styling guidelines (or you could call them preferences)
[Here](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06) and [here](https://css-tricks.com/sass-style-guide/) are good places to familiarize yourself with some recommended practices when writing CSS. They may overlap and/or vary at points, but in general you can distill some core principles. At GoInvo, we generally follow something along these lines. If you're working in a codebase and see something that doesn't conform to the guidelines, and you have the availability, you should confer with your colleagues and consider refactoring. It's also important to understand that these guidelines are merely preferential choices made at the conception of a project. As with all code, it is open for adjustment and improvement over time, especially as new and better practices are introduced. In the time being, it is recommended to stick to these guidelines in order to maintain a consistent codebase. A couple important starters are as follows.
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

Bad:
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

Good:
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
 
### Modular CSS
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

This is the same approach Bootstrap uses (although the above example uses BEM syntax) to create modular CSS classes. When in doubt or if at all confused, use this methodology when making your CSS classes/components. When naming my component and sub classes, use a noun to represent the component, and adjectives to represent the subclasses or modifier. Noun: "tile", adjective: "featured". If there were a sub-component of tile, a noun-noun relationship could be used, like `tile__button`. The following will help with understanding the basics of thinking modularly with your CSS and naming:
- http://thesassway.com/advanced/modular-css-naming-conventions
- http://thesassway.com/advanced/modular-css-an-example

As additional reading resources on the subject, here are some of the top approaches being taken today for writing modular CSS.
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
TODO

- Optimize (Kraken, device size etc)
- Alt text
- ...
 
## Icons
TODO

Icons should be included in SVG format. As per the naming conventions, all icons are prefixed with `icon-`. The filename of the icon will also be the unique ID used to reference the icon from the sprite sheet, so be sure icon file names are unique. To update the icon sprite sheet, add your new icon file and then run "gulp icons" in the client directory. All icons in SFn are created exclusively from fills. It is possible to use strokes in icons as well, but may require some modifications to the build process and/or CSS styling. The existing icon build process handles most of the preparation for the icons in their current format, including stripping out the fill color (so it can be controlled by CSS). In general, you'll want to be sure your SVG files have a "viewbox" attribute set for proper size scaling. Any style attributes applied on your SVG (like stroke-width, stroke, fill, etc.) will be treated as inline styles and override any CSS.
Icons are included in the DOM with an svg and use element. If we added an icon called icon-example.svg to our sprite sheet, we could include it as follows:
```HTML
<svg class="icon icon-example">
    <use xlink:href="/images/icon-sprite.svg#icon-example" />
</svg>
```
The "icon" class will provide you some default styles for your icon, like a reasonable size and standard icon color. In general it's also a good idea to add a class specific to your icon like "icon-example", incase you need to make any CSS changes to all icons of that type now or in the future.

## Responsiveness
TODO

At the time of writing this, SFn is minimally responsive. The minimum supported width is 1024 pixels (technically the true coded value is a bit lower to accommodate the width of scrollbars in various browsers). The maximum width is 1200 pixels, in order to ensure content and sentences don't get so long that they are hard to read. Note that these values are measured in CSS pixels, so it does not necessarily correspond to device pixels. Generally the window size of a browser in CSS pixels can be found using the brower's developer tools.  When working with SFn elements, think about which parts should be responsive vs. fixed width. Consider using Bootstrap columns, flexbox, css grids, and percentage widths for responsive design. Always do exploratory testing to check responsiveness when adding or updating items in the application regardless of whether you think they will be affected or not.
 
## Cross-browser testing
TODO

SciFinder-n supports:
	•	Chrome (Windows/OSX/Android/iOS)
	•	Firefox (Windows/OSX/Android/iOS)
	•	Safari (OSX/iOS)
	•	IE11 (Windows)
	•	Microsoft Edge (Windows) 
Always check your changes in these browsers and on the tablets. The appropriate devices are supplied by CAS.  This can be one of the most troublesome and annoying aspects of writing CSS, because sometimes different browsers interpret rules differently. None-the-less, it is vital that you ensure your code works across all supported browsers. http://caniuse.com/ will also help you in determining cross-browser compatibility for CSS rules.
