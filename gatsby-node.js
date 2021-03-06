/* eslint-disable prettier/prettier */
const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const DotenvWebpackPlugin = require('dotenv-webpack')
const dotenv = require('dotenv')
const { paginate } = require('gatsby-awesome-pagination')
const rehypePrism = require('@mapbox/rehype-prism')
const remarkFrontmatter = require('remark-frontmatter')
const remarkDocz = require('remark-docz')
const rehypeSlug = require('rehype-slug')
const rehypeDocz = require('rehype-docz')

const refractor = require('refractor/core.js')
const jsxSyntax = require('refractor/lang/jsx.js')

jsxSyntax.aliases = ['mdx']

refractor.register(jsxSyntax)
refractor.register(require('refractor/lang/markdown.js'))

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
  const githubFilesComponent = require.resolve(
    './src/templates/github-files.jsx'
  )

  const createGithubPages = (repos, viewer) =>
    repos.nodes.forEach(repo => createGithubPage({ repo, viewer }))

  const createGithubPage = ({ repo, viewer }) => {
    const owner = repo.owner.login
    const repoPath = `/github/${owner}/${repo.name}`
    createPage({
      path: repoPath,
      component: githubComponent,
      context: {
        repo,
        repoName: repo.name,
      },
    })
    // // repo.refs.branches.map(({ name: branchName, ...branch }) => {
    // //   const ownerIsViewer = owner === viewer.login
    // //   const branchPath = `${repoPath}/${branchName}`
    // //   const context = {
    // //     repoName: repo.name,
    // //     branchName,
    // //     owner,
    // //     ownerIsViewer,
    // //     apiUrl: process.env.GH_API_KEY,
    // //   }
    // //   createPage({
    // //     path: branchPath,
    // //     component: githubBranchComponent,
    // //     context,
    // //   })
    // //   if (ownerIsViewer && branch.target) {
    // //     context.commitUrl = branch.target.commitUrl
    // //     context.parentPath = branchPath
    // //     const commitPath = `${branchPath}/${branch.target.sha}`
    // //     createPage({
    // //       path: commitPath,
    // //       component: githubFilesComponent,
    // //       context,
    // //     })
    // //   }
    // })
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
            commentApi {
              getBlogs {
                blogId: id
                name
              }
            }
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
                login
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
                        target {
                          ... on Github_Commit {
                            sha: oid
                            commitUrl
                          }
                        }
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
          commentApi: { getBlogs: blogs } = {},
          allMdx: { edges: mdxPosts } = {},
          allPosts: { posts } = {},
          github: {
            viewer: { repositories, repositoriesContributedTo, login },
          },
        } = data || {}

        blogs.forEach(({ name, blogId }) => {
          createPage({
            path: `/blog/${name}/posts/`,
            component: require.resolve('./src/templates/add-post-form.js'),
            context: {
              name,
              blogId,
            },
          })
        })

        createPage({
          path: `/github-repos/`,
          component: require.resolve(`./src/templates/github.js`),
          context: {
            repositories,
            repositoriesContributedTo,
          },
        })
        createGithubPages(repositories, { login })
        createGithubPages(repositoriesContributedTo, { login })
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

// exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
//   console.log(loaders)
//   let config = {
//     // module: {
//     //   rules: [
//     //     {
//     //       test: /.mdx?$/,
//     //       use:[
//     //         {
//     //           loader: 'babel-loader',
//     //           options: {
//     //             presets: ['preset-env']
//     //           }
//     //         },
//     //         {
//     //           loader: '@mdx-js/loader',
//     //           options: {
//     //             rehypePlugins: [rehypePrism, rehypeDocz, rehypeSlug],
//     //             remarkPlugins: [remarkFrontmatter, remarkDocz]
//     //           }
//     //         },
//     //       ]
//     //     }
//     //
//     //   ]
//     // },
//     // plugins: [new DotenvWebpackPlugin()],
//     // resolve: {
//     //   alias: {
//     //     'gatsby-theme-basic-blog': path.resolve(
//     //       __dirname,
//     //       '..',
//     //       'gatsby-theme-basic-blog'
//     //     ),
//     //   },
//     // },
//   }
//   // if (stage === 'build-html') {
//   //   config.module.rules = [
//   //     ...config.module.rules,
//   //     {
//   //       test: /react-ace|brace/,
//   //       use: loaders.null(),
//   //     },
//   //   ]
//   // }
//   actions.setWebpackConfig(config)
// }
