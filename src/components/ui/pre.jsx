import React from 'react'
import {BorderBox, Box, Flex, Text} from '@primer/components'
import { GitBranch, Star } from '@primer/octicons-react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prisim from 'prism-react-renderer/prism'

import { Alert } from '../alert/alert'
import ClipBoardHelper from './click-to-copy/clipboard-helper'
import {FilenameBox} from '../shared/filename-box'
import {LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live'

import { Center, SpaceBetween, SpaceAround, SpaceEvenly, FlexStart, FlexEnd, BlockGroup, FlexBlock } from '../flex-docs/justify-content.jsx'


const getLive = children =>
  children && typeof children !== String ? children.props.live : false

const getChildren = children =>
  children && typeof children !== String ? children.props.children : children

const getFilename = children =>
  (children && typeof children !== String && children.props && children.props.filename) 
  ? children.props.filename : undefined

const getClassName = children =>
  (children && typeof children !== String && children.props) ? children.props.className : ''


const CodeWrapper = ({children, filename, code}) =>{
  return filename  !== undefined ? (
    <Box>
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
    <Flex flexDirection='column'>
      <Flex mb={[null,null,null,-40]} alignSelf={'flex-end'}>
        <ClipBoardHelper copyText={code} opacity={'0.8'} color={'black'} />
      </Flex>
      {children}
    </Flex>
  )
}


export const Code = ({children}) =>{
  const liveEditorRequested = getLive(children)
  const filename = getFilename(children)
  const code = getChildren(children)
  const codeClassName = getClassName(children)
  
  console.log(code, filename, liveEditorRequested)
  
  const language = codeClassName.replace(/language-/, '')
  
  const scope = {
    Alert,
    GitBranch,
    Star,
    Center, 
    SpaceBetween,
    SpaceAround, 
    SpaceEvenly, 
    FlexStart, 
    FlexEnd, 
    BlockGroup, 
    FlexBlock
  }
  
  return liveEditorRequested ? (
      <BorderBox
        border={0}
        mt={3} mb={3} p={2}
        borderTop={1} borderBottom={1}
        borderRight={0} borderLeft={0}
        borderRadius={0}
        bg='lightBackground'>
        <LiveProvider code={code} scope={scope}>
          <LivePreview/>
          <LiveEditor/>
          <LiveError/>
        </LiveProvider>
        </BorderBox>
  ) : (
    <CodeWrapper filename={filename} code={code}>
      <Highlight {...defaultProps} prisim={Prisim} code={code} language={language}>
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
    </CodeWrapper>
  )
  
  
}
