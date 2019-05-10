import React from 'react'
import { Link } from 'gatsby'

export default function Button({
  path,
  label,
  primary,
  className = 'readmore',
}) {
  return (
    <Link className={className} to={path}>
      <span
        className={`btn btn-outline-primary btn-block ${
          primary ? 'btn-outline-primary' : 'btn-outline-secondary'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}
