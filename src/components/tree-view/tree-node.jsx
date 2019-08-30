import React, { useState, Fragment } from 'react'
import { FaFileAlt as FaFile } from 'react-icons/fa'
import { FaRegFolder as FaFolder, FaRegFolderOpen as FaFolderOpen, FaChevronDown, FaChevronRight} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  styled from 'styled-components'


const getPaddingLeft = ({level, type}) =>{
    let paddingLeft = level * 20
    if(type == 'file'){
        paddingLeft += 20
    }
    return paddingLeft
}

const StyledTreeNode = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 8px;
    padding-left: ${props=> getPaddingLeft(props)}px;
    ${props=> props.selected ? 'background: slategray;':''}
    &:hover {
        background: ${props=> !props.selected ? 'lightgray': 'slategray'};
        cursor: pointer;
    }
`

const NodeIcon = styled.div`
    font-size: 12px;
    padding: 5px;
    margin-right: ${props=> props.marginRight ? props.marginRight : 5}px;
`




export const TreeNode = props =>{
    console.log(props)
    const {node = {}, getChildNodes, level, onToggle, onNodeSelect, selected, allowFiles, allowFolders} = props

    const isAllowed = node.type === 'folder' ? allowFolders : allowFiles
    const getNodeLabel = node => node.path.split('/')[node.path.split('/').length-1]
    const isSelected = node.path === selected
    return isAllowed ?  (
        <Fragment>
            <StyledTreeNode selected={isSelected} level={level} type={node.type}  onClick={()=> onNodeSelect(node)}>
              
                <NodeIcon onClick={()=> onToggle(node)} marginRight={10}>
                    {node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />) }
                </NodeIcon>

                <div style={{marginRight: '10px'}}>
                    { node.type === 'file' && <FaFile/> }
                    { node.type === 'folder' && node.isOpen && <FaFolderOpen /> }
                    { node.type === 'folder' && !node.isOpen && <FaFolder /> }

                </div>

                <span role='button'>
                    { getNodeLabel(node) }
                </span>                              
            </StyledTreeNode>
            {node.isOpen && getChildNodes(node).map(childNode=>(
                <TreeNode
                    {...props}
                    key={node.path}
                    node={childNode}
                    level={level + 1}/>
            ))}
        </Fragment>
    ) : null
}
