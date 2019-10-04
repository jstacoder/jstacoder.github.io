import React from 'react'
import { Box } from '@primer/components'
import useSiteMetadata from '../hooks/siteMetaData'

export const HomePageWrapper = ({ children }) => {
  const { layout } = useSiteMetadata()
  const layoutIsStacked = layout === 'stacked'
  const Wrapper = ({ children: innerChildren }) =>
    layoutIsStacked ? (
      <Box my={6}>{innerChildren}</Box>
    ) : (
      <Box mx={'auto'} maxWidth={900}>
        {innerChildren}
      </Box>
    )
  return layoutIsStacked ? (
    <>
      {React.Children.toArray(children).map(child => (
        <Wrapper key={child.displayName}>{child}</Wrapper>
      ))}
    </>
  ) : (
    <Wrapper>{children}</Wrapper>
  )
}
