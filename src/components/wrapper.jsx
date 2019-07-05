import React from 'react'
import { GithubLayout } from './github-layout.jsx'

export default ({children, ...props})=>{  
  return(
    <GithubLayout {...props}>
      {children}
    </GithubLayout>
  )
}