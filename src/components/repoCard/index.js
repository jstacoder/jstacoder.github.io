/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
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
  //Flex,
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
      sx={{
        height: '100%',
        textAlign: 'left',
        bg: 'white',
        borderRadius: 3,
        p: 3,
        border: theme.border,
        borderColor: 'lightBorder',
        boxShadow: theme.boxShadow,
        px: 3,
        mx: 2,
      }}
    >
      <Flex
        sx={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Heading
            sx={{
              fontSize: `13px`,
              lineHeight: 1.25,
              mb: 1,
            }}
          >
            <Link to={`/github/${repository.owner.login}/${repository.name}`}>
              <StyledOcticon icon={RepoIcon} marginRight={1} />
              <Text
                sx={{
                  ml: 1,
                  fontWeight: 'normal',
                }}
              >
                {repository.owner.login}/
              </Text>
              {repository.name}
            </Link>
          </Heading>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            mb: 2,
          }}
        >
          <Text
            sx={{
              color: 'darkText',
              whiteSpace: 'normal',
              fontSize: 4,
            }}
            as={'p'}
          >
            <Emoji text={repository.description || ''} />
          </Text>
        </Flex>
        <Box sx={{ fontSize: 6 }}>
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Flex sx={{ display: 'inline-flex' }}>
              <RepoColor color={repository.language.color} />
              <RepoLanguageText name={repository.language.name} />
            </Flex>
            <Flex sx={{ display: 'inline-flex' }}>
              <PrimerLink
                href={repository.url}
                sx={{
                  display: 'inline-flex',
                  color: 'grey',
                  mr: 1,
                }}
              >
                <StyledOcticon icon={StarIcon} sx={{ mr: 1 }} />
                {repository.stargazers.totalCount}
              </PrimerLink>
            </Flex>
            <Flex sx={{ display: 'inline-flex' }}>
              <PrimerLink
                href={repository.url}
                sx={{
                  display: 'inline-flex',
                  color: 'grey',
                  mr: 1,
                }}
              >
                <StyledOcticon icon={GitBranchIcon} sx={{ mr: 1 }} />
                {repository.forkCount}
              </PrimerLink>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </BorderBox>
  )
}

export default RepoCard
