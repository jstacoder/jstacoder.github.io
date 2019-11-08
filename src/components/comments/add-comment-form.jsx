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
    Button,
  } from '@theme-ui/components'
import { useRef, useCallback, useEffect, useState, useContext } from 'react'
import useThemeContext from '../../hooks/themeContext'
import { request, GraphQLClient } from 'graphql-request'


import { CommentContext } from './comment-context'
import { RedText } from 'components/text'

export const AddCommentForm = props =>{
    const [submitted, setSubmitted] = useState(false)
    const [submittedText, setSubmittedText] = useState(null)
    const [submittedAuthor, setSubmittedAuthor] = useState(null)
    const [errorState, setErrorState] = useState({text: null, author: null})
    const client = new GraphQLClient('http://massive-comment-api.herokuapp.com/graphql/')
    const textRef = useRef()
    const authorRef = useRef()
    const { addComment, postId } = useContext(CommentContext)

    const setTextError = error =>{
      setErrorState(errorState=>({
          ...errorState,
          text: error,
      }))
    }
    const setAuthorError = error =>{
      setErrorState(errorState=>({
        ...errorState,
        author: error,
      }))
    }

    const resetErrors = () =>{
      setAuthorError(null)
      setTextError(null)
    }

    const formRefs = [textRef, authorRef]

    const q = `
        mutation($input: CommentInput!) {
            createComment(input: $input){
                id
                text
                createdAt
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
        resetErrors()
        const {
          target: {
            text: {
              value: textValue
            },
            author: {
              value: authorValue
            }
          }
        } = e
        if(!submitted && !!textValue  && !!authorValue){
          setSubmittedText(textValue)
          setSubmittedAuthor(authorValue)
          setSubmitted(true)
          clearInputs()
        }else{
          if(!textValue){
              setTextError('You must enter a comment')
          }
          if(!authorValue){
            setAuthorError('You must enter your email address')
          }
        }
    }, [submitted, submittedAuthor, submittedText])



    useEffect(()=>{
        const makeRequest = async ({text, authorEmail}) =>{
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
                <Input ref={authorRef} name='author' sx={{mb:3, border: errorState.author === null ? 'none' : `2px solid ${theme.colors.error}` }}/>
                {errorState.author !== null ? <RedText>{errorState.author}</RedText>: null}
                <Label sx={{color: theme.colors.lightText}} htmlFor='text'>Comment</Label>
                <Textarea ref={textRef} name='text' sx={{my:2, border: errorState.text === null ? 'none' : `2px solid ${theme.colors.error}` }}/>
                {errorState.text !== null ? <RedText>{errorState.text}</RedText>: null}
                <Button sx={{mt: 2}} theme={theme}>submit</Button>
          </Box>
      )
  }
