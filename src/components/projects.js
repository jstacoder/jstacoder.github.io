import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Heading } from '@primer/components'

// noinspection NpmUsedModulesInstalled
import NavTabs from 'components/Tabs'
// noinspection NpmUsedModulesInstalled
import ProjectGrid from 'components/ProjectGrid'

import useThemeContext from '../hooks/themeContext'

function Projects() {
  const { style } = useThemeContext()
  const {
    github: {
      viewer: { MyPinnedRepos, TopProjects, TopContributions },
    },
  } = useStaticQuery(
    graphql`
      query {
        github {
          viewer {
            TopProjects: repositories(
              privacy: PUBLIC
              first: 6
              orderBy: { field: STARGAZERS, direction: DESC }
            ) {
              nodes {
                ...GithubRepoQuery
              }
            }
            TopContributions: pinnedRepositories(
              privacy: PUBLIC
              first: 6
              orderBy: { field: STARGAZERS, direction: DESC }
            ) {
              nodes {
                ...GithubRepoQuery
              }
            }
            MyPinnedRepos: repositoriesContributedTo(
              first: 6
              orderBy: { field: STARGAZERS, direction: DESC }
            ) {
              nodes {
                ...GithubRepoQuery
              }
            }
          }
        }
      }
    `
  )
  return (
    <>
      <Heading as={'h2'} color={'text'} textAlign={['center', null, 'left']}>
        My Github Projects
      </Heading>

      <NavTabs
        tabs={['Top Projects', 'Top Contributions', 'My Pinned Repos']}
        initialActiveTab={'Top Projects'}
      >
        <ProjectGrid
          projects={TopProjects}
          subtitle={'My Top Personal Github Projects'}
        />
        <ProjectGrid
          projects={TopContributions}
          subtitle={'The Hightest Starred Projects Ive Made Contributions To'}
        />
        <ProjectGrid
          projects={MyPinnedRepos}
          subtitle={'More projects ive contributed to'}
        />
      </NavTabs>
    </>
  )
}

export default Projects
