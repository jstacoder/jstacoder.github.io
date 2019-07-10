import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H2 = props => {
  return <HeadingWrapper pl={'15p'} as={'h2'} color={'fontColor'} {...props} />
}
