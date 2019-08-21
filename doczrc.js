const images = require('remark-images')

export default {
  themeConfig: {
    mode: 'dark',
  },
  mdPlugins: [images],
  showPlaygroundEditor: true,
}
