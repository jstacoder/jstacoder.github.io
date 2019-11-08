import React, { createContext, useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

export const CommentContext = createContext({
  comments: [],
  addComment: () => {},
  setPostId: () => {},
  postId: null,
})

export const CommentContextProvider = ({ postId: passedPostId, children }) => {
  const [postId, setPostId] = useState(passedPostId)
  const [comments, setComments] = useState([])

  const addComment = ({ text, id, authorEmail, date }) => {
    setComments(comments => [...comments, { id, text, authorEmail, date }])
  }
  const addComments = newComments => {
    setComments(comments => [...comments, ...newComments])
  }
  const query = `
    query commentQuery($postId: ID!){
        getComments(postId: $postId){
            id
            text
            createdAt
            authorEmail
        }
    }
    `
  useEffect(() => {
    const client = new GraphQLClient(
      'https://massive-comment-api.herokuapp.com/graphql/'
    )
    const makeRequest = async () => {
      client
        .request(query, { postId })
        .then(data => addComments(data.getComments))
    }
    makeRequest()
  }, [])
  const value = { comments, addComment, setPostId, postId }
  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  )
}
