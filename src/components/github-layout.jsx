import React from 'react'
import { BorderBox, Box } from '@primer/components'
import MastHead from './mastHead'

import useThemeContext from '../hooks/themeContext'

const Layout = ({children})=>{
  const { style } = useThemeContext()
  return (
      <BorderBox
          display={[null, null, 'flex']}
          border={0}
          borderBottom={[null, null, style !== 'dark' ? 1 : 0]}
        >
          <BorderBox
            alignSelf={'stretch'}
            bg={style === 'dark' ? 'gray.9' : 'white'}
            borderColor={style !== 'dark' ? 'gray.1' : ''}
            borderRight={style !== 'dark' ? 1 : 0}
            border={0}
            px={[4, 4, 6, 7]}
            py={6}
            width={{ sm: 5 / 12, md: 4 / 12, lg: 3 / 12 }}
          >
            <MastHead metaData={true} />
          </BorderBox>
          <BorderBox
            width={{ sm: 7 / 12, md: 8 / 12, lg: 9 / 12 }}
            px={{ sm: 4, md: 4, lg: 7 }}
            border={0}
            borderTop={[1, 1, 0, 0]}
            bg={style === 'dark' ? 'gray.8' : 'gray.1'}
            py={6}
          >
            <Box mx={'auto'} maxWidth={900}>
              {children}
            </Box>
          </BorderBox>
        </BorderBox>
  )
}

export default Layout
