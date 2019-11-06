/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui' 
import { useEffect, useState, useContext } from 'react'
import { Text } from '@theme-ui/components'

import useThemeContext from '../../hooks/themeContext'
import { CommentContext } from './comment-context'


export const CommentList = () =>{
    const { theme } = useThemeContext()
    const { comments } = useContext(CommentContext)

    return (       
            comments.map(comment=>{
                return (
                    <Box sx={{py:3, px:2, mt: 2, border: `1px solid gray`}}>
                        <Flex sx={{justifyContent: 'space-between'}}>
                            <Flex sx={{flexDirection: 'column'}}>
                                <Text sx={{color: theme.colors.lightText, fontSize: 1}}>By: {comment.authorEmail}</Text> 
                                <Text sx={{color: theme.colors.darkText, fontSize: 1}}>On: {comment.date}</Text>
                            </Flex>
                            <Flex>
                                <Text sx={{color: theme.colors.lightText, fontSize:4}}>{comment.text}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                
            
                )
            })
    )
}