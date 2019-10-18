/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Playground, Props } from 'docz'
import Wrapper from 'components/wrapper'
import * as components from 'components/ui'
import baseComponents from 'gatsby-theme-docz/src/components'

export default {
  ...baseComponents,
  wrapper: Wrapper,
  // props: Props,
  // Props,
  // playground: Playground,
  // Playground,
  pre: components.Code,
  ul: components.Ul,
  ol: components.Ol,
  table: components.Table,
  p: components.P,
  h1: components.H1,
  h2: components.H2,
  h3: components.H3,
  h4: components.H4,
  h5: components.H5,
  h6: components.H6,
  li: components.Li,
  blockquote: components.Blockquote,
  PhotoCredit: components.PhotoCredit,
}
