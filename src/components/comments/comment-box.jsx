/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui' 
import { useEffect, useState, useContext } from 'react'
import { Text } from '@theme-ui/components'

import useThemeContext from '../../hooks/themeContext'
import { CommentContextProvider } from './comment-context'
import { CommentList } from './comment-list'
import { AddCommentForm } from './add-comment-form'


export const CommentBlock = ({postId}) =>{
    const { theme } = useThemeContext()    

    return (
        <CommentContextProvider postId={postId}>
            <Box sx={{border: 0, borderLeft: 0, borderRight: 0}}>
                <Box sx={{
                    p:3, 
                    borderBottom: '1px solid white', 
                    color: theme.colors.darkText,
                    fontSize: 4,
                }}>
                    Comments
                </Box>
                <AddCommentForm/>
                <CommentList/>
            </Box>
        </CommentContextProvider>
    )
}