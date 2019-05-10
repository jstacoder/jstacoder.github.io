const { buildClientSchema } = require(`graphql`)
const { createHttpLink } = require(`apollo-link-http`)
const fetch = require('node-fetch')
const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Gatstrap',
    description: 'Jstacoders Info',
    siteUrl: 'https://gatstrap.netlify.com',
    author: 'jstacoder',
    twitter: 'amigodornot666',
    adsense: '',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-unsplash',
      options: {
        UNSPLASH_API_KEY: process.env.UNSPLASH_ACCESS_KEY,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        fieldName: 'github',
        typeName: 'Github',
        createLink: () =>
          createHttpLink({
            uri: `https://api.github.com/graphql`,
            headers: {
              Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            },
            fetch,
          }),
        createSchema: async () => {
          const json = require('./github.json') //JSON.parse(fs.readFileSync(`${__dirname}/github.json`))
          return buildClientSchema(json.data)
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data/`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images/`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-emoji',
            options: {},
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Gatstrap',
        short_name: 'Gatstrap',
        description: 'Gatsby starter for bootstrap a blog',
        homepage_url: 'https://gatstrap.netlify.com',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#673ab7',
        display: 'standalone',
        icons: [
          {
            src: '/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
  ],
  __experimentalThemes: [
    {
      resolve: path.resolve('../gatsby-theme-basic-blog'),
    },
    // {
    //   resolve: 'gatsby-theme-docz'
    // }
  ],
}
