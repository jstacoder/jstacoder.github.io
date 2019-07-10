import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box, Heading, BorderBox } from '@primer/components'

import useThemeContext from '../hooks/themeContext'


export function formatePostDate(dateString) {
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
  })} ${date.toLocaleDateString('en-US', {
    day: 'numeric',
  })}, ${date.toLocaleDateString('en-US', { year: 'numeric' })}`
}

const SmallH1 = styled(Heading).attrs({as: 'h1', mb: 1})`
  font-size: 16px;
  line-height: 1.5px;
  white-space: nowrap;
`

const GrayText = styled(Box).attrs({mb:2, color: 'gray.3'})`
  white-space: normal;
`

const RoundDiv = styled(BorderBox).attrs(
  {
    height: '100%',
    textAlign: 'left',
    border: 1,
    bg: 'white',
    p: 3,
    minWidth: '250px',
  })({})

function PostCard({ post }) {
  const { theme } = useThemeContext()
  return (
    <RoundDiv theme={theme}>
      <Flex mb={1} justifyContent={'space-between'} alignItems={'flex-start'}>
        <SmallH1>
          <Link to={post.fields.slug}>
            {post.frontmatter.title || post.frontmatter.name}
          </Link>
        </SmallH1>
      </Flex>
      <GrayText>
        {`${''}`}
      </GrayText>
    </RoundDiv>
  )
}

export default PostCard
