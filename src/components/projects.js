import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// noinspection NpmUsedModulesInstalled
import NavTabs from 'components/Tabs'
// noinspection NpmUsedModulesInstalled
import RepoCard from 'components/repoCard'
import ProjectGrid from 'components/ProjectGrid'

import { ThemeContext } from '../theme-context'

function Projects() {
  const {
    state: { style },
  } = useContext(ThemeContext)
  const {
    github: {
      viewer: { repositoriesContributedTo, TopProjects, PinnedProjects },
    },
  } = useStaticQuery(
    graphql`
      query {
        github {
          viewer {
            TopProjects: repositories(
              privacy: PUBLIC
              first: 9
              orderBy: { field: STARGAZERS, direction: DESC }
            ) {
              nodes {
                ...GithubRepoQuery
              }
            }
            PinnedProjects: repositories(
              privacy: PUBLIC
              first: 9
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              nodes {
                ...GithubRepoQuery
              }
            }
            repositoriesContributedTo(
              first: 9
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
        tabs={['TopProjects', 'LatestProjects', 'ProjectsContributedTo']}
        initialActiveTab={'TopProjects'}
      >
        <ProjectGrid
          projects={TopProjects}
          subtitle={'My Top Github Projects'}
        />
        <ProjectGrid
          projects={PinnedProjects}
          subtitle={'My Latest updated projects'}
        />
        <ProjectGrid
          projects={repositoriesContributedTo}
          subtitle={'Top projects ive contributed to'}
        />
      </NavTabs>
    </>
  )
}

export default Projects
