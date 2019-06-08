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

    mkdir tasklist
    cd tasklist
    yarn init -y
    yarn add redux

once that finishes we can start by looking at what it means to use redux.

It calls itself

> A predictable state container for javascript apps

### What does that mean?

Well if you are familiar with react then you are familiar with using state, more traditionally inside of class based Components, but more recently also in functional Components using hooks (which yes, sort of make redux useless, but you want to learn it, maybe because you have to support code using it).

Basically it becomes the single source of truth in your app regarding state. If you need to check a value, you grab it from the redux store. If you want to update a value stored in the state, you pass an action to redux's dispatch function to kick off the update. It becomes very nice when you are working in a big project and you dont need to try to figure out how to update some value in the apps state, ie: which component handles it. You simply find or write the related action creator, and pass its return value to dispatch. 

So lets look at some concrete examples, but first lets go over what we need to do:

1. 