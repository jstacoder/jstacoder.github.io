import React, { useContext } from 'react'
import { Box, CounterLabel, Heading, TextInput, ButtonOutline} from '@primer/components'

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
    e.stopPropagation()
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
          <ButtonOutline width={'100%'} my={2} onClick={onSubmit} display={['block', 'block', 'none', 'none']}>save</ButtonOutline>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default TaskHeading
