import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export default function PageTemplate({
  data: {
    mdx: {
      frontmatter: { title },
      timeToRead,
      body,
    },
  },
  ...props
}) {
  return (
    <React.Fragment>
      <MDXRenderer {...props} title={title} timeToRead={timeToRead}>
        {body}
      </MDXRenderer>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      timeToRead
      body
    }
  }
`
