const { buildClientSchema } = require(`graphql`)
const { createHttpLink } = require(`apollo-link-http`)
const fetch = require('node-fetch')
const path = require('path')
const dotenv = require('dotenv')

//process.env.NODE_ENV === 'development' && dotenv.config()
dotenv.config()

module.exports = {
  siteMetadata: {
    title: 'Jstacoders profile',
    description: 'Jstacoders Info',
    siteUrl: 'https://jstacoder.github.io',
    author: 'jstacoder',
    twitter: 'jstacoder',
    adsense: '',
    style: `dark`,
    layout: `sidebar`,
  },
  pathPrefix: process.env.PATH_PREFIX || '/',
  plugins: [
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Cantarell`,
    //         variants: [`400`, `700`]
    //       },
    //       {
    //         family: `Comforta`,
    //         variants: [`300`,`500`, `700`]
    //       },
    //       {
    //         family: `Handlee`
    //       },
    //       {
    //         family: `Lato`,
    //         variants: [`400i`]
    //       },
    //       {
    //         family: `Marck+Script`,
    //       },
    //       {
    //         family: `Neucha`
    //       },
    //       {
    //         family:`Satisfy`
    //       }
    //     ],
    //   },
    // },
    `gatsby-transformer-react-docgen`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
      //   // importLoaders: 1,
      //   // modules: true,
      //   localIdentName: '[name]__[local]'
      // }
    },
    `gatsby-transformer-yaml`,
    /*{
      resolve: './plugins/gatsby-source-unsplash',
      options: {
        UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
        random: true,
        searchTerms: ['mountains', 'vanilla', 'ice', 'lazy', 'easy'],
        queryOptions: {
          count: 1,
        },
      },
    },*/
    {
      resolve: 'gatsby-source-graphql',
      options: {
        fieldName: 'github',
        typeName: 'Github',
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `bearer ${process.env.GH_API_KEY}`,
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/components/`,
        name: 'docs',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/`,
        name: 'filesystem',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/`,
        name: 'yaml',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {
              directory: `${__dirname}/src/examples/`,
            },
          },
          // 'gatsby-remark-tables',
          {
            resolve: 'gatsby-remark-emoji',
            options: {},
          },
          `gatsby-remark-unwrap-images`,
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
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-remark-codemirror`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Jstacoders Profile',
        short_name: 'Profile',
        description: 'My Profile Page',
        homepage_url: 'https://jstacoder.github.io',
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
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'UA-140530265-1',
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
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    // {
    //   resolve: `gatsby-theme-mdx`,
    //   options: {
    //     //   remarkPlugins: [{
    //     //     resolve: `gatsby-remark-unwrap-images`,
    //     //   options: {
    //     //     maxWidth: 1035,
    //     //     sizeByPixelDensity: true,
    //     //   }
    //     // }]
    //   }
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          { resolve: `gatsby-remark-unwrap-images` },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1152,
              linkImagesToOriginal: false,
              quality: 100,
              withWebp: true,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
        ],
        plugins: ['gatsby-remark-images'],
      },
    },
    `gatsby-theme-docz`,
    // {
    //   resolve: `gatsby-plugin-theme-ui`,
    //   options: {
    //     mdx: false
    //   }
    // },
    //    'gatsby-plugin-mdx',
    `gatsby-theme-style-guide`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'unsplashPhoto',
        imagePath: 'links.download',
      },
    },
  ],
}
