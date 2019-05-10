import React, { useState } from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'

import Layout from '../components/Layout'
import Icon from '../components/Icon'

export default props => {
  const [repoState, updateRepoState] = useState()
  const {
    pageContext: { repo },
  } = props
  return (
    <Layout location={props.location}>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">{repo.name}</h1>
              <p className="lead">{repo.description}</p>

              <Icon icon={faStar} text={repo.stargazers.totalCount} />
            </div>
          </div>
        </div>
      </header>
    </Layout>
  )
}
