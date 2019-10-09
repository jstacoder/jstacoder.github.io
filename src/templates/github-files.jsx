/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { useState } from 'react'
import { graphql } from 'gatsby'
import { FileDirectory, FileCode } from '@primer/octicons-react'
import { StyledOcticon } from '@primer/components'


import { CodeEditor } from 'components/ui/editor'



export default ({data: { github : { resource : { tree }}}}) =>{
  const [show, setShow] = useState(true)
  console.log(tree)
  return (
    <Box sx={{border: '1px solid grey', p: 4}}>
      <button onClick={()=> setShow(!show)}>{!!show ? 'hide' : 'show' }</button>
      <Box sx={{border: '1px solid black'}}>
        {show ? <pre>{JSON.stringify(tree, null, 2)}</pre> : null }
      </Box>
      {tree.entries && <RenderTree {...tree} showFiles />}
    </Box>
  )
}

const RenderBlob = ({name, text}) => {
  const [showText, setShowText] = useState(false)
  const codeLines = text && text.split('\n').length

  const height = `${ (codeLines / 6) * 100}px`

  console.log(text)
  const changeThis = (...args) =>  {
    console.log(args)
  }
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', my: 3, borderTop: '1px dashed gray'}}>
      <Flex sx={{justifyContent:'flex-start'}}>
        <StyledOcticon size={25} icon={FileCode}/>
        <p sx={{ml: 3, borderBottom: '1px solid darkslategray'}} onClick={()=>setShowText(!showText)}>{name}</p>
      </Flex>
      <Flex>
      <Flex sx={{flex: 1, width: '40%', alignItems: 'center'}}>
      {showText && <CodeEditor minHeight={height} code={text} onChange={changeThis}/> }
      </Flex>
      </Flex>
   </Box>
  )
}

const RenderTree = ({name = 'root', entries, showFiles = false}) =>{
  const [show, setShowFiles] = useState(showFiles)
  return (
    <Box sx={{border: '1px solid gray'}}>
      <p sx={{bg: 'gray', color: 'white'}} onClick={()=> setShowFiles(!show)}>{name} ---{'>'}</p>
      <Box sx={{pl: 3, border: '1px solid gray'}}>
        {show && entries && entries.map(({name: innerName, object})=>{
        if(object.text !== undefined){
          return <RenderBlob name={innerName} text={object.text}/>
          }
          return <RenderTree name={innerName} entries={object.entries}/>
        })}
      </Box>
    </Box>

  )
}

export const query = graphql`
    query commitQuery($commitUrl: Github_URI!){
        github{
            resource(url: $commitUrl){
                ...on Github_Commit {
                    tree {
                        entries{
                            name 
                            object {
                                ...on Github_Blob {
                                    text
                                }
                                ...on Github_Tree {
                                    entries {
                                        name 
                                        object {
                                            ...on Github_Tree {
                                                entries {
                                                    name
                                                }
                                            }
                                            ...on Github_Blob {
                                                text
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        }
    }
`
