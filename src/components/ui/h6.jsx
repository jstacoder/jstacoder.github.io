import React from 'react'

import { HeadingWrapper } from '../shared/heading-wrapper'

export const H6 = props => {
  return <HeadingWrapper pl={'15px'} as={'h6'} color={'fontColor'} {...props} />
}
