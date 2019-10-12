---
date_added: 2019-06-24T14:50:42.000+00:00
date_modified: 2019-06-24T14:50:42.000+00:00
layout: stacked
tags:
  - graphql
  - react
  - react-hooks
  - useReducer
  - useContext
title: Dark mode hook
published: false
categories:
  - Programming
draft: true
---

## Dark Mode:

### The react hooks way

Here I will show how to use reacts new `useContext` and `useReducer` hooks by adding a dark mode toggle to a react app

To start out we will need three things:

1. A light colored theme object
2. A dark colored theme object
3. A way to provide the theme to your components

For the themes i prefer to combine them into a single `themes` object

```js filename=themes.js
import { dark } from './themes/dark'
import { light } from './themes/light'

export const themes = {
  dark,
  light,
}
```

And for the themes i like to define general names for colors to use

```js filename=themes/light.js
export const light = {
  colors: {
    lightText: '',
    darkText: '',
    lightBackground: '',
    darkBackground: '',
    primary: '',
    secondary: '',
  },
}
```
