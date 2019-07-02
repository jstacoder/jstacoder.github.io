import React, { useState } from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Icon from '../components/Icon'

import styled from 'styled-components'

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

  console.log(JSON.stringify(data))
  return (
    <Layout location={props.location}>
      <Masthead>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">{repo.name}</h1>
              <p className="lead">{repo.description}</p>

              <Icon icon={faStar} text={repo.stargazers.totalCount} />
            </div>
          </div>
        </div>
      </Masthead>
    </Layout>
  )
}

export const query = graphql`
  query repoQuery($repoName: String!) {
    github {
      repository(name: $repoName, owner: "jstacoder") {
        ref(qualifiedName: "master") {
          prefix

          target {
            ... on Github_Tree {
              entries {
                type
                object {
                  ... on Github_Commit {
                    history {
                      nodes {
                        tree {
                          entries {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            ... on Github_Commit {
              id
              history(first: 5) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  node {
                    messageHeadline
                    oid
                    message
                    additions
                    deletions
                    changedFiles
                    committedDate
                    tree {
                      entries {
                        name
                      }
                    }
                    author {
                      name
                      email
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
