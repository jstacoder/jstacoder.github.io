const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

module.paths.push(path.resolve('../', 'gatsby-theme-basic-blog'))

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

exports.onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions
  console.log(node.internal.type)
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    const [postYear, postMonth, postDay, ...filenames] = slug
      .replace('/', '')
      .split('-')
    const filename = filenames.join('-')
    createNodeField({
      node,
      name: 'slug',
      value: `/${postYear}/${postMonth}/${postDay}/${filename}`,
    })
    createNodeField({
      node,
      name: 'postDate',
      value: `${postYear}-${postMonth}-${postDay}`,
    })
  }
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
            allPosts: allMarkdownRemark(
              filter: { frontmatter: { published: { eq: true } } }
            ) {
              posts: edges {
                post: node {
                  id
                  path: fileAbsolutePath
                  fields {
                    postDate
                    slug
                  }
                  frontmatter {
                    layout
                    title
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
          allPosts: { posts },
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
        each(posts, ({ post: node }) => {
          if (node === undefined) return
          const name = node.frontmatter.title

          const PageTemplate = require.resolve('./src/templates/PostTemplate')
          createPage({
            path: node.fields.slug,
            component: PageTemplate,
            context: {
              slug: node.fields.slug,
              date: node.fields.postDate,
            },
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
        'gatsby-theme-basic-blog': path.resolve(
          __dirname,
          '..',
          'gatsby-theme-basic-blog'
        ),
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
