/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { GithubLayout } from 'components/github-layout'
import { graphql } from 'gatsby'

export default ({pageContext, ...props}) =>{
    const {
        repoName,
        branchName,
        owner,
        commitSha,
        treeUrl,
        
    } = pageContext
    const {
        data: {
            github: {
                resource: {
                    tree: {
                        root
                    }
                }
            }
        }
    } = props
    return (
        <GithubLayout title={`${owner}/${repoName}:${branchName}`} backUrl={`/github/${owner}/${repoName}/${branchName}`} backText={`${repoName} - ${branchName}`}>
            <Flex>
                <Box>{commitSha}</Box>
            <Box>
                Files
                <pre>{JSON.stringify(root, null, 2)} </pre>
            </Box>
            </Flex>
        </GithubLayout>
    )
}

export const BlobFragment = graphql`
    fragment BlobFragment on Github_Blob {
        text
    }
`

export const query = graphql`
    query($commitUrl: Github_URI!) {
        github{
            resource(url: $commitUrl){
                ...on Github_Commit{
                    tree{
                        root: entries{
                            name
                            object {
                              ...on Github_Blob{
                                  text
                              }
                              ...on Github_Tree {
                                  entries {
                                      name
                                      object {
                                        ...on Github_Blob{
                                           text
                                        }
                                        ...on Github_Tree {
                                            entries{
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
`