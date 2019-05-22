import React, { useContext } from 'react'
import Emoji from 'react-emoji-render'
import { Link } from 'gatsby'
import { ThemeContext } from '../theme-context'

function RepoCard({ repository }) {
  const {
    state: { style },
  } = useContext(ThemeContext)
  return (
    <div
      className={`github-component height-full text-left ${
        style === 'dark' ? 'box-shadow' : 'border border-gray-light'
      } bg-white rounded-1 p-3`}
    >
      <div
        style={{
          height: '100%',
          flexFlow: 'column',
          justifyContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="d-flex flex-justify-between flex-items-start mb-1">
          <h1 className="f4 lh-condensed mb-1">
            <Link to={`/github/${repository.name}`}>
              <span className="text-normal">{repository.owner.login}/</span>
              {repository.name}
            </Link>
          </h1>
        </div>
        <div style={{ flex: 1 }} className="text-gray mb-2 ws-normal">
          <Emoji text={repository.description || ''} />
        </div>
        <div className="d-flex f6">
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <svg
              className="octicon octicon-star mr-1"
              viewBox="0 0 14 16"
              version="1.1"
              width="14"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
              />
            </svg>
            {repository.stargazers.totalCount}
          </a>
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <svg
              className="octicon octicon-git-branch mr-1"
              viewBox="0 0 10 16"
              version="1.1"
              width="10"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
              />
            </svg>
            {repository.forkCount}
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoCard
