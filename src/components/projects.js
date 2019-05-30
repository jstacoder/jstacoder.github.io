import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// noinspection NpmUsedModulesInstalled
import NavTabs from 'components/Tabs'
// noinspection NpmUsedModulesInstalled
import ProjectGrid from 'components/ProjectGrid'

import { ThemeContext } from '../theme-context'

function Projects() {
  const {
    state: { style },
  } = useContext(ThemeContext)
  const {
    github: {
      viewer: { MoreProjectsContributedTo, TopProjects, TopContributions },
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
            MoreProjectsContributedTo: repositoriesContributedTo(
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
      <h2 className={style === 'dark' ? 'text-white' : ''}>
        My Github Projects
      </h2>

      <NavTabs
        tabs={[
          'Top Projects',
          'Top Contributions',
          'More Projects Ive Contributed To',
        ]}
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
          projects={MoreProjectsContributedTo}
          subtitle={'More projects ive contributed to'}
        />
      </NavTabs>
    </>
  )
}

export default Projects
