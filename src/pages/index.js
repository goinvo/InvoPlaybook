import React from 'react'
import Link from 'gatsby-link'

export default ({ data }) => {
  return (
    <div>
      <h1>Index</h1>
      <p>Still working on this... Ideally index page should just redirect to Foundation, me thinks.</p>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) =>
          <li key={node.id}>
            <Link to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___order], order: ASC})  {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            order
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
