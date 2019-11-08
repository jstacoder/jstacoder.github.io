import React, { createContext, useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

export const PostContext = createContext({
  posts: [],
  addPost: () => {},
  setBlogId: () => {},
  blogId: null,
})

export const PostProvider = ({ blogId: passedBlogId, children }) => {
  const [blogId, setBlogId] = useState(passedBlogId)
  const [posts, setPosts] = useState([])

  const addPost = ({ name, id }) => {
    setPosts(posts => {
      return [...posts, { id, name }]
    })
  }
  const addPosts = newPosts => {
    setPosts(posts => {
      return [...posts, ...newPosts]
    })
  }
  const query = `
    query postQuery($blogId: ID!){
        getPosts(blogId: $blogId){
            id
            name            
        }
    }
    `
  useEffect(() => {
    const client = new GraphQLClient(
      'http://massive-comment-api.herokuapp.com/graphql/'
    )
    const makeRequest = async () => {
      client.request(query, { blogId }).then(data => addPosts(data.getPosts))
    }
    makeRequest()
  }, [])
  const value = { posts, addPost, setBlogId, blogId }
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
