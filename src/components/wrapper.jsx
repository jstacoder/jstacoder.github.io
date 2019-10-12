/** @jsx jsx */
import { jsx } from 'theme-ui'
import { GithubLayout } from './github-layout.jsx'

export default ({children, ...props})=>{
  return(
    <GithubLayout {...props}>
      {children}
    </GithubLayout>
  )
}
