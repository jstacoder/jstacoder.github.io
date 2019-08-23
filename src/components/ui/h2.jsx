import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H2 = props => {
  return <HeadingWrapper pl={'15px'} as={'h2'} fontSize={'22px'} {...props} />
}
