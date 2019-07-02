/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext, useEffect } from 'react'
//import { MDXProvider } from '@mdx-js/react'
import { ThemeContext } from '../theme-context'

import './layout.scss'

export default function Layout({ children }) {
  const {
    state: { theme },
  } = useContext(ThemeContext)
  useEffect(() => {
    document.body.style.backgroundColor = theme.background
  }, [theme.background])
  // const components = {
  //   wrapper: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  // }
  return (
    //<MDXProvider components={components}>
    <main>{children}</main>
    // </MDXProvider>
  )
}
