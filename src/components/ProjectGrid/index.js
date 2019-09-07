import React from 'react'
import { Text, Box, Flex, Heading } from '@primer/components'
import { ThemeContext } from '../../theme-context'
import RepoCard from 'components/repoCard'
// import styled from 'styled-components'

const ProjectGrid = ({ projects, title, subtitle }) => {
  const {
    state: { style },
  } = React.useContext(ThemeContext)

  return (
    <React.Fragment>
      <Heading as={'h2'} color={style === 'dark' ? 'white' : null}>
        {title}
      </Heading>
      <Text
        as={'p'}
        fontSize={14}
        ml={[0, 4, 0]}
        mb={4}
        textAlign={['center', 'left']}
        color={style === 'dark' ? 'white' : 'gray.4'}
      >
        {subtitle}
      </Text>
      <Flex
        display={[null, 'flex']}
        flexWrap={'wrap'}
        mr={'-8px'}
        ml={'-8px'}
        mb={4}
      >
        {projects.nodes.map((repository, i) => (
          <Flex.Item width={[12 / 12, 6 / 12, null, 4 / 12]} mb={3} key={i}>
            <RepoCard repository={repository} />
          </Flex.Item>
        ))}
      </Flex>
    </React.Fragment>
  )
}

export default ProjectGrid
