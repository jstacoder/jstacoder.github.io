/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { useEffect, useState, useCallback, useContext } from 'react'
import { Heading, Text, Card } from '@theme-ui/components'
import { GraphQLClient, request } from 'graphql-request'

import { PostContext } from './post-context'
import useThemeContext from '../hooks/themeContext'


export const PostList = ({rerender})=>{
    const { theme } = useThemeContext()
    const { posts } = useContext(PostContext)
    return (!!posts && !!posts.length ? posts : []).map(post=><Box><Text sx={{color: theme.colors.darkText}}>{post.name} {`==>`} {post.id}</Text></Box>)
}
