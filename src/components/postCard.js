import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ThemeContext } from '../theme-context'
import { RepoIcon, GraphIcon } from 'react-octicons'

export function formatePostDate(dateString) {
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
  })} ${date.toLocaleDateString('en-US', {
    day: 'numeric',
  })}, ${date.toLocaleDateString('en-US', { year: 'numeric' })}`
}

function PostCard({ post }) {
  const {
    state: { style },
  } = useContext(ThemeContext)
  return (
    <div
      className={`height-full text-left ${
        style === 'dark' ? 'box-shadow' : 'border border - gray - light'
      } bg-white rounded-1 p-3`}
    >
      <div className="d-flex flex-justify-between flex-items-start mb-1">
        <h1 className="f4 lh-condensed mb-1">
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h1>
      </div>
      <div className="text-gray mb-2 ws-normal">{`${''}`}</div>
    </div>
  )
}

export default PostCard
