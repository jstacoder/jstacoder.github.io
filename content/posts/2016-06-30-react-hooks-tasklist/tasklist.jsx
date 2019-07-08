import React from 'react'
import {
  Flex,
  BorderBox
} from '@primer/components'


import { TaskContext } from './task-context'
import TaskHeading from './task-heading'
import TaskListBody from './tasklist-body'
import useTasks from './tasks'

const TaskList = () =>{
  const {
    toggleComplete,
    toggleArchived,
    tasks,
    addTaskInput,
    setAddTaskInput,
    addTask,
  } = useTasks()
  
  const displayableTasks = tasks.filter(task=> !task.archived)
  
  const value = {
    tasks,
    displayableTasks,
    toggleComplete,
    toggleArchived,
    addTask,
    addTaskInput,
    setAddTaskInput,
  }
  
  return (
    <TaskContext.Provider value={value}>
      <BorderBox p={2} m={3}>
        <TaskHeading/>
        <BorderBox
          border={0}
          borderBottom={1}
          m={1} p={1}>
        <Flex
          p={2} m={2}
          flexDirection={'column'}>
          <TaskListBody/>
        </Flex>
        </BorderBox>
      </BorderBox>
    </TaskContext.Provider>
  )
}

export default TaskList
