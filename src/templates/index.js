import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'

// noinspection NpmUsedModulesInstalled
import Post from 'templates/Post'
// noinspection NpmUsedModulesInstalled
import Meta from 'components/Meta'
// noinspection NpmUsedModulesInstalled
import Layout from 'components/Layout'
// noinspection NpmUsedModulesInstalled
import Page from 'templates/Page'

const Template = ({ data, location }) => (
  <div>
    <Layout location={location}>
      <Meta
        title={get(data, 'post.frontmatter.title')}
        site={get(data, 'site.meta')}
      />
      {get(data, 'post.frontmatter.layout') !== 'page' ? (
        <Post
          data={get(data, 'post')}
          options={{
            isIndex: false,
            adsense: get(data, 'site.meta.adsense'),
          }}
        />
      ) : (
        <Page {...this.props} />
      )}
    </Layout>
  </div>
)
export default Template

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
        author
        twitter
        adsense
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      tableOfContents(maxDepth: 6, pathToSlugField: "frontmatter.path")
      frontmatter {
        layout
        title
        path
        category
        tags
        description
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`
