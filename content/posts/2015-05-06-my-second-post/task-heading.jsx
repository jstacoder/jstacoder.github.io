import React, { useContext } from 'react'
import { Box, CounterLabel, Heading, TextInput} from '@primer/components'

import { TaskContext } from './task-context'

const TaskHeading = () =>{
  const {
    addTask,
    addTaskInput,
    tasks,
    setAddTaskInput,
  } = useContext(TaskContext)
  
  const onChange = e =>{
    setAddTaskInput(e.target.value)
  }
  
  const onSubmit = e =>{
    e.preventDefault()
    addTask(addTaskInput)
  }
  
  const displayableTasks = tasks.filter(task=> !task.archived)
  
  return (
    <React.Fragment>
     <Heading ml={2}>
        <CounterLabel mr={2}>{displayableTasks.length}</CounterLabel> Tasks
      </Heading>
      <Box m={2}>
        <form onSubmit={onSubmit}>
          <TextInput value={addTaskInput} placeholder={'add new task'} onChange={onChange}/>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default TaskHeading
