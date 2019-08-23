/** @jsx jsx */

import { jsx, Box } from 'theme-ui'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import PhotoCredit from './photo-credit.mdx'

export const TaskListPhoto = props => {
  const photoQuery = graphql`
    query photoQuery {
      photo: file(
        relativePath: { eq: "2016-06-30-react-hooks-tasklist/tasklist.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1035) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `

  const {
    photo: { childImageSharp: fluid },
  } = useStaticQuery(photoQuery)
  return (
    <Box>
      <Img fluid={fluid} sx={{ display: 'block', margin: '0 auto' }} />
      <PhotoCredit />
    </Box>
  )
}
