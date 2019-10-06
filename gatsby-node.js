/* eslint-disable prettier/prettier */
const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const DotenvWebpackPlugin = require('dotenv-webpack')
const dotenv = require('dotenv')
const { paginate } = require('gatsby-awesome-pagination')

dotenv.config()

module.paths.push(path.resolve('../', 'gatsby-theme-basic-blog'))

exports.onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions

  // mdx nodes
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    const prefix = `/${
      node.frontmatter.menu && node.frontmatter.menu.toLowerCase() !== 'none'
        ? node.frontmatter.menu.toLowerCase()
        : 'blog'
    }`
    createNodeField({
      name: 'slug',
      node,
      value: `${prefix}${value}`,
    })
  }

  // markdown nodes
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
  const githubComponent = require.resolve('./src/templates/github-page.js')
  const githubBranchComponent = require.resolve(
    './src/templates/github-branch.jsx'
  )

  const createGithubPages = repos => repos.nodes.forEach(createGithubPage)

  const createGithubPage = repo => {
    createPage({
      path: `/github/${repo.name}`,
      component: githubComponent,
      context: {
        repo,
        repoName: repo.name,
      },
    })
    repo.refs.branches.map(({ name: branchName }) => {
      const owner = repo.owner.login
      createPage({
        path: `/github/${repo.name}/${branchName}`,
        component: githubBranchComponent,
        context: {
          repoName: repo.name,
          branchName,
          owner,
        },
      })
    })
  }

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
    // language=GraphQL
    resolve(
      graphql(
        `
          {
            allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                }
              }
            }
            github {
              viewer {
                repositories(
                  first: 10
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
                    owner {
                      login
                    }
                    refs(refPrefix: "refs/heads/", first: 20) {
                      branches: nodes {
                        name
                      }
                    }
                  }
                }
                repositoriesContributedTo(
                  first: 10
                  orderBy: { field: STARGAZERS, direction: DESC }
                ) {
                  totalCount
                  nodes {
                    owner {
                      login
                    }
                    name
                    stargazers {
                      totalCount
                    }
                    refs(refPrefix: "refs/heads/", first: 20) {
                      branches: nodes {
                        name
                      }
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
          // console.log(errors)
          reject(errors)
        }
        const {
          allMdx: { edges: mdxPosts } = {},
          allPosts: { posts } = {},
          github: {
            viewer: { repositories, repositoriesContributedTo },
          },
        } = data || {}

        createPage({
          path: `/github-repos/`,
          component: require.resolve(`./src/templates/github.js`),
          context: {
            repositories,
            repositoriesContributedTo,
          },
        })
        createGithubPages(repositories)
        createGithubPages(repositoriesContributedTo)
        each(mdxPosts, ({ node }) => {
          node.fields.slug &&
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/components/mdx-layout.js`),
              context: {
                id: node.id,
              },
            })
        })

        // Create blog posts & pages.
        each(posts, ({ post: node }) => {
          if (node === undefined) return
          const name = node.frontmatter.title

          const PageTemplate = require.resolve(`./src/templates/postTemplate`)
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
    plugins: [new DotenvWebpackPlugin()],
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
        '~components': path.resolve(__dirname, 'src/components'),
        '~templates': path.resolve(__dirname, 'src/templates'),
        '~scss': path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
