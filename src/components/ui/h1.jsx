import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H1 = props => {
  return <HeadingWrapper pl={'15p'} as={'h1'} color={'fontColor'} {...props} />
}
