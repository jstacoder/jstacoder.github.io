/** @jsx jsx */
import { jsx, Box, Styled, useThemeUI } from 'theme-ui'
import { useState } from 'react'
import { graphql } from 'gatsby'
import { FileDirectory, FileCode, FoldUp, FoldDown, ChevronRight, ChevronDown } from '@primer/octicons-react'
import { StyledOcticon, Details, Flex } from '@primer/components'
import { detailedDiff } from 'deep-object-diff'
import lightFormat from 'date-fns/lightFormat'
import { useConfig } from 'docz'
import { GraphQLClient } from 'graphql-request'

import { CodeEditor } from 'components/ui/editor'
import  Icon from 'components/Icon'
import { Code as Pre } from 'components/ui/pre'
import { GithubLayout } from 'components/github-layout'
import { unifiedDiff } from 'difflib'
import ReactDiffViewer from 'react-diff-viewer'



const getClient = (apiKey) =>{
  return new GraphQLClient('https://api.github.com/graphql',{
    headers: {
      Authorization: `bearer ${apiKey}`
    }
  })
}


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
  } = commit || {
    tree: {entries: []},
    parents: {
      nodes: []
    },
  }

  let addedItems = []
  let deletedItems = []
  let updatedItems = {}


  const getNames = arr => arr.map(itm=> itm.name)
  const mapArrToObj = key => arr => arr.reduce((previous, current)=> {previous[current[key]] = current; return previous; },{})

  const commitObj = mapArrToObj('name')(commitEntries)


  let parentEntries = {}

  const commitNames = getNames(commitEntries)

  parents.forEach(parent=>{
    if(parent){
      parentEntries[parent.oid] = parent.tree.entries
    }
  })

  // console.log('ENTRIES: ',  commitEntries, parentEntries)

  const combineEntry = ({name, object = {}}={})=> ({name, ...object})

  const recursiveEntrys = entries =>{
    return entries.map(entry=>{
      const newEntry = combineEntry(entry)
      if(newEntry.entries){
        newEntry.entries = recursiveEntrys(newEntry.entries)
      }
      return newEntry
    })
  }

  const commits = recursiveEntrys(commitEntries)

  const parentCommits = parents.reduce(
    (prev, parent)=>{
      if(parent){
       return ({...prev, [parent.oid]: recursiveEntrys(parentEntries[parent.oid])})
      }
    }, {}
  )

  // console.log('HERELL ==>  ', commits, parentCommits)

  parents.forEach(parent=>{
    if(parent){
      const currentParentEntries = parentEntries[parent.oid]
      const {
        parentCommittedDate
      } = parent
      const parentObj = parentCommits[parent.oid] ? parentCommits[parent.oid] : [] //mapArrToObj('name')(currentParentEntries)
      const addedFiles = commitEntries.length > currentParentEntries.length
      const removedFiles = commitEntries.length < currentParentEntries.length
      // console.log('first: ', addedFiles)
      // console.log('second: ', additions)
      // console.log('removed: ', removedFiles)



      const parentNames = getNames(currentParentEntries)

      const diffFiles = (arrA, arrB) => arrA.filter(n=> !arrB.includes(n)).concat(arrB.filter(n=> !arrA.includes(n)))

      const changedFiles = diffFiles(parentNames, commitNames)

      // console.log('changed: ', commits, 'added: ', parentObj, 'removed: ', removedFiles)

      const { added, deleted, updated } = detailedDiff(commits, parentObj)

      addedItems.concat(Object.keys(added))
      deletedItems.concat(Object.keys(deleted))

      // console.log('added: ', added, '\ndeleted: ',deleted, '\nupdated: ',updated)

      const updatedKeys = Object.keys(updated)

      updatedKeys.forEach(key=>{
        const idx = commitEntries.indexOf(commitObj[key])

        const parentIdx = currentParentEntries.indexOf(parentObj[key])

        const entry = commitEntries[idx]
        const _commitText = entry && entry.object && entry.object.text
        const commitText = _commitText && _commitText.split('\n')


        const parentEntry = currentParentEntries[parentIdx]
        const _parentText = parentEntry && parentEntry.object && parentEntry.object.text
        const parentText = _parentText && _parentText.split('\n')

        // const updatedFileBase = updated[key]

        // const updatedFile = updatedFileBase && updatedFileBase.object && updatedFileBase.object.text

        // const oldFileBase = parentObj[key]

        // const oldFile = oldFileBase && oldFileBase.object && oldFileBase.object.text

        updatedItems = {
          ...updatedItems, [key]: {
            diff: unifiedDiff(
              commitText,
              parentText,
              {
                fromfile: `${key}[OLD]=>`,
                fromfiledate: parentCommittedDate,
                tofile: `${key}[NEW]=>`,
                tofiledate: committedDate,
              }
            ).map((line, idx) => `${idx}| ${line}`).join('\n'),
            commitText,
            parentText,
            name: key,
          }
        }
      })
   }
  })
return {
    addedItems,
    deletedItems,
    updatedItems,
  }
}

