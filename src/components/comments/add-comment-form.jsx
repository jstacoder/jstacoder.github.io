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
import useThemeContext from '../../hooks/themeContext'
import { request, GraphQLClient } from 'graphql-request'


import { CommentContext } from './comment-context'

export const AddCommentForm = props =>{
    const [submitted, setSubmitted] = useState(false)
    const [submittedText, setSubmittedText] = useState(null)
    const [submittedAuthor, setSubmittedAuthor] = useState(null)
    const client = new GraphQLClient('http://massive-comment-api.herokuapp.com/graphql/')
    const textRef = useRef()
    const authorRef = useRef()
    const { addComment, postId } = useContext(CommentContext)
    
    const formRefs = [textRef, authorRef]

    const q = `
        mutation($input: CommentInput!) {
            createComment(input: $input){
                id
                text
                date
                authorEmail
            }
        }
    `
    
    const clearInputs = () =>{
        formRefs.forEach(ref=>{
            if(ref.current){
                ref.current.value = ''
            }
        })
    }

    const submit = useCallback(e =>{
        e.preventDefault()
        if(!submitted){
          setSubmittedText(e.target.text.value)
          setSubmittedAuthor(e.target.author.value)
          setSubmitted(true)
          clearInputs()
        }
    }, [submitted, submittedAuthor, submittedText])

    
          
    useEffect(()=>{
        const makeRequest = async ({text, authorEmail}) =>{
            console.log(q)
            try{             
                const res = await client.request(q, 
                    {
                        input: {
                            text, 
                            authorEmail, 
                            postId 
                        }
                    }
                )
                if(res){
                    console.log('RES:-=-=>: ',res)
                    addComment({
                        ...res.createComment
                    })                                            
                    setSubmitted(false)
                }
            }catch(err){
                console.log(err)
            }
        }
        if(submitted){            
            makeRequest({text: submittedText, authorEmail: submittedAuthor})
        }
    }, [submitted])

      const { theme } = useThemeContext()

      return (
          <Box as="form" onSubmit={submit} sx={{p: 3, border: `1px solid ${theme.colors.darkText}`}}>
                <Label theme={theme} sx={{color: theme.colors.lightText}} htmlFor='author'>Email</Label>
                <Input ref={authorRef} name='author' mb={3}/>
                <Label sx={{color: theme.colors.lightText}} htmlFor='text'>Comment</Label>
                <Textarea ref={textRef} name='text' mt={2}/>
                <button>submit</button>
          </Box>
      )
  }
