import React, { useContext } from 'react'
import Emoji from 'react-emoji-render'
import { Link } from 'gatsby'
import { ThemeContext } from '../theme-context'
import { StarIcon, RepoIcon, GitBranchIcon } from 'react-octicons'
import styled from 'styled-components'
import { mr, mx } from 'styled-components-spacing'

const makeIcon = Icon => ({ className, ...props }) => (
  <Icon className={className} {...props} />
)

const RepoStar = makeIcon(styled(StarIcon)`
  ${mr(1)}
`)

const RepoGitBranch = makeIcon(styled(GitBranchIcon)`
  ${mr(1)}
`)

const RepoRepo = makeIcon(styled(RepoIcon)`
  ${mr(1)}
`)

const RepoLanguageText = styled.span`
  ${mx(2)};
  color: grey;
`

const RepoColor = styled.span`
  border-radius: 50%;
  display: inline-block;
  height: 12px;
  position: relative;
  top: 1px;
  width: 12px;
  background-color: ${props => props.color};
`

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
          <h1 className="f5 lh-condensed mb-1">
            <Link to={`/github/${repository.name}`}>
              <RepoRepo />
              <span className="text-normal">{repository.owner.login}/</span>
              {repository.name}
            </Link>
          </h1>
        </div>
        <div style={{ flex: 1 }} className="text-gray mb-2 f4 ws-normal">
          <Emoji text={repository.description || ''} />
        </div>
        <div className="d-flex f6">
          <RepoColor color={repository.language.color} />
          <RepoLanguageText>{repository.language.name}</RepoLanguageText>
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <RepoStar />
            {repository.stargazers.totalCount}
          </a>
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <RepoGitBranch />
            {repository.forkCount}
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoCard
