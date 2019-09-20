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

export const CommitBlock = ({commit}) =>{
    const { 
        message,
        author: {
          avatarUrl,
          user: {
            userName,
            userLink,
          }
        },
        treeUrl,
        commitUrl,
        authoredDate,
        committedDate,
        commitSha,
    } = commit
    console.log(authoredDate)
    const dateAuthored = formatDistanceToNow(new Date(authoredDate), { 
        addSuffix: true,
    })
    const dateCommitted = formatDistanceToNow(new Date(committedDate), {
        addSuffix: true,
    })

    return (
        <BorderBox p={2}> 
            <Box as={Flex} justifyContent={'space-between'}>
                <Box as={Flex} flexDirection='column'>
                <Box as={Flex}>
                    <Text px={2} fontWeight={'700'} color={'black'} as={Flex}>{message}</Text>
                    <Box lineHeight={0} px={0} backgroundColor='gray.2' color='black' height='20px'>...</Box>
                </Box>
            
            <Box as={Flex}>
                <Link href={''}>
                    <Avatar px={2} height={25} width={40} src={avatarUrl}/>
                </Link>
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
            <Box as={Flex}>
            <ButtonGroup>
                <Button onClick={()=> copy(commitSha)} as={ButtonOutline} height={40} width={45}>
                    <Text>
                        <CopyIcon  size={20} color={'inherit'} hoverBackgroundColor={'inherit'} />
                    </Text>
                </Button>
                <CommitShaLink commitSha={commitSha} commitUrl={commitUrl}/>
            </ButtonGroup>                   
            <ButtonOutline as={'a'} href={treeUrl} height={40} ml={3}>
                <StyledOcticon icon={Code}/>
            </ButtonOutline>                    
        </Box>
    </Box>


        </BorderBox>
    )
}
