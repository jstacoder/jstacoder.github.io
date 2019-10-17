/** @jsx jsx */
import { jsx } from 'theme-ui'

import Projects from '~components/projects'
import Interests from '~components/interests'
import Thoughts from '~components/thoughts'
import { HomePageWrapper } from '~components/home-page-wrapper'

export default () => {
  return (
    <HomePageWrapper>
      <Projects />
      <Interests />
      <Thoughts />
    </HomePageWrapper>
  )
}
