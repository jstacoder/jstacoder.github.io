import React, { useState } from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { graphql, Link } from 'gatsby'
import { Text, Link as PrimerLink } from '@primer/components'

import { GithubLayout } from '../components/github-layout'

import Icon from '../components/Icon'

import styled from 'styled-components'

const BranchLink = ({ branch, repo, owner }) => {
  return (
    <Text as="p">
      <PrimerLink to={`/github/${owner}/${repo}/${branch}`} as={Link}>
        {branch}
      </PrimerLink>
    </Text>
  )
}

// language=CSS
const Masthead = styled.header`
  height: 100vh;
  min-height: 500px;
  background-image: url('https://source.unsplash.com/BtbjCFUvBXs/1920x1080');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export default props => {
  const [repoState, updateRepoState] = useState()
  const {
    pageContext: { repo },
    data,
  } = props

  // console.log(JSON.stringify(data))
  return (
    <GithubLayout location={props.location}>
      <Masthead>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">{repo.name}</h1>
              <p className="lead">{repo.description}</p>

              <Icon icon={faStar} text={repo.stargazers.totalCount} />
              <div>
                {data.github.repository.refs.branches.map(({ name }) => (
                  <BranchLink
                    branch={name}
                    repo={repo.name}
                    owner={data.github.repository.owner.login}
                    key={name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Masthead>
    </GithubLayout>
  )
}
export const query = graphql`
  query githubRepoQuery($repoName: String!) {
    github {
      repository(name: $repoName, owner: "jstacoder") {
        owner {
          login
        }
        refs(refPrefix: "refs/heads/", first: 10) {
          branches: nodes {
            name
          }
        }
      }
    }
  }
`
