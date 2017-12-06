# InvoPlaybook

## Casual Development
For folks just wanting to make content additions or edits.

### Getting started

This project uses [Gatsby.js](https://github.com/gatsbyjs/gatsby). You'll need Node to work with Gatsby.

1. Check if you have node by running this command in your terminal:
    `node --version`
    - If you have Node installed, you should see a message like this:
    `v8.2.1`. In which case, you can move to the next step.
    - If not, you may see an error like: `command not found: node`. In which case you should install node using a tool like brew: `brew install node`.
2. Install Gatsby using Node's package manager, npm: `npm install -g gatsby-cli`.
3. Clone this repo: `git clone https://github.com/goinvo/InvoPlaybook.git`.
    - Or using ssh: `git clone git@github.com:goinvo/InvoPlaybook.git`.
4. Change into the project directory: `cd InvoPlaybook`.
5. Install project dependencies: `npm install`.

### Editing page content

1. Run the project from inside the project directory: `gatsby develop --host localhost`.
2. Observe the playbook on [localhost:8000](localhost:8000).
3. Edit applicable `.md` files in `src/pages/` directory.
    - Note: All subsections must be started by an h2 element (using ## in Markdown) in order to auto-populate the navigation menu.
    - When adding images, place your optimized image in the `static/images/` folder and then reference the file like so: `[add descriptive text of your image](/images/<my-image-file-name>.jpg)`
4. Observe the changes reflected automatically on localhost.
5. Commit and push the changes.

## Advanced Development
For folks adding or editing beyond just content.

As mentioned above, this project uses [Gatsby.js](https://github.com/gatsbyjs/gatsby). The [Gatsby.js website](https://www.gatsbyjs.org/) has robust documentation, tutorials, etc.

Gatsby uses [React](https://reactjs.org/) components to build static pages from your content/data.

### Developing and building

`gatsby develop --host localhost` will run the develop mode with hot module reloading and general live reload functions. I've found that the `--host localhost` has been required to get live reload working properly.

`gatsby build` will build the site and deposit in `public/` folder.

See also the [deployment](#deployment) section for continuous build/deployment details.


### Quick rundown of project structure

`gatsby-config.js`: This is a key file the Gatsby build process looks for, and contains a configuration object denoting which packages (plugins) Gatsby is to use in the build process. The Gatsby community has provided [many packages](https://github.com/gatsbyjs/gatsby/tree/master/packages) to cover a wide range of needs.

`gatsby-node.js`: This is another key file for Gatsby, which exports functions called in the normal Gatsby build lifecycle. Currently this file is used to create static pages and associated navigation data from all markdown files inside `src/pages/`.

`static/`: This directory houses static assets that are copied over to build directory, completely unaffected by Gatsby. (Thus you should optimize them yourself, etc.) Usually these are used for images in markdown files.

`data/`: This directory houses data used in the app. Currently just `nav-items.json` which is generated from `gatsby-node.js` processes.

`src/`: Source development files for the project.

`src/assets/`: Assets that are directly imported or called in javascript or SCSS files. Different than assets in the `static/` folder which are generally referenced in markdown files.

`src/components/`: Individual, reusable React components that are used to build the pages of the app.

`src/layouts/`: Houses the main layout component which serves sort of as the app wrapper for our purposes. This is where all the app state management is handled and child components are called.

`src/pages/`: Mostly markdown files corresponding to each route/page in the app. Pages are written using standard markdown syntax. Any h2 (##) in a markdown file will automatically be added as a subsection of the page in the navigation menu. Any new markdown files added will automatically become pages and sections in the navigation. Each markdown file requires frontmatter `title` and `order` to be set. The `title` is the title of the page and should roughly correspond with filename (where filename is separated by dashes). The filename is also used as the route for the page. The `order` property is used to determine the placement of the item in the navigation list. Note that there is no smart stuff going on here, so if you want to insert a page in the middle or top of a list, you must update all other page's `order` property. Also included here are simple Index and 404 pages (as React components). The Index page is currently configured to redirect (using Netlify) to `/foundation` route.

`src/scss/`: Styles for the site, broken out into component specific files, utilities, variables, and an Index file with imports and broad styles.

`src/templates/`: This contains the template for 'pages', a.k.a. the template that markdown file content is placed inside of. It is very simple for now just setting the page wrapper element and the h1.

`src/utils/`: Contains any utility files, for now just typography.js which helps generate consistent typography and spacing styles for text elements using a Gatsby package in `gatsby-config.js`.

### Adding packages
For now we've been using `npm` to add packages to the project. `npm install --save <package>`. From there you'll likely use `gatsby-config.js` to configure and use the package, or import it into your javascript files.

### Deployment
The site is currently deployed using Invo's Netlify account. Any push to branch `2.0` will trigger a build and automatically push to production if successful.
