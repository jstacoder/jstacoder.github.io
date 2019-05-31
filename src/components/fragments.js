import { graphql } from 'gatsby'

export const GithubRepoQuery = graphql`
  fragment GithubRepoQuery on Github_Repository {
    owner {
      login
    }
    name
    url
    description
    stargazers {
      totalCount
    }
    forkCount
    language: primaryLanguage {
      color
      name
    }
  }
`
