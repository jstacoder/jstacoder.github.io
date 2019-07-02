const axios = require('axios')
const queryString = require('query-string')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.sourceNodes = async (
  {
    store,
    cache,
    createContentDigest,
    actions,
    getNode,
    createNodeId,
    schema,
    _auth,
  },
  configOptions
) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'PhotoObjectType',
      fields: {
        id: {
          type: 'ID!',
        },
      },
    }),
  ]
  // const typeDefs = [
  //   schema.buildObjectType({
  //     name: 'MarkdownRemark',
  //     fields: {
  //       frontmatter: 'Frontmatter!'
  //     },
  //     interfaces: ['Node'],
  //   }),
  //   schema.buildObjectType({
  //     name: 'Frontmatter',
  //     fields: {
  //       title: {
  //         type: 'String!',
  //         resolve(parent) {
  //           return parent.title || '(Untitled)'
  //         }
  //       },
  //       author: 'AuthorJson!',
  //       date: 'Date!',
  //       published: 'Boolean!',
  //       tags: '[String!]',
  //     }
  //   }),
  //   schema.buildObjectType({
  //     name: 'AuthorJson',
  //     fields:{
  //       firstName: {
  //         type: 'String!'
  //       },
  //       lastName: {
  //         type: 'String!'
  //       }
  //     }
  //   })
  // ]
  // createTypes(typeDefs)
  const { createNode, touchNode } = actions

  const { UNSPLASH_API_KEY } = configOptions

  // console.log(UNSPLASH_API_KEY)
  delete configOptions.plugins

  const processPhoto = photo => {
    const nodeId = createNodeId(`unsplash-photo-${photo.id}`)
    const nodeContent = JSON.stringify(photo)
    const nodeData = {
      ...photo,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'UnsplashPhoto',
        content: nodeContent,
        contentDigest: createContentDigest(photo),
        mediaType: 'image/jpg',
      },
    }
    return nodeData
  }

  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://api.unsplash.com/photos?client_id=${UNSPLASH_API_KEY}`
  // console.log(apiOptions, apiUrl)

  return axios.get(apiUrl).then(async response => {
    response.data.forEach(async photo => {
      const nodeData = processPhoto(photo)
      createNode(nodeData)

      const node = getNode(nodeData.id)

      let fileNode
      console.log(node)

      try {
        fileNode = await createRemoteFileNode({
          url: node.urls.raw,
          parentNodeId: node.id,
          store,
          cache,
          createNode,
          createNodeId,
          ext: '.jpg',
        })
        // console.log(fileNode)
      } catch (e) {}
    })
  })
}
