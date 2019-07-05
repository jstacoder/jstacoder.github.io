import React, { useMemo, useState } from 'react'
import { BorderBox, Box} from '@primer/components'

import { CustomCheckbox, CheckboxList } from './'

export const ControlledExample = props =>{
  const [value, setValue] = useState(false)

  const toggleValue = () => setValue(!value)

  const onChange = () => toggleValue()
  return (
    <BorderBox p={4} m={3} display={'flex'}>
      <Box m={2} p={2} style={{flex: 1}}>
        <CustomCheckbox onChange={onChange} checked={value} />
      </Box>
      <BorderBox p={2} m={2} style={{flex: 5}}>
        {`${value ? '': 'not '} clicked`}
      </BorderBox>
      <BorderBox p={2} m={2} onClick={toggleValue} style={{flex: 2}}>
        click here to toggle
      </BorderBox>
    </BorderBox>
  )
}



export const ListExample = props => {
  const items = useMemo(()=> ['do stuff', 'do more', 'again again', 'last one'])

  const [activeItems, setActiveItems] = useState(items)

  const removeItem = item => setActiveItems(activeItems.filter(itm=> itm !== itm))

  const resetItems = () => setActiveItems(items)

  return (
    <Box>
      <CheckboxList items={activeItems}/>
    </Box>
  )
}
