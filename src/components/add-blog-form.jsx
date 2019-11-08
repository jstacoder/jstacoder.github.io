/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Slider,
  } from '@theme-ui/components'
import { useRef, useCallback, useEffect, useState, useContext } from 'react'
import useThemeContext from '../hooks/themeContext'
import { request, GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'


import { BlogContext } from './blog-context'

export const AddBlogForm = props =>{
    const [submitted, setSubmitted] = useState(false)
    const [submittedName, setSubmittedName] = useState(null)
    const client = new GraphQLClient('http://massive-comment-api.herokuapp.com/graphql/')
    const nameRef = useRef()
    const { addBlog } = useContext(BlogContext)
    
    const q = `
        mutation($input: BlogInput!) {
            createBlog(input: $input){
                id
                name
            }
        }
    `
    
    const clearInput = () =>{
        if(nameRef.current){
             nameRef.current.value = ''
        }
    }

    const submit = useCallback(e =>{
        e.preventDefault()
        if(!submitted){
          setSubmitted(true)
          setSubmittedName(e.target.name.value)
          clearInput()
        }
    }, [submitted, submittedName])

    
          
    useEffect(()=>{
        const makeRequest = name =>{
            console.log(q)
            try{
             
                const res = client.request(q, {input: {name: submittedName}}).catch(err=> console.log(err)).then(res=>{
                    addBlog(submittedName)
                })                        
                setSubmitted(false)
            }catch(err){
                console.log(err)
            }
        }
        if(submitted){            
            makeRequest(submittedName)
        }
    }, [submitted, submittedName])

      const { theme } = useThemeContext()

      return (
          <Box as="form" onSubmit={submit}>
              <Label theme={theme} sx={{color: theme.colors.lightText}} htmlFor='name'>Name</Label>
              <Input ref={nameRef} name='name' mb={3}/>
              <button>submit</button>
          </Box>
      )
  }
