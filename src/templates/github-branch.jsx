import React from 'react'
import { graphql } from 'gatsby'

import { GithubLayout } from '../components/github-layout'
import { CommitBlockList } from '../components/CommitBlock/commit-block-list.jsx'

export default props => {
    const branch = props.data.github.repository.ref
    const commit = branch.target 
    return(
        <GithubLayout 
            title={branch.name} 
            backUrl={`/github/${props.pageContext.repoName}`} 
            backText={props.pageContext.repoName}>                                
            <CommitBlockList commits={commit.history.commits}/>            
        </GithubLayout>
    )
}


export const query = graphql`
    query githubBranchQuery(
        $repoName: String! 
        $branchName: String!
        $owner: String!
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
                                }                            
                            }
                        }
                    }                
                }
            }       
        }
    }
`


