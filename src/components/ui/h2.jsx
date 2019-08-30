/** @jsx jsx */
import { jsx } from 'theme-ui'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H2 = props => {
  return (
    <HeadingWrapper 
      styles={{
        a: {
          color: 'orange.3'
        }
      }}
      sx={{
        pl:'15px', 
        fontSize: '22px'
      }} 
      as={'h2'} 
      {...props} />
  )
}
