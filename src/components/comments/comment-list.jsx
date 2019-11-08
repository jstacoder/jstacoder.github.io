/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { useContext } from 'react'
import formatRelative from 'date-fns/formatRelative'
import parse from 'date-fns/parse'

import { LightText, DarkText } from 'components/text'
import { CommentContext } from './comment-context'
import useThemeContext from '../../hooks/themeContext'


export const CommentList = () =>{
    const { comments } = useContext(CommentContext)
    const { theme } = useThemeContext()
    const formatDate = dateStr =>{
      const formatString = "EEE MMM dd yyyy HH:mm:ss 'GMT'xxxx '(Coordinated Universal Time)'"
      const parsedDate = dateStr instanceof Date ? dateStr : parse(dateStr, formatString, new Date)
      return formatRelative(parsedDate, new Date)
    }
    return (
            comments.filter(comment=> !!comment.text).map(comment=>{
                return (
                    <Box key={comment.text} sx={{py:2, px:1, mt: 2, border: `1px solid gray`}}>
                        <Flex sx={{justifyContent: 'space-between'}}>
                            <Flex sx={{flexDirection: 'column', flex: 1}}>
                                <LightText sx={{fontSize: 1}}>
                                  By: {comment.authorEmail}
                                </LightText>
                                <DarkText sx={{fontSize: 1}}>
                                  Added: {formatDate(comment.createdAt||new Date)}
                                </DarkText>
                            </Flex>
                            <Flex sx={{flex:3, alignItems:'flex-start'}}>
                              <Box sx={{
                                border: '1px solid gray',
                                borderRadius: '10px',
                                bg: theme.colors.lightBackground,
                                py: 3,
                                pl: 2,
                                width: '100%',
                              }}>
                                <LightText sx={{fontSize:2}}>
                                  {comment.text}
                                </LightText>
                              </Box>
                            </Flex>
                        </Flex>
                    </Box>
                )
            })
    )
}
