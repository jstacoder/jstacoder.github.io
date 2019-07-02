import React, { useContext, Fragment } from 'react'
import { Text } from '@primer/components'

import { TaskContext } from './task-context'

import TaskListItem from './tasklist-item'

const TaskListBody = () =>{
  const {
    displayableTasks,
  } = useContext(TaskContext)
  console.log(displayableTasks)
  return (
    <Fragment>
        {displayableTasks.length !== 0 ? displayableTasks.map(task =>(
          <TaskListItem key={task.id} task={task}/>
        )) : <Text p={2} m={3}>No Tasks Currently</Text>}
    </Fragment>
  )
}

export default TaskListBody
