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
import { AuthContextProvider } from './src/hooks/authContext'

import { Alert } from './src/components/alert/alert'
import { BlocksProvider } from 'mdx-blocks'
import { future } from 'mdx-blocks/themes'

const Ol = styled.ol`
  color: ${props => props.color};
  list-style-type: none;
  & li {
    max-width: 80%;
    font-family: 'Handlee', cursive;
    ::before {
      content: '-- ';
      font-weight: bold;
      font-size: 0.5em;
      margin-right: 5px;
    }
  }
  margin-left: 5px;
`

const Ul = styled.ul`
  color: ${props => props.color};
  list-style-type: none;
  & li {
    font-family: 'Handlee', cursive;
    max-width: 80%;
    ::before {
      content: '● ';
      color: gray;
      font-weight: bold;
      font-size: 1.5em;
      margin-right: 5px;
    }
  }
  margin-left: 5px;
`


const StyledText = styled(Text)`
  font-family:  'Neucha', cursive;
  line-height: 1.3;
  font-size: 18px;
`

const StyledTable = styled.table`
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;
`

const FilenameBox = styled(Box)`
  margin-bottom: -7px;
`

const Table = ({ className, ...props }) => (
  <StyledTable className={`table table-bordered ${className}`} {...props} />
)

const getLive = children =>
  children && typeof children !== String ? children.props.live : false

const getChildren = children =>
  children && typeof children !== String ? children.props.children : children


const getFilename = children =>
  (children && typeof children !== String && children.props && children.props.filename) ? children.props.filename : 'no name'

const Code = ({ children }) => {
  const live = getLive(children)
  const filename = getFilename(children)
  const code = getChildren(children)
  
  const Wrapper = filename !== 'no name' ?
    props =>
    {
      return (
        <Box ml={'-5px'}>
        <FilenameBox
          bg='secondaryBackground'
          color='lightText'
          opacity='0.8'
          pb={2} pt={2} pl={3} ml={[null, null, 1]}>
          <Text opacity='1'>
            {filename}
          </Text>
        </FilenameBox>
        {props.children}
      </Box>
      )
    }:
    props =>
    {
      return (
        <Box ml={'-5px'}>
          {props.children}
        </Box>
      )
    }
  
  const className = typeof children !== String && children.props ? children.props.className : ''

  const language = className.replace(/language-/, '')
  const scope = {
    Alert,
    GitBranch,
    Star,
  }
  return live ?  (
    <Wrapper>
      <BorderBox
        border={0}
        mt={3} mb={3} p={2}
        borderTop={1} borderBottom={1}
        borderRight={0} borderLeft={0}
        borderRadius={0}
        bg='lightBackground'
      >
        <LiveProvider code={code} scope={scope}>
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </BorderBox>
   </Wrapper>
  ) : (
    <Wrapper>
      <Highlight {...defaultProps} code={code} language={language}>
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
    </Wrapper>
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
      <StyledText
        as={'p'}
        color={theme.fontColor}
        {...props}
      />
    ),
    h1: props => <Heading pl={'15px'} as={'h1'} color={theme.fontColor} {...props} />,
    h2: props => <Heading pl={'15px'} as={'h2'} color={theme.fontColor} {...props} />,
    h3: props => <Heading pl={'15px'} as={'h3'} color={theme.fontColor} {...props} />,
    h4: props => <Heading pl={'15px'} as={'h4'} color={theme.fontColor} {...props} />,
    h5: props => <Heading pl={'15px'} as={'h5'} color={theme.fontColor} {...props} />,
    h6: props => <Heading pl={'15px'} as={'h6'} color={theme.fontColor} {...props} />,
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
