import React, { useContext } from 'react'
import { Link } from 'gatsby'
import Flex, { FlexItem } from 'styled-flex-component'
import { mb } from 'styled-components-spacing'
import styled from 'styled-components'
import { ThemeContext } from '../theme-context'

export function formatePostDate(dateString) {
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-GB', {
    month: 'short',
  })} ${date.toLocaleDateString('en-GB', {
    day: 'numeric',
  })}, ${date.toLocaleDateString('en-GB', { year: 'numeric' })}`
}

const FlexMb = styled(Flex)`
  ${mb(1)};
`

const SmallH1 = styled.h1`
  font-size: 16px;
  line-height: 1.5px;
  ${mb(1)};
`

const GrayText = styled.div`
  ${mb(2)};
  white-space: normal;
  color: ${({ theme }) => theme.colors.grey};
`

const RoundDiv = styled.div`
  height: 100%;
  text-align: left;
  ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;
  border-radius: 3px;
`

function PostCard({ post }) {
  const {
    state: { style, theme },
  } = useContext(ThemeContext)
  return (
    <RoundDiv theme={theme}>
      <FlexMb justifyBetween itemsStart>
        <SmallH1>
          <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
        </SmallH1>
      </FlexMb>
      <GrayText theme={theme}>{`${''}`}</GrayText>
    </RoundDiv>
  )
}

export default PostCard
