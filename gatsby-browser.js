// @flow
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContextProvider, ThemeContext } from './src/theme-context'
import { 
  Tooltip as ToolTip, 
  StyledOcticon, 
  BaseStyles, 
  Text, 
  Heading, 
  Flex,
  Box, 
  BorderBox 
} from '@primer/components'
import { GitBranch, Star, Clippy } from '@primer/octicons-react'
import { useComponents, Playground, Props } from 'docz'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { utilities } from '@primer/components/css'
import styled, { createGlobalStyle } from 'styled-components'
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
      color: white;
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

const LiText = styled(Text).attrs({
  as: 'li'
})`
 &&& {
   font-family: 'Handlee', cursive;
 }
`

const StyledText = styled(Text)`
  font-family:  'Neucha', cursive;
  line-height: 1.3;
`

const StyledTable = styled.table`
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;
`

const FilenameBox = styled(Box)`
  margin-bottom: -7px;
  border-bottom: 1px solid snow;
  font-family: 'Lato', monospace, Sans-Serif;
`

const FontHeading = styled(Heading)`
  font-family: 'Lato', monospace, Sans-Serif;
`


const Blockquote = styled.blockquote`
  padding: 10px 30px 10px 30px;
  margin: 30px 0;
  border-radius: 3px;
  border-left: 4px solid ${p => p.theme.colors.danger};
  background: ${p => p.theme.colors.gray[2]};
  
  p{
    color: ${p => p.theme.colors.darkText};
    font-size: 18px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 22px;
    margin: 15px 0;
  }
  p {
    margin: 5px 0 10px;
  }
`


const CopyIcon = styled(StyledOcticon).attrs((props)=>({
  color: props.color,
  size: 25,
  mr: 3,
}))`
  cursor: pointer;
  padding: 2px;
  :hover {
    background-color: white;
    border-radius: 5px;
    color: ${props=> props.theme.colors.darkText};
  }
`

CopyIcon.propTypes = {
  color: PropTypes.String,
}

CopyIcon.defaultProps = {
  color: 'lightText'
}


const HeadingWrapper = props => <Box mb={3}><FontHeading {...props} /></Box>


const Table = ({ className, ...props }) => (
  <StyledTable className={`table table-bordered ${className}`} {...props} />
)

const getLive = children =>
  children && typeof children !== String ? children.props.live : false

const getChildren = children =>
  children && typeof children !== String ? children.props.children : children


const getFilename = children =>
  (children && typeof children !== String && children.props && children.props.filename) ? children.props.filename : 'no name'



const ClipBoardHelper = ({tooltipText, onClick, color, ...props}) =>{
  return (
    <ToolTip text={tooltipText}>
      <Box {...props} onClick={onClick} display={['none', 'none', 'none', 'block']}>
        <CopyIcon icon={Clippy} color={color} />
      </Box>
  </ToolTip>
  )
}


const Code = ({ children }) => {
  const [tooltipText, setTooltipText] = React.useState('Click to copy code')

  const toggleTootipText = () =>{
    setTooltipText('Code copied to clipboard')

    setTimeout(()=>{
      setTooltipText('Click to copy code')
    }, 5000)
  }

  const live = getLive(children)
  const filename = getFilename(children)
  const code = getChildren(children)


  const setClipboardText = text => {
    toggleTootipText()
    window && 
    window.navigator && 
    window.navigator.clipboard.writeText(text)
  }
  
  const onClickClipboard = e => {
    e.preventDefault()
    setClipboardText(code)
  }
  
  const Wrapper = filename !== 'no name' ?
    props =>
    {
      return (
        <Box>
        <FilenameBox
          bg='secondaryBackground'
          color='lightText'
          opacity='0.8' display={'flex'}
          pb={2} pt={2} pl={3}>
          <Text opacity='1' style={{flex: 1}}>
            {filename}
          </Text>
          <ClipBoardHelper tooltipText={tooltipText} onClick={onClickClipboard} />
        </FilenameBox>
        {props.children}
      </Box>
      )
    }:
    props =>
    {
      return (
        <Flex flexDirection='column'>
          <Flex mb={-40} alignSelf='flex-end'>
            <ClipBoardHelper tooltipText={tooltipText} color='black' onClick={onClickClipboard} opacity={0.8} />
          </Flex>
          {props.children}
        </Flex>
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
        fontSize={[4,3,2]}
        as={'p'}
        color={theme.fontColor}
        {...props}
      />
    ),
    h1: props => <HeadingWrapper pl={'15px'} as={'h1'} color={theme.fontColor} {...props} />,
    h2: props => <HeadingWrapper pl={'15px'} as={'h2'} color={theme.fontColor} {...props} />,
    h3: props => <HeadingWrapper pl={'15px'} as={'h3'} color={theme.fontColor} {...props} />,
    h4: props => <HeadingWrapper pl={'15px'} as={'h4'} color={theme.fontColor} {...props} />,
    h5: props => <HeadingWrapper pl={'15px'} as={'h5'} color={theme.fontColor} {...props} />,
    h6: props => <HeadingWrapper pl={'15px'} as={'h6'} color={theme.fontColor} {...props} />,
    li: props => <LiText fontSize={[4,3,2]} {...props} />,
    blockquote: Blockquote,
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
    <AuthContextProvider>
    <ThemeContextProvider>
      <Wrapper>
        <BaseStyles>
          <PrimerStyle />
          {element}
        </BaseStyles>
      </Wrapper>
    </ThemeContextProvider>
   </AuthContextProvider>
  )
}
