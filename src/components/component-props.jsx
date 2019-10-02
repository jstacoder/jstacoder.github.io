import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropsTable    from 'react-docgen-props-table'
import { css } from 'styled-components'
import { Box } from '@primer/components'

import useThemeContext from '../hooks/themeContext'



const ComponentProps = ({component})=>{

    const { theme } = useThemeContext()
    const query = graphql `
    {
      allComponentMetadata {
        edges {
          node {
            component: displayName
            description {
              text
            }
            props {
              name
              description {
                text
              }
              type {
                value
                raw
                name
              }
              required
              defaultValue {
                value
              }
            }
          }
        }
      }
    }
`
    const data = useStaticQuery(query)    
    const propsList = data.allComponentMetadata.edges.filter(
      ({node})=> node.component === component.name
    )

    const props = propsList[0] && propsList[0].node && propsList[0].node.props    
    return props ? ( 
        <Box m={1}>
    <PropsTable css={css`td { color:${theme.colors.fontColor}; }`} props={props.reduce((prev, curr)=>{
        prev[curr.name] = curr
        if(prev[curr.name].description&&prev[curr.name].description.text){
            prev[curr.name].description = prev[curr.name].description.text
        }
        return prev
    } ,{})}/>
    </Box>
    ) : null
}

export default ComponentProps
