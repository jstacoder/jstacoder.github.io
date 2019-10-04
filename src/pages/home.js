import React from 'react'

import Projects from '~components/projects'
import Interests from '~components/interests'
import Thoughts from '~components/thoughts'
import { HomePageWrapper } from '~components/home-page-wrapper'

export const HomePage = ({ children }) => {
  return (
    <HomePageWrapper>
      <Projects />
      <Interests />
      <Thoughts />
    </HomePageWrapper>
  )
}
