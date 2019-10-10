import React from 'react'
import { graphql } from 'gatsby'

import { GithubLayout } from '../components/github-layout'
import { CommitBlockList } from '../components/CommitBlock/commit-block-list.jsx'

export default props => {
    const branch = props.data.github.repository.ref
    const commit = branch.target

    console.log(commit.history.commits)
    return(
        <GithubLayout
            title={branch.name}
            backUrl={`/github/${props.pageContext.owner}/${props.pageContext.repoName}`}
            backText={props.pageContext.repoName}>
            <CommitBlockList 
                owner={props.pageContext.owner}
                repo={props.pageContext.repoName} 
                branch={branch.name} 
                commits={commit.history.commits}
            />
        </GithubLayout>
    )
}


export const query = graphql`
    query githubBranchQuery(
        $repoName: String! 
        $branchName: String!
        $owner: String!
        $ownerIsViewer: Boolean!
    ){
        github{
            repository(
                name: $repoName 
                owner: $owner
            ){
                ref(qualifiedName: $branchName){
                    name
                    target {                        
                        ...on Github_Commit {
                            
                            committedDate
                            oid                            
                            message
                            commitUrl
                            changedFiles
                            additions
                            deletions
                            history(
                                first: 10                               
                            ){
                                commits: nodes{
                                    message
                                    authoredDate
                                    committedDate         
                                    author{
                                        avatarUrl                                    
                                        user{
                                            userName: login
                                            userLink: url                                        
                                        }
                                    }
                                    treeUrl
                                    commitUrl
                                    commitSha: oid           
                                    tree @include(if: $ownerIsViewer){
                                        entries {
                                          name
                                          object {
                                            ...on Github_Tree {
                                              entries {
                                                name
                                                object{
                                                  ...on Github_Tree {
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
                                }                            
                            }
                        }
                    }                
                }
            }       
        }
    }
`


