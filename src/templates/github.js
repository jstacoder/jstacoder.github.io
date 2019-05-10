import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { faStar as star } from '@fortawesome/free-solid-svg-icons'
import Icon from 'components/Icon'
import Meta from 'components/Meta'
import Layout from 'components/Layout'

export default ({ pageContext, location, data }) => {
  return (
    <Layout location={location}>
      <Meta site={data.site.metadata} />
      <div className="container">
        <p>Repo Count: {pageContext.repositories.totalCount}</p>
        <p>
          Contributed to count:{' '}
          {pageContext.repositoriesContributedTo.totalCount}
        </p>
        <p>Repos:</p>
        <RepoList repos={pageContext.repositories.nodes} />
      </div>
    </Layout>
  )
}

class Stars extends Component {
  render() {
    return (
      <p>
        <Icon icon={star} />{' '}
        <span className="badge badge-danger">{this.props.starCount}</span>
      </p>
    )
  }
}

class Repo extends Component {
  render() {
    return (
      <div className="list-group-item">
        <p>{this.props.repo.name}</p>
        <Stars starCount={this.props.repo.stargazers.totalCount} />
      </div>
    )
  }
}

class RepoList extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.repos.map((repo, i) => (
          <Repo repo={repo} key={i} />
        ))}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
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
  }
`
