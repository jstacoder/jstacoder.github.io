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
import styles from './repoCard.module.scss'

const RepoLanguageText = ({ name }) => (
  <Box as={'span'} mr={2} className={styles.repoText}>
    {name}
  </Box>
)

const RepoColor = ({ color, ...props }) => (
  <Box
    {...props}
    as={'span'}
    bg={color}
    mr={2}
    mt={1}
    className={`${styles.repoColorBall} ${color}`}
  />
)

function RepoCard({ repository }) {
  const { style } = useThemeContext()
  return (
    <BorderBox
      className={`${styles.githubComponent}`}
      height={'100%'}
      textAlign={'left'}
      bg={'white'}
      borderRadius={1}
      p={3}
      boxShadow={`${style === 'dark'}`}
      borders={`${(style === 'light' && 'gray.1') || false}`}
    >
      <Flex
        height={'100%'}
        flexFlow={'column'}
        justifyContent={'flex-start'}
        flexDirection={'column'}
      >
        <Flex.Item
          justifyContent={'space-between'}
          alignItem={'flex-start'}
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
        <Flex.Item
          flex={1}
          color={`gray`}
          mb={'2'}
          fontSize={4}
          className="ws-normal"
        >
          <Emoji text={repository.description || ''} />
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
