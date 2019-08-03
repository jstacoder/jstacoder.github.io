import React, {useState, useMemo, useCallback } from 'react'
import {BorderBox, Box, Flex, Text} from '@primer/components'
import { GitBranch, Star } from '@primer/octicons-react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { typography } from '@styled-system/typography'
import styled from 'styled-components'
// import Prisim from 'prism-react-renderer/prism'

import { Alert } from '../alert/alert'
import ClipBoardHelper from './click-to-copy/clipboard-helper'
import {FilenameBox} from '../shared/filename-box'
import {LiveError, LivePreview, LiveProvider} from 'react-live'

import { LiveEditor as BaseEditor } from './editor'
import 'brace/theme/monokai'

import { Center, SpaceBetween, SpaceAround, SpaceEvenly, FlexStart, FlexEnd, BlockGroup, FlexBlock } from '../flex-docs/justify-content.jsx'
import FlexComponent from '../flex'
import Slider from '../slider'


const LiveEditor = styled(BaseEditor)`
  ${typography}
`

const GithubTheme = () =>({
  plain: {
    color: "#393A34",
    backgroundColor: "#f6f8fa"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#999988",
        fontStyle: "italic"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#e3116c"
      }
    },
      {
      types: ["punctuation", "operator"],
      style: {
        color: "#393A34"
      }
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted"
      ],
      style: {
        color: "#36acaa"
      }
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db"
      }
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d73a49"
      }
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6f42c1"
      }
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#00009f"
      }
    }
  ]
})



const getLive = children =>
  children && typeof children !== String ? children.props.live : false

const getChildren = children =>
  children && typeof children !== String ? React.Children.toArray(children.props.children).join('\n') :
    children

const getFilename = children =>
  (children && typeof children !== String && children.props && children.props.filename) 
  ? children.props.filename : undefined

const getClassName = children =>
  (children && typeof children !== String && children.props) ? children.props.className : ''


const CodeWrapper = ({children, filename, code}) =>{
  return filename  !== undefined ? (
    <Box mt={3}>
      <FilenameBox
        bg='secondaryBackground'
        color='lightText'
        opacity='0.8'
        display='flex'
        pb={2} pt={2} pl={3}>
        <Text
          opacity='1'
          style={{flex: 1}}>
          {filename}
        </Text>
        <ClipBoardHelper copyText={code} />
      </FilenameBox>
      {children}
    </Box>
  ) : (
    <Flex mt={3} flexDirection='column'>
      <Flex mb={[null,null,null,-40]} alignSelf={'flex-end'}>
        <ClipBoardHelper copyText={code} opacity={'0.8'} color={'black'} />
      </Flex>
      {children}
    </Flex>
  )
}


export const Code = ({children, onChange}) =>{
  const liveEditorRequested = getLive(children)
  const filename = getFilename(children)

  const initialCode = React.useMemo(()=> getChildren(children), [children])

  const [code, setCode] = React.useState(initialCode)

  // const code = getChildren(children)
  const codeClassName = getClassName(children)
  
  const handleChange = useCallback((code)=>{
      console.log('changing',code)
        onChange && onChange(code)
        setCode(code)
  },[code])
  
  console.log(code, filename, liveEditorRequested)
  
  const language = codeClassName.replace(/language-/, '')
  
  const scope = {
    Alert,
    GitBranch,
    FlexComponent,
    Star,
    Center, 
    SpaceBetween,
    SpaceAround, 
    SpaceEvenly, 
    FlexStart, 
    FlexEnd, 
    BlockGroup, 
    FlexBlock,
    Slider,
    Flex,
    BorderBox,
    Box,
    Text,
  }
  
  const transformCode = code =>{
    if(code.startsWith('()')||code.startsWith('class')){
      return code
    }
    return `<React.Fragment>${code}</React.Fragment>`
  }
  
  return liveEditorRequested ? (
      <BorderBox
        border={0}
        mt={3} mb={3} p={2}
        borderTop={1} borderBottom={1}
        borderRight={0} borderLeft={0}
        borderRadius={0}
        bg='lightBackground'>
        <LiveProvider code={code} scope={scope} transformCode={transformCode}>
          <LivePreview/>
          <LiveEditor fontSize={['2px']} onChange={handleChange}/>
          <LiveError/>
        </LiveProvider>
        </BorderBox>
  ) : (
    <CodeWrapper filename={filename} code={code}>
      <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${codeClassName} ${className}`} style={{ ...style }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({ token, key })}
                    style={{display:'inline-block'}}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CodeWrapper>
  )
  
  
}
