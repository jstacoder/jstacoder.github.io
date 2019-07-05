import React from 'react'
import { MDXProvider } from '@mdx-js/react'

export default function Layout({children}){

  const components = {
    p: props=> <div style={{backgroundColor:'blue'}} {...props}/>
  }
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}
