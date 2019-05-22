const path = require('path')

module.exports = ({ config }) => {
  const {
    module: { rules },
  } = config
  rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
  rules[0].use[0].loader = require.resolve('babel-loader')
  rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ]
  rules[0].use[0].options.plugins = [
    require.resolve('@babel/plugin-proposal-class-properties'),
  ]
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...rules,
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: path.resolve('../'),
        },
      ],
    },
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      alias: {
        'gatsby-theme-basic-blog': path.resolve(
          __dirname,
          '../gatsby-theme-basic-blog'
        ),
        components: path.resolve('src', 'components'),
        templates: path.resolve('src', 'templates'),
        scss: path.resolve('src', 'scss'),
      },
    },
  }
}
