import uuid from 'uuid/v4'

import { ADD_TASK, TOGGLE_ARCHIVED, TOGGLE_COMPLETE } from './types'

const addTask = text => ({
  text,
  date: new Date(),
  id: uuid(),
  complete: false,
  archived: false,
})

const addTaskToTasks = (text, tasks) => [...tasks, addTask(text)]

const toggleComplete = task => ({
  ...task,
  complete: !task.complete,
})

const completeTaskById = (taskId, tasks) =>
  tasks.map(task => (task.id !== taskId ? task : toggleComplete(task)))

const toggleArchived = task => ({
  ...task,
  archived: !task.archived,
})

const archiveTaskById = (taskId, tasks) =>
  tasks.map(task => (task.id !== taskId ? task : toggleArchived(task)))

const taskReducer = (state, { type, value } = {}) => {
  const returnValues = {
    [ADD_TASK]: addTaskToTasks,
    [TOGGLE_COMPLETE]: completeTaskById,
    [TOGGLE_ARCHIVED]: archiveTaskById,
  }

  if (type in returnValues) {
    return returnValues[type](value, state)
  }

  return state
}

export default taskReducer
