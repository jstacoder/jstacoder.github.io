import React from 'react'
import '../components/Toggle.css'

import { GithubLayout } from '../components/github-layout'
import HomePage from './home'

function IndexPage() {
  return (
    <GithubLayout isIndex>
      <HomePage />
    </GithubLayout>
  )
}

export default IndexPage
