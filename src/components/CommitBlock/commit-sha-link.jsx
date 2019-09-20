/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ButtonOutline, Text } from '@primer/components'

export const CommitShaLink = ({commitUrl, commitSha}) =>{
    const shortSha = commitSha.slice(0, 8)
    return (
        <ButtonOutline as={'a'} height={40} href={commitUrl}>        
            <Text as='p' mt={'2px'}>
                {shortSha}
            </Text>    
        </ButtonOutline>
    )
}
