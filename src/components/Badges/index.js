import React from 'react'
import map from 'lodash/map'

export default function Badges({ items, primary }) {
  return map(items, (item, i) => {
    return (
      <span
        className={`badge ${primary ? 'badge-primary' : 'badge-secondary'}`}
        key={i}
      >
        {item}
      </span>
    )
  })
}
