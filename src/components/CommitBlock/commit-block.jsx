/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
    StyledOcticon,
    Link,
    BorderBox,
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    ButtonOutline,
    ButtonGroup,
} from '@primer/components'
import { Code } from '@primer/octicons-react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import copy from 'copy-to-clipboard'

import { CommitShaLink } from './commit-sha-link.jsx'
import { CopyIcon } from '../ui/click-to-copy/index.jsx'

export const CommitBlock = ({ commit }) => {
    const {
        message,
        author,
        treeUrl,
        commitUrl,
        authoredDate,
        committedDate,
        commitSha,
    } = commit
    const avatarUrl = author && author.avatarUrl
    const userName = author && author.user && author.user.userName
    const userLink = author && author.user && author.user.userLink
    const dateAuthored = formatDistanceToNow(new Date(authoredDate), {
        addSuffix: true,
    })
    const dateCommitted = formatDistanceToNow(new Date(committedDate), {
        addSuffix: true,
    })
    const shortMessage = message.slice(0, 45)
    return (
        <BorderBox px={1} py={2} width={['100%', 'inherit']}>            
            <Box display={['flex', 'flex', 'none']} as={Flex}>
                {avatarUrl && <Avatar px={2} src={avatarUrl} />}
                <Flex flexDirection='column'>
                    <Text p={2}>{shortMessage}</Text>
                    <Flex>
                        {committedDate && <Text color='gray.4' px={2}>committed {dateCommitted}</Text>}                    
                        {authoredDate && !committedDate && <Text color={'gray.4'} px={2}>authored {dateAuthored}</Text>}
                        <Text> * </Text>
                        <Text>{commitSha}</Text>
                    </Flex>
                </Flex>
            </Box>            
            <Box display={['none', 'none', 'flex', 'flex']} as={Flex} justifyContent={'space-between'}>
                <Box as={Flex} flexDirection='column'>
                    <Box as={Flex}>
                        <Text p={2} fontWeight={'700'} color={'black'} as={Flex}>{shortMessage}</Text>
                        {message.length !== shortMessage.length &&  <Box as={Text} mt={2} lineHeight={0} p={2} backgroundColor='gray.2' color='black' height='20px'>...</Box>}
                    </Box>

                    <Box as={Flex}>
                        { avatarUrl && 
                        <Link href={''}>
                            <Avatar px={2} height={25} width={40} src={avatarUrl} />
                        </Link>
                        }
                        <Link
                            as={'a'}
                            fontWeight={'600'}
                            color={'gray.6'}
                            href={userLink}
                            px={2}>
                            {userName}
                        </Link>

                        {committedDate && <Text color='gray.4' px={2}>committed {dateCommitted}</Text>}
                       {authoredDate && committedDate !== authoredDate && <Text color={'gray.4'} px={2}>authored {dateAuthored}</Text>}
                    </Box>
                </Box>
                <Box as={Flex} pt={2}>
                    <ButtonGroup>
                        <Button onClick={() => copy(commitSha)} as={ButtonOutline} height={40} width={45}>
                                <CopyIcon size={20} color={'inherit'} hoverBackgroundColor={'inherit'} />
                        </Button>
                        <CommitShaLink commitSha={commitSha} commitUrl={commitUrl} />
                    </ButtonGroup>
                    <ButtonOutline as={'a'} href={treeUrl} height={40} ml={3}>
                        <StyledOcticon icon={Code} />
                    </ButtonOutline>
                </Box>
            </Box>


        </BorderBox>
    )
}
