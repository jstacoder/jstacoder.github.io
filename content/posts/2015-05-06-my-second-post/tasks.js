import React, { useState, useReducer } from 'react'

import { ADD_TASK, TOGGLE_COMPLETE, TOGGLE_ARCHIVED } from './types'
import taskReducer from './task-reducer'

const useTasks = (initialTasks = []) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const [addTaskInput, setAddTaskInput] = useState('')

  const resetAddTaskInput = () => {
    setAddTaskInput('')
  }

  const addTask = text => {
    dispatch({
      type: ADD_TASK,
      value: text,
    })
    resetAddTaskInput()
  }

  const toggleComplete = taskId => {
    dispatch({
      type: TOGGLE_COMPLETE,
      value: taskId,
    })
  }

  const toggleArchived = taskId => {
    dispatch({
      type: TOGGLE_ARCHIVED,
      value: taskId,
    })
  }

  return {
    tasks,
    resetAddTaskInput,
    addTask,
    toggleComplete,
    toggleArchived,
    addTaskInput,
    setAddTaskInput,
  }
}

export default useTasks
