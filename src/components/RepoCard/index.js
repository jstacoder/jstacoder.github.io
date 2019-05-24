import React, { useContext } from 'react'
import Emoji from 'react-emoji-render'
import { Link } from 'gatsby'
import { ThemeContext } from '../../theme-context'
import styled from 'styled-components'

import {
  StarIcon,
  GitBranchIcon,
  CircuitBoardIcon,
  OrganizationIcon,
  LocationIcon,
  LinkIcon,
  MailIcon,
} from 'react-octicons'

const RepoInfoWrapper = styled.div`
  height: 100%;
  flow-flow: column;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
`

const FlexView = styled.div`
  flex: 1;
`

function Index({ repository }) {
  const {
    state: { style },
  } = useContext(ThemeContext)
  return (
    <div
      className={`github-component height-full text-left ${
        style === 'dark' ? 'box-shadow' : 'border border-gray-light'
      } bg-white rounded-1 p-3`}
    >
      <RepoInfoWrapper>
        <div className="d-flex flex-justify-between flex-items-start mb-1">
          <h1 className="f4 lh-condensed mb-1">
            <Link to={`/github/${repository.name}`}>
              <span className="text-normal">{repository.owner.login}/</span>
              {repository.name}
            </Link>
          </h1>
        </div>
        <FlexView className="text-gray mb-2 ws-normal">
          <Emoji text={repository.description || ''} />
        </FlexView>
        <div className="d-flex f6">
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <StarIcon className={'mr-1'} width={14} height={16} />
            {repository.stargazers.totalCount}
          </a>
          <a href={repository.url} className="d-inline-block link-gray mr-4">
            <GitBranchIcon className={'mr-1'} height={16} width={10} />
            {repository.forkCount}
          </a>
        </div>
      </RepoInfoWrapper>
    </div>
  )
}

export default Index
