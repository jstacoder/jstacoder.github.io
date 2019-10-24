import React, {useState, useMemo, useCallback } from 'react'
import {BorderBox, Box, Flex, Text} from '@primer/components'
import { GitBranch, Star } from '@primer/octicons-react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { typography } from '@styled-system/typography'
import styled from 'styled-components'
import Prisim from 'prism-react-renderer/prism'

import { Alert } from '../alert/alert'
import ClipBoardHelper from './click-to-copy/clipboard-helper'
import {FilenameBox} from '../shared/filename-box'
import {LiveError, LivePreview, LiveProvider} from 'react-live'

import { LiveEditor as BaseEditor } from './editor'


import { Center, SpaceBetween, SpaceAround, SpaceEvenly, FlexStart, FlexEnd, BlockGroup, FlexBlock } from '../flex-docs/justify-content.jsx'
import FlexComponent from '../flex'
import Slider from '../slider'
import useThemeContext from 'src/hooks/themeContext';


const LiveEditor = styled(BaseEditor)`
  ${typography}
`

const darkTheme =  {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#13161F',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(99, 119, 119)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'rgb(130, 170, 255)',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'rgb(199, 146, 234)',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(127, 219, 202)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
}

const GithubTheme = () =>({
  plain: {
    color: "#393a34",
    backgroundColor: "#adada1"
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
      types: ["plain","atrule", "keyword", "attr-name", "selector"],
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

const languageMap = {
  html: 'django',
  xml:'xml',
  mdx: 'md',
  md: 'md',
  js: 'js',
  css: 'css',
  sh: 'bash',
  c: 'c',
  cs: 'cs',
  cpp: 'cpp',
  diff: 'diff',
  yml: 'yml',
  git: 'git',
  graphql: 'graphql',
  gql: 'graphql',
  json: 'json',
  less: 'less',
  nginx: 'nginx',
  objc: 'objectivec',
  php: 'php',
  psh: 'powershell',
  pwsh: 'powershell',
  jsx: 'jsx',
  tsx: 'tsx',
  sass: 'sass',
  scss: 'scss',
  sql: 'sql',
  stylus: 'stylus',
  styl: 'stylus',
}

const getLanguageFromFilename = filename =>{
  const parts = filename.split('.')

  const ext = parts[parts.length-1]

  return ext in languageMap ? languageMap[ext] : ext
}

const getLive = children =>
  children && typeof children !== String && children.props
   ? children.props.live : false

const extractChildren = children =>{
  const childType = typeof children
  let childArray
  switch(childType){
    case "string":
      childArray = [children]
      break
    case "object":
      if(Array.isArray(children)){
        childArray = children.map(child=> extractChildren(child))
        break
      }
      childArray = React.Children.toArray(children)
      break
    default:
      childArray =  [""]
  }
  // console.log(childArray)
  return childArray.join('')
  // if(!!children && typeof children !== String && children.props){
  //   return React.Children.toArray(children.props.children).map(child=>
  //     child.props ? extractChildren(child.props) : child
  //   ).join('')
  // }
  // return children.join('')
}

const getChildren = children => {
  return children && typeof children !== String && children.props
    ? React.Children.toArray(children.props.children) :
    children
}

const getFilename = children =>
  (children && typeof children !== String && children.props && children.props.filename)
  ? children.props.filename : undefined

const getClassName = children =>
  (children && typeof children !== String && children.props) ? children.props.className : ''


const CodeWrapper = ({children, filename, code}) =>{
  const { theme } = useThemeContext()
  return filename  !== undefined ? (
    <Box mt={3} width={"100%"}>
      <FilenameBox
        theme={theme}
        backgroundColor='secondaryBackground'
        color='lightText'
        opacity='0.8'
        display='flex'
        py={2}
        pl={3}
        borderColor='darkBorder'

        >
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
        <ClipBoardHelper copyText={code} opacity={'0.8'} color={'lightText'} />
      </Flex>
      {children}
    </Flex>
  )
}

const handleChildren = children => {

  if(typeof children === "string"){
    return children
  }else if(children.props && children.props.children){

    if(typeof children.props.children === 'string') {
      return children.props.children
    }
    return Array.isArray(children.props.children) ? children.props.children.map(handleChildren) : children.props.children
  }

  return children||[]
}

const flatten = arr => arr.map(itm=> Array.isArray(itm) ? itm.join('') : itm)

export const Code = ({children, filename, onChange, className: codeClassName, live, ...props}) =>{
  // console.log(props)  

  const childArray = React.useMemo(()=> handleChildren(children), [children])

  const initialCode = React.useMemo(()=> childArray, [childArray])

  const [code, setCode] = React.useState(initialCode)

  const handleChange = useCallback((code)=>{
        onChange && onChange(code)
        setCode(code)
  },[code])

  const classParts = codeClassName && codeClassName.split(' ') || ['language-py']
  const languageName = classParts.filter(part=> part.search('language') > -1)[0]
  const language = filename ? getLanguageFromFilename(filename) : languageName.replace(/language-/, '')

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
  const [highlightLine, setHighlightLine] = useState(null)

  const clickLine = ({line, key, i, props}) =>{   
    setHighlightLine(i)
  }
  const getbg = line =>{
    if(line===highlightLine){
      return 'yellow'
    }
    return 'transparent'
  }
  return live ? (
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
    <CodeWrapper filename={filename} code={code || ' '}>
      <Highlight {...defaultProps} code={code || ' '} language={language} theme={darkTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${codeClassName} ${className}`} style={{ ...style }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} style={{border: `1px dashed ${getbg(i)}`}}>
                {line.map((token, key) => (
                  <span
                    onClick={()=>clickLine({line, key, i, props: getLineProps({ token, key })})}
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

export const Pre = ({children}) => <div>{children}</div>
