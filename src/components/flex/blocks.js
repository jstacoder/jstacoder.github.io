import React, { useReducer } from 'react'

const createBlock = () => ({
  height: 20,
  width: 20,
  flex: 'auto',
  flexGrow: 0,
  flexShrink: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
})

export const useBlocks = () => {
  const blockReducer = (state, { type, value } = {}) => {
    switch (type) {
      case 'ADD_BLOCK':
        return [...state, createBlock()]
      case 'SET_BLOCK':
        return [...state.filter((_, idx) => idx !== value.num), { ...value }]
      default:
        return state
    }
  }
  const [blocks, dispatch] = useReducer(blockReducer, [createBlock()])

  const addBlock = () =>
    dispatch({
      type: 'ADD_BLOCK',
    })

  const setBlock = value =>
    dispatch({
      type: 'SET_BLOCK',
      value,
    })

  return {
    blocks,
    addBlock,
    setBlock,
  }
}
