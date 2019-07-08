// @flow
import React, { useContext } from 'react'
import { ThemeContextProvider, ThemeContext } from './src/theme-context'
import { BaseStyles, Text, Heading, Box, BorderBox } from '@primer/components'
import { GitBranch, Star } from '@primer/octicons-react'
import { useComponents, Playground, Props } from 'docz'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { utilities } from '@primer/components/css'
import styled, { createGlobalStyle } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { Alert } from './src/components/alert/alert'
import { BlocksProvider } from 'mdx-blocks'
import { future } from 'mdx-blocks/themes'

const Ol = styled.ol`
  color: ${props => props.color};
  list-style-type: none;
  & li {
    font-family: cursive;
    ::before {
      content: '-- ';
      font-weight: bold;
      font-size: 0.5em;
      margin-right: 5px;
    }
  }
  margin-left: 15px;
`

const Ul = styled.ul`
  color: ${props => props.color};
  list-style-type: none;
  & li {
    font-family: cursive;
    ::before {
      content: '● ';
      color: gray;
      font-weight: bold;
      font-size: 1.5em;
      margin-right: 5px;
    }
  }
  margin-left: 15px;
`

const StyledTable = styled.table`
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;
`

const Table = ({ className, ...props }) => (
  <StyledTable className={`table table-bordered ${className}`} {...props} />
)

const getLive = children =>
  children && typeof children !== String ? children.props.live : false

const getChildren = children =>
  children && typeof children !== String ? children.props.children : children
const Code = ({ children, className, ...props }) => {
  const live = getLive(children)
  console.log(live)

  // const language = className.replace(/language-/, '')
  const code = getChildren(children)
  if (live) {
    const scope = {
      Alert,
      GitBranch,
      Star,
    }
    return (
      <BorderBox m={3} mb={4} p={2} borderWidth={2}>
        <LiveProvider code={code} scope={scope}>
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </BorderBox>
    )
  }
  return (
    <Highlight {...defaultProps} code={code} language={'js'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const Wrapper = ({ children }) => {
  const {
    state: { theme, style },
  } = useContext(ThemeContext)
  const components = {
    props: Props,
    playground: Playground,
    pre: props => {
      console.log(props)
      return <Code {...props} />
    },
    ul: props => <Ul {...props} color={theme.fontColor} />,
    ol: props => <Ol {...props} color={theme.fontColor} />,
    table: Table,
    p: props => (
      <Text
        fontFamily={'cursive'}
        as={'p'}
        color={theme.fontColor}
        {...props}
      />
    ),
    h1: props => <Heading as={'h1'} color={theme.fontColor} {...props} />,
    h2: props => <Heading as={'h2'} color={theme.fontColor} {...props} />,
    h3: props => <Heading as={'h3'} color={theme.fontColor} {...props} />,
    h4: props => <Heading as={'h4'} color={theme.fontColor} {...props} />,
    h5: props => <Heading as={'h5'} color={theme.fontColor} {...props} />,
    h6: props => <Heading as={'h6'} color={theme.fontColor} {...props} />,
  }

  return (
    <BlocksProvider {...future} components={components} theme={theme}>
      {children}
    </BlocksProvider>
  )
}

export const wrapRootElement = ({ element }) => {
  const PrimerStyle = createGlobalStyle`${utilities}`
  return (
    <ThemeContextProvider>
      <Wrapper>
        <BaseStyles>
          <PrimerStyle />
          {element}
        </BaseStyles>
      </Wrapper>
    </ThemeContextProvider>
  )
}
