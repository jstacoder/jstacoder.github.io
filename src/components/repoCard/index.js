import React from 'react'
import Emoji from 'react-emoji-render'
import { Link } from 'gatsby'
import useThemeContext from '../../hooks/themeContext'
import { StarIcon, RepoIcon, GitBranchIcon } from 'react-octicons'
import styled from 'styled-components'
import { mr, mx } from 'styled-components-spacing'
import { space } from 'styled-system'
import { mr } from 'styled-components-spacing'
import {
  Box,
  Text,
  BorderBox,
  Avatar,
  BranchName,
  StyledOcticon,
  Heading,
} from '@primer/components'
import styles from './repoCard.module.scss'

const makeIcon = Icon => ({ className, children, ...props }) => (
  <Icon className={className} {...props}>
    {children}
  </Icon>
)

const Span = ({ children, ...props }) => <span {...props}>{children}</span>

const RepoStar = makeIcon(styled(StarIcon)`
  ${mr(1)}
`)

const RepoGitBranch = makeIcon(styled(GitBranchIcon)`
  ${mr(1)}
`)

const RepoRepo = makeIcon(styled(RepoIcon)`
  ${mr(1)}
`)

const RepoLanguageText = props => (
  <Span className={`mr-2 ${styles.repoText}`} {...props} />
)
const RepoColor = ({ color, ...props }) => (
  <Span
    {...props}
    style={{ backgroundColor: color }}
    className={`mr-2 mt-1 ${styles.repoColorBall} ${color}`}
  />
)

function RepoCard({ repository }) {
  const { style } = useThemeContext()
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
              <StyledOcticon icon={RepoIcon} marginRight={1} />
              <span className="ml-1 text-normal">
                {repository.owner.login}/
              </span>
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
            <StyledOcticon icon={StarIcon} marginRight={1} />
            {repository.stargazers.totalCount}
          </a>
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <StyledOcticon icon={GitBranchIcon} marginRight={1} />
            {repository.forkCount}
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoCard
