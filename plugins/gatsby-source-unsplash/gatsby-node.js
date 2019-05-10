const axios = require('axios')
const queryString = require('query-string')

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://api.unsplash.com/?${apiOptions}`

  return axios.get(apiUrl).then(response => console.log(response))
}
