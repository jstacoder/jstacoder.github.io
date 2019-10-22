/** @jsx jsx */
import { jsx } from 'theme-ui'

import Projects from './projects'
import Interests from './interests'
import Thoughts from './thoughts'
import { HomePageWrapper } from './home-page-wrapper'

export default () => {
  return (
    <HomePageWrapper>
      <Projects />
      <Interests />
      <Thoughts />
    </HomePageWrapper>
  )
}
