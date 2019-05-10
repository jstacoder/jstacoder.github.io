const axios = require('axios')
const queryString = require('query-string')

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest, schema },
  configOptions
) => {
  const { createNode, createTypes } = actions
  //
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

  const { UNSPLASH_API_KEY } = configOptions

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
  console.log(apiOptions, apiUrl)

  return axios.get(apiUrl).then(response => {
    response.data.forEach(photo => {
      const nodeData = processPhoto(photo)
      createNode(nodeData)
    })
  })
}
