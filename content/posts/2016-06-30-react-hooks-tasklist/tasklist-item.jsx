import React, { useContext } from 'react'
import {BorderBox, Flex, StyledOcticon,ButtonOutline} from '@primer/components'
import {X as CloseIcon} from '@primer/octicons-react'


import { CustomCheckbox as Checkbox }  from './task-checkbox'
import TaskText from './task-text'
import { TaskContext } from './task-context'


export default ({task}) => {
  const {
    complete,
    text,
    id: taskId
  } = task
  
  const {
    toggleComplete,
    toggleArchived,
  } = useContext(TaskContext)
  return (
    <BorderBox 
      style={{flexDirection: 'row'}} 
      display={'flex'} 
      p={2} mb={2} 
      border={0} 
      borderRadius={0}
      borderBottom={1}
      borderColor={'black'}>
      <Flex flexDirection={'row'} flexBasis={'100%'}>
        <Flex.Item flex={1}  onClick={()=> toggleComplete(taskId)}>
          <Checkbox checked={complete} />
        </Flex.Item>
        <Flex.Item flex={10}  onClick={()=> toggleComplete(taskId)}>
          <TaskText completed={complete}>
            {text}
          </TaskText>

        </Flex.Item>
        <Flex.Item onClick={()=> toggleArchived(taskId)} flex={0}>
          <StyledOcticon icon={CloseIcon} size={15} color={'red.6'} />
        </Flex.Item>
      </Flex>
    </BorderBox>
  )
  
}
