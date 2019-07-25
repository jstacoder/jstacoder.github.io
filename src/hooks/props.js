import React, { useState } from 'react'

const useProps = (propList = []) => {
  const results = {}

  propList.forEach(prop => {
    const [value, setter] = useState()
    results[prop] = [value, setter]
  })
  return results
}

export default useProps
