import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H3 = props => {
  return <HeadingWrapper pl={'15px'} as={'h3'} color={'fontColor'} {...props} />
}
