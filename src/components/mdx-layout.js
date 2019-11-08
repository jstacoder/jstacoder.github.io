import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import { componentsMap } from '../../gatsby-browser'
import { GithubLayout } from './github-layout'

export default function PageTemplate({
  data: {
    mdx: {
      frontmatter: { title, commentApiId },
      timeToRead,
      body,
    },
  },
  ...props
}) {
  return (
    <MDXRenderer
      {...props}
      title={title}
      timeToRead={timeToRead}
      components={componentsMap}
      commentApiId={commentApiId}
    >
      {body}
    </MDXRenderer>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        commentApiId
      }
      timeToRead
      body
    }
  }
`
