import React, { Component } from 'react'
import { faStar as star } from '@fortawesome/free-solid-svg-icons'
import Icon from 'components/Icon'

export default ({ pageContext }) => {
  return (
    <div className="container">
      <p>Repo Count: {pageContext.repositories.totalCount}</p>
      <p>
        Contributed to count: {pageContext.repositoriesContributedTo.totalCount}
      </p>
      <p>Repos:</p>
      <RepoList repos={pageContext.repositories.nodes} />
    </div>
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
