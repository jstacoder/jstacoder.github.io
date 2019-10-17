exports.default = {
  gatsbyRemarkPlugins: [
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 750,
        linkImagesToOriginal: false,
        wrapperStyle: 'margin-bottom: 1.0725rem;',
      },
    },
  ],
}
