const remark = require('remark')
const remarkAttr = require('remark-attr')
const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  visit(markdownAST, `*`, node => {
    const processedText = String(
      remark()
        .use(remarkAttr, pluginOptions)
        .processSync(node.value)
    )
    node.value = processedText
  })
  return markdownAST
}
