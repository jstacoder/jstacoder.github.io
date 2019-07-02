import React, { createContext } from 'react'

export const TaskContext = createContext({
   tasks: [],
   displayableTasks: [],
   resetAddTaskInput: ()=>{},
   addTask: ()=>{},
   toggleComplete: ()=>{},
   toggleArchived:()=>{},
   addTaskInput:'',
   setAddTaskInput:()=>{},
})

