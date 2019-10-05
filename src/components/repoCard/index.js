import React from 'react'
import Emoji from 'react-emoji-render'
import { Link } from 'gatsby'
import useThemeContext from '../../hooks/themeContext'
import { StarIcon, RepoIcon, GitBranchIcon } from 'react-octicons'
import {
  Box,
  Text,
  BorderBox,
  StyledOcticon,
  Heading,
  Flex,
  Link as PrimerLink,
} from '@primer/components'
import styles from '../layout.scss'
import styled, { css } from 'styled-components'
import repoStyles from './repoCard.module.scss'

const repoColorBallStyle = css`
  border-radius: 50%;
  display: inline-block;
  height: 12px;
  position: relative;
  top: 1px;
  width: 12px;
`

const repoTextStyle = css`
  color: ${({ theme }) => theme.colors.gray[6]};
`

const RepoTextBox = styled(Box)`
  ${repoTextStyle}
`

const RepoColorBall = styled(Box)`
  ${repoColorBallStyle};
  background-color: ${props => props.color};
`

const RepoLanguageText = ({ name }) => (
  <RepoTextBox as={'span'} mr={2}>
    {name}
  </RepoTextBox>
)

const RepoColor = ({ color, ...props }) => (
  <RepoColorBall {...props} as={'span'} bg={color} mr={2} mt={1} />
)

function RepoCard({ repository }) {
  const { style, theme } = useThemeContext()
  return (
    <BorderBox
      className={`${styles.githubComponent}`}
      height={'100%'}
      textAlign={'left'}
      bg={'white'}
      borderRadius={3}
      p={3}
      border={theme.border && theme.border}
      borderColor={'lightBorder'}
      boxShadow={theme.boxShadow && theme.boxShadow}
      px={3}
      mx={2}
    >
      <Flex
        height={'100%'}
        flexFlow={'column'}
        justifyContent={'flex-start'}
        flexDirection={'column'}
      >
        <Flex.Item
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          mb={1}
        >
          <Heading fontSize={`13px`} lineHeight={1.25} mb={1}>
            <Link to={`/github/${repository.name}`}>
              <StyledOcticon icon={RepoIcon} marginRight={1} />
              <Text ml={1} fontWeight={'normal'}>
                {repository.owner.login}/
              </Text>
              {repository.name}
            </Link>
          </Heading>
        </Flex.Item>
        <Flex.Item flex={1} mb={'2'}>
          <Text
            className={repoStyles.repoText}
            as={'p'}
            color="darkText"
            whiteSpace="normal"
            fontSize={4}
          >
            <Emoji text={repository.description || ''} />
          </Text>
        </Flex.Item>
        <Flex.Item fontSize={6}>
          <Flex justifyContent={'space-between'}>
            <Flex.Item display={'inline-flex'}>
              <RepoColor color={repository.language.color} />
              <RepoLanguageText name={repository.language.name} />
            </Flex.Item>
            <Flex.Item display={'inline-flex'}>
              <PrimerLink
                href={repository.url}
                display={'inline-flex'}
                color={'gray'}
                mr={1}
              >
                <StyledOcticon icon={StarIcon} marginRight={1} />
                {repository.stargazers.totalCount}
              </PrimerLink>
            </Flex.Item>
            <Flex.Item display={'inline-flex'}>
              <PrimerLink
                href={repository.url}
                display={'inline-flex'}
                color={'gray'}
                mr={1}
              >
                <StyledOcticon icon={GitBranchIcon} marginRight={1} />
                {repository.forkCount}
              </PrimerLink>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </BorderBox>
  )
}

export default RepoCard
