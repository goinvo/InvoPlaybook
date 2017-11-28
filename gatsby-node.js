const fs = require(`fs`)
const path = require(`path`)
const slugs = require(`github-slugger`)()
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: {fields: [frontmatter___order], order: ASC}) {
          edges {
            node {
              headings {
                value
                depth
              }
              frontmatter {
                title
                order
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      // Initialize empty sidebar data array
      const sidebarData = []

      // Reset slugger just incase
      slugs.reset()

      // For each markdown page
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        // Check if there are subsections (h2) on this page
        let subsections = node.headings.filter(heading => heading.depth === 2)

        // Add correct 'slug' to subsection object
        // (slug should be the same as gatsby-remark-autolink-headers package,
        // which uses github-slugger)
        // Also remove 'depth' as it's no longer needed
        subsections.forEach(function(sub) {
          sub.slug = slugs.slug(sub.value);
          delete sub['depth'];
        })

        // Add new top-level sidebar section to sidebar data
        // including any subsections found
        sidebarData.push({
          title: node.frontmatter.title,
          slug: node.fields.slug,
          subsections: subsections
        })

        // Create a real page from markdown passed into page JS template
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })

      // Write the resulting sidebarData to the filesystem
      const sidebarJson = JSON.stringify(sidebarData)
      fs.writeFile('data/nav-items.json', sidebarJson, 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log('Successfully wrote navigation data to data/nav-items.json')
        }
      })

      resolve()
    })
  })
}
