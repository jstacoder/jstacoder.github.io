import React from 'react'
import { graphql } from 'gatsby'

export default props => {
    const branch = props.data.github.repository.ref
    const commit = branch.target 
    return(
         <div>
            
            <p>
                {branch.name}                
            </p>
            <ul>
                {commit.history.commits.map(commit=>(
                    <li>
                        <p>{commit.message}</p>
                        <p>{commit.committedDate}</p>
                        <p><a href={commit.commitUrl}>{commit.oid}</a></p>
                        <p>changes: {commit.changedFiles}</p>
                        <p>ADDITIONS: {commit.additions}</p>
                        <p>DELETIONS: {commit.deletions}</p>
                    </li>
                ))}
            </ul>
        </div>
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
                            history(first: 10){
                                commits: nodes{
                                    message
                                    oid
                                    committedDate
                                    commitUrl                                        
                                    changedFiles
                                    additions
                                    deletions
                                }                            
                            }
                        }
                    }                
                }
            }       
        }
    }
`


