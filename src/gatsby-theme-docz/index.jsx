import React from 'react'
import { theme, useConfig, ComponentsProvider } from 'docz'
import { ThemeProvider } from 'theme-ui'
import baseComponents from 'gatsby-theme-docz/src/components'
import baseTheme from 'gatsby-theme-docz/src/theme'
import {themes} from '../theme-context'
import merge from 'lodash/merge'

const components = {
    ...baseComponents,
}

const Theme = ({children})=>{
    const { themeConfig } = useConfig()

    console.log(themeConfig)

    return (
        <ThemeProvider theme={themeConfig} components={components}>
            <ComponentsProvider components={components}>
                {children}
            </ComponentsProvider>
        </ThemeProvider>
    )
}

export const themeConfig = merge(baseTheme,{
    colors: themes.light.colors,
    // colors:{    
    //     ...themes.light.colors,
    //     lightText: 'green',
    //     darkBackground: 'purple',
    //     background: 'lightgray',
    //     header: {
    //         bg: baseTheme.colors.muted,
    //         button: {
    //             bg: 'white',
    //             color: 'grey'
    //         }
    //     }, 
    //     sidebar:{            
    //         bg: baseTheme.colors.muted,

    //     },
    //     modes: {
    //         dark:{
    //             ...themes.dark.colors,
    //             lightText: 'pink',
    //             darkBackground: 'gray'
    //         }
    //     }
    // }
})

export default theme(themeConfig)(Theme)