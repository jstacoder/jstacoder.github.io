/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

import { useEffect, useState, useCallback, useContext } from 'react'
import { Heading, Text, Card } from '@theme-ui/components'
import { Link } from 'gatsby'

import { BlogContext } from './blog-context'
import useThemeContext from '../hooks/themeContext'


export const BlogList = ({rerender})=>{
    const { theme } = useThemeContext()
    const { blogs } = useContext(BlogContext)
    
    return (!!blogs && !!blogs.length ? blogs : []).map(
        blog=>(
            <Box sx={{
                mx: 'auto',
                borderBottom:'1px solid gray', 
                maxWidth: '50%',
                py: 3,
                pl: 3,
                ':hover': {
                    cursor: 'pointer',
                    bg: 'white',
                    a: {
                        color: theme.colors.darkText
                    }
                    
                }
            }}><Text as={Link} to={`/blog/${blog.name}/posts/`} sx={{
                color: theme.colors.lightText,                
            }}>{blog.name}</Text></Box>
        )
    )
}
