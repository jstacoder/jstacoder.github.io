/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO() {
  const name = 'jstacoders profile'
  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title={name}
    />
  )
}

export default SEO
