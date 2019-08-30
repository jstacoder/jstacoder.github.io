/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { useState } from 'react'

import { TreeNode } from './tree-node.jsx'
import { treeData } from './tree-data' 


export const TreeView = ({allowFolders = true, allowFiles = true, treeData}) =>{

    
    const [selected, setSelected] = useState(null)
    const [nodes, setNodes] = useState(treeData)

    const getRootNodes = () =>{
        return [nodes['/']]
    }

    const getChildNodes = node =>{
        if(!node.children){
            return []
        }
        return node.children.map(path=> nodes[path])
    }

    const onToggle = node =>{
        setNodes({
            ...nodes,
            [node.path]: {
                ...nodes[node.path],
                isOpen: !nodes[node.path].isOpen,
            }
        })       
    }

    const onNodeSelect = node =>{
        setSelected(node.path)
    }

    const rootNodes = getRootNodes()
    return (
        <Box sx={{
            border: '1px solid white',         
        }}>
            {selected !== null ? (<p sx={{pl: 3, py: 2, borderBottom: '2px solid gray', mb: 0}}>Current Selection: {selected}</p>) : selected}
        <Box sx={{
            maxHeight: '400px',                
            p: 0,
            overflow: 'overlay',
            '::-webkit-scrollbar': {
                width: '4px',
                height: '2px',
                background: 'transparent',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#FF0000',
            }
        }}>
            <div>              
                {rootNodes.map(node=>(
                    <TreeNode 
                        allowFiles={allowFiles}
                        allowFolders={allowFolders}
                        selected={selected}
                        onNodeSelect={onNodeSelect}
                        key={`node-${node.path}`} 
                        node={node} 
                        onToggle={onToggle} 
                        getChildNodes={getChildNodes} 
                        level={1} />
                ))}
            </div>
        </Box>
        </Box>
    )

}

export const TreeViewExample = (props) =>{
    return (
        <TreeView treeData={treeData} allowFiles={false} />
    )
}