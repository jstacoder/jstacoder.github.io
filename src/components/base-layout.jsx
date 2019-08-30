/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box } from '@primer/components'

export const BaseLayout = ({children, ...props}) =>{
    return (
        <Box backgroundColor={'gray.3'}>
            {children}
        </Box>
    )
}