export default ({data, pageContext, ...props}) =>{
    
    const [queryResult, setQueryResult] = useState(null)
    const stuff = useThemeUI()
    // console.log("THEME-UI", stuff)
    const config = useConfig()
    // console.log("DOCZ",config)
    const [show, setShow] = useState(true)
    const client = getClient(pageContext.apiUrl)
    const query =  /* GraphQL */`
    query commitQuery($commitUrl: URI!){
        
            resource(url: $commitUrl){
                ...on Commit {
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
                                  ...on Blob {
                                      text
                                  }
                                  ...on Tree {
                                      entries {
                                          name 
                                          object {
                                              ...on Tree {
                                                  entries {
                                                      name
                                                      object {
                                                        ...on Blob {
                                                          text
                                                        }
                                                        ...on Tree {
                                                          entries {
                                                            name
                                                            object {
                                                              ...on Blob {
                                                                text
                                                              }
                                                              ...on Tree {
                                                                entries {
                                                                  name
                                                                  object {
                                                                    ...on Blob {
                                                                      text
                                                                    }
                                                                    ...on Tree {
                                                                      entries {
                                                                        name
                                                                        object {
                                                                          ...on Blob {
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
                                              ...on Blob {
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
                                ...on Blob {
                                    text
                                }
                                ...on Tree {
                                    entries {
                                        name 
                                        object {
                                            ...on Tree {
                                                entries {
                                                    name
                                                    object {
                                                      ...on Blob {
                                                        text
                                                      }
                                                      ...on Tree {
                                                        entries {
                                                          name
                                                          object {
                                                            ...on Blob {
                                                              text
                                                            }
                                                            ...on Tree {
                                                              entries {
                                                                name
                                                                object {
                                                                  ...on Blob {
                                                                    text
                                                                  }
                                                                  ...on Tree {
                                                                    entries {
                                                                      name
                                                                      object {
                                                                        ...on Blob {
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
                                            ...on Blob {
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
    
`
console.log('QUERY RESULT', queryResult)
if(queryResult === null){
  if(data){ 
    const {
      github : { 
        resource : commit 
      }
    } = data
    setQueryResult(commit)
  }else {     
    const result = client.request(query, {commitUrl: pageContext.commitUrl})     
    result.then(({resource})=>{
      setQueryResult(resource)
    })
  }
  return (
    <GithubLayout>
      <div>
        <p>Loading...</p>
        <Icon color='black' size='5x' name='circle-notch' spin={true}/> 
      </div>
    </GithubLayout>
  )
}
// if(queryResult === null){
//   return null
// }
 
  const { tree } = queryResult ? queryResult : { tree: {}}
  const { addedItems, deletedItems, updatedItems } = getChangedFilesFromCommit(queryResult)
  const updatedKeys = Object.keys(updatedItems)
    
  const clickLine = num =>{
    console.log('clicked ', num)
  }
  return queryResult === null ? queryResult : (
    <GithubLayout title={queryResult.oid.slice(0, 6)} backUrl={pageContext.parentPath} backText={'go back'} >
      <Box sx={{border: '1px solid grey', p: 0}}>
        <button onClick={()=> setShow(!show)}>{!!show ? 'hide' : 'show' }</button>
        <Box sx={{border: '1px solid black'}}>
          {show ? <pre>{JSON.stringify(tree, null, 2)}</pre> : null }
        </Box>
        {tree.entries && <RenderTree {...tree} showFiles />}
        {updatedKeys.map(key=>{
          const itm = updatedItems[key]
          // console.log(itm)
          return itm.parentText && itm.commitText ? (
            <Flex flexDirection={"column"}>
              <Box>{key}</Box>
              {itm.parentText && itm.commitText ? (
                <ReactDiffViewer
                    splitView={false}
                    oldValue={itm.parentText.join('\n')}
                    newValue={itm.commitText.join('\n')}
                    onLineNumberClick={(num)=> clickLine(num)}
                />
                )
                : null}
            </Flex>
          ) : null
        })}
      </Box>
    </GithubLayout>
  )
}


const RenderBlob = ({name, text}) => {
  const [showText, setShowText] = useState(false)
  const codeLines = text && text.split('\n').length

  const height = `${ (codeLines / 6) * 100}px`

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
         <Flex sx={{flex: 1, width: '100%', alignItems: 'center'}}>
            <Pre onChange={changeThis} minHeight={height}>
              <code filename={name}>
                {text}
              </code>
            </Pre>
          </Flex>
        </Flex>
      </Details>
    </Box>
  )
}

const RenderTree = ({name = 'root', entries, showFiles = false, level = 1}) =>{
  const [show, setShowFiles] = useState(showFiles)
  return (
    <Box sx={{border: '0px solid gray'}}>
      <Styled.p sx={{bg: 'gray', color: 'white', }} onClick={()=> setShowFiles(!show)}>{Array(level).fill(`${level} > `).join(' ')}{'  '}{name} <StyledOcticon icon={!show ?  ChevronRight : ChevronDown}/> </Styled.p>
      <Box sx={{border: '0px solid gray'}}>
        {show && entries && entries.map(({name: innerName, object})=>{
        if(object && object.text !== undefined){
          return <RenderBlob key={object.text} name={innerName} text={object.text}/>
          }
          return <RenderTree key={innerName} name={innerName} entries={object.entries} level={level+1}/>
        })}
      </Box>
    </Box>

  )
}
