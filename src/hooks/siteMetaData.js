import { useStaticQuery, graphql } from 'gatsby'
const windowGlobal = typeof window !== 'undefined' && window

const useSiteMetadata = () => {
  // language=GraphQL
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            style
            layout
            adsense
            author
            description
            siteUrl
            title
            twitter
          }
        }
      }
    `
  )
  if (
    windowGlobal.localStorage &&
    !windowGlobal.localStorage.getItem('theme')
  ) {
    windowGlobal.localStorage.setItem('theme', site.siteMetadata.style)
  }
  return site.siteMetadata
}

export default useSiteMetadata
