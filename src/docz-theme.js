import React from 'react'
import { BorderBox } from '@primer/components'
import { theme, ComponentsProvider } from 'docz'
import { components } from 'docz-theme-default'
const InlineCode = components.pre

const Code = props => (
  <BorderBox p={2} m={1}>
    xx
    <InlineCode {...props} />
  </BorderBox>
)

const map = {
  page: components.page,
  notFound: components.notFound,
  playground: components.playground,
  h1: components.h1,
  h2: components.h2,
  h3: components.h3,
  h4: components.h4,
  h5: components.h5,
  h6: components.h6,
  ul: components.ul,
  ol: components.ol,
  loading: components.loading,
  table: components.table,
  pre: Code,
  inlineCode: components.inlineCode,
  p: components.p,
  blockquote: components.blockquote,
}

const Theme = ({ children }) => (
  <ComponentsProvider components={map}>{children}</ComponentsProvider>
)

const themeConfig = {
  /* your theme config */
}
export default theme(themeConfig)(Theme)
