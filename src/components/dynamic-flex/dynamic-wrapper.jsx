import React from 'react'
import { BorderBox } from '@primer/components'

import DynamicElement from './dynamic-element'
import DynamicController from './dynamic-controller'
import { DynamicContextProvider } from './dynamic-context'
import { ActiveContextProvider } from './active-context'

const DynamicWrapper = props => {
  return (
    <DynamicContextProvider>
      <ActiveContextProvider>
        <BorderBox>
          <DynamicController />
        </BorderBox>
        <BorderBox>
          <DynamicElement num={1} />
          <DynamicElement num={2} />
          <DynamicElement num={3} />
          <DynamicElement num={4} />
        </BorderBox>
      </ActiveContextProvider>
    </DynamicContextProvider>
  )
}

export default DynamicWrapper
