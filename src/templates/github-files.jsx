/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { useState } from 'react'
import { graphql } from 'gatsby'
import { FileDirectory, FileCode } from '@primer/octicons-react'
import { StyledOcticon, Details } from '@primer/components'
import { detailedDiff } from 'deep-object-diff'
import lightFormat from 'date-fns/lightFormat'

import { CodeEditor } from 'components/ui/editor'
import { Code as Pre } from 'components/ui/pre'
import { GithubLayout } from 'components/github-layout'
import { unifiedDiff } from 'difflib'

export const getChangedFilesFromCommit = commit =>{
  const {
    committedDate,
    additions,
    deletions,
    tree: {
      entries: commitEntries
    },
    parents: {
      nodes: parents
    }
  } = commit

  let addedItems = []
  let deletedItems = []
  let updatedItems = {}


  const getNames = arr => arr.map(itm=> itm.name)
  const mapArrToObj = key => arr => arr.reduce((previous, current)=> {previous[current[key]] = current; return previous; },{})

  const commitObj = mapArrToObj('name')(commitEntries)


  let parentEntries = {}

  const commitNames = getNames(commitEntries)

  parents.forEach(parent=> parentEntries[parent.oid] = parent.tree.entries)

  console.log('ENTRIES: ',  commitEntries, parentEntries)

  parents.forEach(parent=>{
    const currentParentEntries = parentEntries[parent.oid]
    const {
      parentCommittedDate
    } = parent
    const parentObj = mapArrToObj('name')(currentParentEntries)
    const addedFiles = commitEntries.length > currentParentEntries.length 
    const removedFiles = commitEntries.length < currentParentEntries.length
    console.log('first: ', addedFiles)
    console.log('second: ', additions)
    console.log('removed: ', removedFiles)



    const parentNames = getNames(currentParentEntries)

    const diffFiles = (arrA, arrB) => arrA.filter(n=> !arrB.includes(n)).concat(arrB.filter(n=> !arrA.includes(n)))

    const changedFiles = diffFiles(parentNames, commitNames)

    console.log('changed: ', changedFiles, 'added: ', addedFiles, 'removed: ', removedFiles)

    const { added, deleted, updated } = detailedDiff(commitObj, parentObj)

    addedItems.concat(Object.keys(added))
    deletedItems.concat(Object.keys(deleted))

    console.log('added: ', added, '\ndeleted: ',deleted, '\nupdated: ',updated)

    const updatedKeys = Object.keys(updated)

    updatedKeys.forEach(key=>{
      const idx = commitEntries.indexOf(commitObj[key])

      const parentIdx = currentParentEntries.indexOf(parentObj[key])

      const commitText = commitEntries[idx].object.text.split('\n')

      const parentText = currentParentEntries[parentIdx].object.text.split('\n')
      
      const updatedFileBase = updated[key]

      console.log('UPDATED: ', updatedFileBase)
      
      const updatedFile = updatedFileBase && updatedFileBase.object && updatedFileBase.object.text

      const oldFileBase = parentObj[key]

      const oldFile = oldFileBase && oldFileBase.object && oldFileBase.object.text 

      updatedItems = {...updatedItems, [key]: unifiedDiff(
        parentText, 
        commitText, 
        {
          fromfile:`${key}[OLD]=>`,
          fromfiledate: parentCommittedDate,
          tofile: `${key}[NEW]=>`,
          tofiledate:committedDate,
        }
      ).map((line, idx)=>`${idx}| ${line}`).join('\n')}
    })  
  })  
  return {
    addedItems,
    deletedItems,
    updatedItems,
  }
}

export default ({data: { github : { resource : commit }}}) =>{
  const [show, setShow] = useState(true)
  const { tree } = commit
  console.log(tree)
  const { addedItems, deletedItems, updatedItems } = getChangedFilesFromCommit(commit)
  const updatedKeys = Object.keys(updatedItems)

  return (
    <GithubLayout title={'files'} sidebar={false}>
      <Box sx={{border: '1px solid grey', p: 4}}>
        <button onClick={()=> setShow(!show)}>{!!show ? 'hide' : 'show' }</button>
        <Box sx={{border: '1px solid black'}}>
          {show ? <pre>{JSON.stringify(tree, null, 2)}</pre> : null }
        </Box>
        {tree.entries && <RenderTree {...tree} showFiles />}
        {updatedKeys.map(key=>{
          const itm = updatedItems[key]
          return (
            <Flex>
              <Box>{key}</Box>
              <pre>{itm}</pre>
            </Flex>
          )
        })}
      </Box>
    </GithubLayout>
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
        <Details>
          <Flex as={'summary'} sx={{justifyContent:'flex-start'}}>
          <StyledOcticon size={25} icon={FileCode}/>
          <p sx={{ml: 3, borderBottom: '1px solid darkslategray'}} onClick={()=>setShowText(!showText)}>{name}</p>
        </Flex>
        <Flex>
         <Flex sx={{flex: 1, width: '40%', alignItems: 'center'}}>                 
            <Pre onChange={changeThis} minHeight={height}>
              <Box filename={name}>
                {text}
              </Box>
            </Pre>
          </Flex>
        </Flex>
      </Details>
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
        console.log(entries)
        if(object && object.text !== undefined){
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
                    oid
                    additions
                    deletions
                    committedDate
                    parents(first: 2) {
                      nodes {
                        oid
                        parentAdditions:additions
                        parentDeletions:deletions
                        parentCommittedDate: committedDate
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
                                                      object {
                                                        ...on Github_Blob {
                                                          text
                                                        }
                                                        ...on Github_Tree {
                                                          entries {
                                                            name
                                                            object {
                                                              ...on Github_Blob {
                                                                text
                                                              }
                                                              ...on Github_Tree {
                                                                entries {
                                                                  name
                                                                  object {
                                                                    ...on Github_Blob {
                                                                      text
                                                                    }
                                                                    ...on Github_Tree {
                                                                      entries {
                                                                        name
                                                                        object {
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
                                                    object {
                                                      ...on Github_Blob {
                                                        text
                                                      }
                                                      ...on Github_Tree {
                                                        entries {
                                                          name
                                                          object {
                                                            ...on Github_Blob {
                                                              text
                                                            }
                                                            ...on Github_Tree {
                                                              entries {
                                                                name
                                                                object {
                                                                  ...on Github_Blob {
                                                                    text
                                                                  }
                                                                  ...on Github_Tree {
                                                                    entries {
                                                                      name
                                                                      object {
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
