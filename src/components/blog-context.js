import React, { createContext, useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

export const BlogContext = createContext({ blogs: [], addBlog: () => {} })

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [res, setRes] = useState(null)
  const addBlog = name => {
    setBlogs(blogs => {
      return [...blogs, { name }]
    })
  }
  const addBlogs = newBlogs => {
    setBlogs(blogs => {
      return [...blogs, ...newBlogs]
    })
  }
  const query = `
    query{
        getBlogs{
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
      client.request(query).then(data => addBlogs(data.getBlogs))
    }
    makeRequest()
  }, [])
  const value = { blogs, addBlog }
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}
