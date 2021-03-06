import React from 'react'
import { Link } from 'docz'
import styled from 'styled-components'
import { Flex, Box, Heading, BorderBox } from '@primer/components'

import useThemeContext from '../hooks/themeContext'
import { HoverBlock } from './hover-block'

export function formatePostDate(dateString) {
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
  })} ${date.toLocaleDateString('en-US', {
    day: 'numeric',
  })}, ${date.toLocaleDateString('en-US', { year: 'numeric' })}`
}

const SmallH1 = styled(Heading).attrs({ as: 'h1', mb: 1 })`
  font-size: 16px;
  line-height: 1.5px;
  white-space: nowrap;
`

const GrayText = styled(Box).attrs({ mb: 2, color: 'gray.3' })`
  white-space: normal;
`

const RoundDiv = styled(BorderBox).attrs({
  height: '100%',
  textAlign: 'left',
  border: 1,
  bg: 'white',
  p: 3,
  minWidth: '250px',
})({})

function PostCard({ post, isProduction }) {
  const { theme } = useThemeContext()
  return (
    <Link to={post.fields.slug}>
      <HoverBlock sx={{ minWidth: '240px' }}>
        <Flex mb={1} justifyContent={'space-between'} alignItems={'flex-start'}>
          <SmallH1>{post.frontmatter.title || post.frontmatter.name}</SmallH1>
        </Flex>
        {!isProduction ? (
          <GrayText>{post.frontmatter.draft ? 'draft' : 'published'}</GrayText>
        ) : null}
      </HoverBlock>
    </Link>
  )
}

export default PostCard
