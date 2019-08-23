import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H1 = props => {
  return <HeadingWrapper pl={'15px'} as={'h1'} fontSize={'25px'} {...props} />
}
