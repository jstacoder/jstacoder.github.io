import { GraphQLClient } from 'graphql-request'

const getClient = () =>
  new GraphQLClient('http://massive-comment-api.herokuapp.com/graphql', {
    // credentials: 'include',
    // mode: 'no-cors'
  })

const commentQuery = `
query getCommentQuery($postId: ID){
    getComments(postId: $postId){
        id
        text
        date
        authorEmail
    }
}
`

export const getComments = async postId => {
  return getClient().request(commentQuery, { postId })
}
