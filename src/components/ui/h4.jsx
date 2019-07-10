import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H4 = props => {
  return <HeadingWrapper pl={'15p'} as={'h4'} color={'fontColor'} {...props} />
}
