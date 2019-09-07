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
  // console.log('jahaha')
  // process.exit()
  const typeDefs = [
    schema.buildObjectType({
      name: 'PhotoObjectType',
      fields: {
        id: {
          type: 'ID!',
        },
      },
      interfaces: ['Node'],
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
  const { createNode, touchNode, createNodeField } = actions

  const {
    UNSPLASH_API_KEY,
    plugins,
    random,
    searchTerms,
    queryOptions,
  } = configOptions

  const processPhoto = (photo, searchTerm) => {
    const nodeId = createNodeId(`unsplash-photo-${photo.id}`)
    const nodeContent = JSON.stringify(photo)
    const nodeData = {
      ...photo,
      searchTerm,
      id: nodeId,
      unsplashId: photo.id,
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

  const getApiOptions = ({ queryOptions, searchTerm }) =>
    queryString.stringify({
      ...queryOptions,
      query: searchTerm,
    })

  const getApiUrl = searchTerm =>
    `https://api.unsplash.com/photos/${
      random ? 'random' : ''
    }?client_id=${UNSPLASH_API_KEY}&${getApiOptions({
      queryOptions,
      searchTerm,
    })}`
  console.log('TERMS: ', searchTerms)
  return searchTerms.map(searchTerm => {
    const apiUrl = getApiUrl(searchTerm)
    console.log(`url for ${searchTerm} is ${apiUrl}`)

    return axios.get(apiUrl).then(async response =>
      response.data.map(async photo => {
        console.log(`attaching ${searchTerm} to ${photo.id}`)
        const nodeData = processPhoto(photo, searchTerm)
        createNode(nodeData)

        const node = getNode(nodeData.id)

        let fileNode
        // console.log(node)

        try {
          fileNode = await createRemoteFileNode({
            url: node.links.download,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
            ext: '.jpg',
          })
          // console.log(fileNode)
          createNodeField({
            node: fileNode,
            name: 'unsplashSearchTerm',
            value: searchTerm,
          })
          return fileNode
        } catch (e) {}
      })
    )
  })
}
