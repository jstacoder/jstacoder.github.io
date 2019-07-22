import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

export default function PageTemplate({
  data: {
    mdx: {
      frontmatter: { title },
      timeToRead,
      code: { body },
    },
  },
  ...props
}) {
  return (
    <div>
      <MDXRenderer {...props} title={title} timeToRead={timeToRead}>
        {body}
      </MDXRenderer>
    </div>
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
      code {
        body
      }
    }
  }
`
