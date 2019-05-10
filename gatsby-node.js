const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const PostTemplate = path.resolve('./src/templates/index.js')

const createGithubPage = (repo, createPage) => {
  createPage({
    path: `/github/${repo.name}`,
    component: require.resolve('./src/templates/github-page.js'),
    context: {
      repo,
    },
  })
}

const createGithubPages = (repos, createPage) => {
  repos.nodes.forEach(repo => {
    createGithubPage(repo, createPage)
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageLength = 2

  const pageToPath = (index, pathPrefix, maxPages) => {
    if (pathPrefix !== null) {
      pathPrefix = `/${pathPrefix}`
    } else {
      pathPrefix = ''
    }
    if (index === 1) {
      return `${pathPrefix}/`
    }
    if (index > 1 && index <= maxPages) {
      return `${pathPrefix}/${index}`
    }
    return ''
  }

  createPage({
    path: '/test-page/',
    component: require.resolve('./src/templates/no-data.js'),
  })
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            github {
              viewer {
                repositories(
                  first: 100
                  orderBy: { field: STARGAZERS, direction: DESC }
                ) {
                  totalCount
                  nodes {
                    name
                    stargazers {
                      totalCount
                    }
                    createdAt
                    description
                    forkCount
                    homepageUrl
                    isFork
                    issues {
                      totalCount
                    }

                    primaryLanguage {
                      name
                    }
                    pullRequests {
                      totalCount
                    }
                    sshUrl
                    watchers {
                      totalCount
                    }
                  }
                }
                repositoriesContributedTo(
                  first: 100
                  orderBy: { field: STARGAZERS, direction: DESC }
                ) {
                  totalCount
                  nodes {
                    name
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }
            allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
              edges {
                node {
                  id
                  name: sourceInstanceName
                  path: absolutePath
                  remark: childMarkdownRemark {
                    id
                    frontmatter {
                      layout
                      path
                    }
                  }
                }
              }
            }
          }
        `
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }
        const {
          github: {
            viewer: { repositories, repositoriesContributedTo },
          },
        } = data

        createPage({
          path: '/github-repos/',
          component: require.resolve('./src/templates/github.js'),
          context: {
            repositories,
            repositoriesContributedTo,
          },
        })
        createGithubPages(repositories, createPage)
        // Create blog posts & pages.
        const items = data.allFile.edges
        const posts = items.filter(({ node }) => /posts/.test(node.name))
        each(posts, ({ node }) => {
          if (!node.remark) return
          const { path } = node.remark.frontmatter
          createPage({
            path,
            component: PostTemplate,
          })
        })

        const pages = items.filter(({ node }) => /page/.test(node.name))
        each(pages, ({ node }) => {
          if (!node.remark) return
          const { name } = path.parse(node.path)
          const PageTemplate = path.resolve(node.path)
          createPage({
            path: name,
            component: PageTemplate,
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
        pages: path.resolve(__dirname, 'src/pages'),
      },
    },
  })
}
