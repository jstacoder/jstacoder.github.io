---
title: "Vanilla Redux \U0001F4DD"
date: '2015-05-28T22:40:32.169Z'
layout: stacked
path: "/markdown/"
category: Typography
published: true
tags:
- Markdown
- Emoji
- graphql

---
# Vanilla Redux

## Why Just Redux?

Many people find it difficult to learn react-redux, because they may know react, but if they have not yet run into redux it can be very confusing. So i found it useful to start out learning how to use redux by itself, then when you need to connect it to react you will have a much better idea of what is needed.

So what does that mean? We can make a small command line task list app as an example.

To start lets use `npm` or `yarn` to install our requirements, for this we will just use redux.

```sh
$ mkdir tasklist
$ cd tasklist
$ yarn init -y
$ yarn add redux uuid prompt
```

once that finishes we can start by looking at what it means to use redux.

It calls itself

> A predictable state container for javascript apps

### What does that mean?

Well if you are familiar with react then you are familiar with using state, more traditionally inside of class based Components, but more recently also in functional Components using hooks (which yes, sort of make redux useless, but you want to learn it, maybe because you have to support code using it).

Basically it becomes the single source of truth in your app regarding state. If you need to check a value, you grab it from the redux store. If you want to update a value stored in the state, you pass an action to redux's dispatch function to kick off the update. It becomes very nice when you are working in a big project and you dont need to try to figure out how to update some value in the apps state, ie: which component handles it. You simply find or write the related action creator, and pass its return value to dispatch.

So lets look at some concrete examples, but first lets go over what we need to do:

1. Figure out what data we need to store
2. Choose what states we will need to support
3. Define action type constants to represent our state changes
4. Combine data and action types into helper functions aka: Action Creators
5. Write reducer functions to perform our state updates
6. Wire it into our task app

So now lets think about what we want our app to do.

a task list needs to be able to:

* add a new task with text, and incomplete state
* list existing tasks
* set an incomplete task to complete
* delete a task

Now lets define what a task looks like

```graphql
type Task = {
  id: numbe
  text: String
  complete: Bool = false
}
```

At some point we should add a due date but for now all we really need is an object with a text property and a property to store its state, ill just call it complete and default it to false.

now we will define our actions

```js
    const uuid = require('uuid')
    const fs = require('fs')
    const prompt = require('prompt')
    const { createStore, combineReducers } = require('redux')
    
    // action type constants
    const ADD_TASK = 'ADD_TASK'
    const MARK_COMPLETE = 'MARK_COMPLETE'
    
    // action creator functions
    const addTaskAction = ({text}) =>({
      type: ADD_TASK,
      payload: {
        text
      }
    })
    
    const markCompleteAction = taskId =>({
      type: MARK_COMPLETE,
      payload: {
        taskId
      }
    })
    
    const initialState = []
    
    const taskListReducer = (state = initialState, { type, payload : { text, taskId } = {}})=>{
      switch(type){
        case ADD_TASK:
          return [
            ...state,
    	      {
    	        text,
              complete: false,
              id: uuid()
    	      }
          ]
        case MARK_COMPLETE:
          return state.map(task=>{
            if(task.id!==taskId) return task
            return { ...task, complete: true }
          })
        default:
          return state
      }
    }
    
    const loadInitialState = () => {
      return new Promise(
        (resolve, reject) => {
          return fs.readFile('./tasks.json',(err, result)=>{
            let tasks
            try{
              tasks = JSON.parse(result.toString())
            }catch(e){
              tasks = []
            }
            resolve({tasks})
          })
        }
      )
    }
    
    
    const loadStore = () => {
      return loadInitialState().then(initialState => {
        return createStore(
          combineReducers({tasks: taskListReducer}),
          initialState
        )
      })
    }
    
    const saveState = ({tasks}) =>{
      const data = JSON.stringify(tasks)
      try{
        JSON.parse(data)
        fs.writeFile('./tasks.json', data,(err,res)=>{})
      }catch(e){
        console.log(err)
      }
    }
    
    const displayTasks = tasks =>{
      tasks.forEach(({text, complete}, index)=>{
        console.log(`${index+1} [${complete ? 'x' : ' '}] ${text}`)
      })
    }
    
    const askWhatToDo = [{
      name: 'whatToDo',
      description: 'what would you like to do?\n[A] Add task\n[L] List tasks\n[C] Complete Task'
    }]
    
    const askWhatTaskToAdd = [{
      name: 'text',
      description: 'What should the text of the task be?'
    }]
    
    const askWhatTaskToComplete = [{
      name: 'taskIndex',
      description: 'What task Should we mark as complete?',
    }]
    
    
    
    const addTask = ({dispatch}, text) =>{
      dispatch(
        addTaskAction({text})
      )
    }
    
    const markComplete = ({dispatch}, taskId) =>{
      dispatch(
        markCompleteAction(taskId)
      )
    }
    
    const doAddTask = store =>{
      prompt.get(askWhatTaskToAdd, (err, {text})=>{
        console.log(`adding ${text}`)
        addTask(store, text)
      })
    }
    
    const doCompleteTask = store =>{
      prompt.get(askWhatTaskToComplete, (err, {taskIndex})=>{
        const { tasks } = store.getState()
        const { id, text } = tasks[taskIndex]
        console.log(`completing ${text}`)
        markComplete(store, id)
      })
    }
    
    const doListTasks = store =>{
      const { tasks } = store.getState()
      displayTasks(tasks)
    }
    
    loadStore().then(store=> {
    
      store.subscribe(()=>{
        const state = store.getState()
        saveState(state)
    
      })
      prompt.get(askWhatToDo, (err, {whatToDo})=>{
        const actions = {
          a: doAddTask,
          l: doListTasks,
          c: doCompleteTask,
        }
    
        console.log(`you chose ${whatToDo}`)
    
        actions[whatToDo.toLowerCase()](store)
      })
    })
```    

now let explain