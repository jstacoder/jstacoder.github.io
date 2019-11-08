import { GraphQLClient } from 'graphql-request'

const getClient = () =>
  new GraphQLClient('https://massive-comment-api.herokuapp.com/graphql', {
    // credentials: 'include',
    // mode: 'no-cors'
  })

const commentQuery = `
query getCommentQuery($postId: ID){
    getComments(postId: $postId){
        id
        text
        createdAt
        authorEmail
    }
}
`

export const getComments = async postId => {
  return getClient().request(commentQuery, { postId })
}
