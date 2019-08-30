/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

export const Placeholder = ({width = '64px', height = '64px', bg = 'blue.0', color = 'gray.5'}) =>{
    return (
        <Box
            as='div'
            sx={{
                bg,
                color,
                height,
                width,
                lineHeight: height,
                fontSize: 4,              
                fontWeight: 600,
                borderRadius: '3px',
                flexShrink: 0,
                textAlign: 'center',
                mx: 'auto',
                mb: 3,                
            }}                                     
            >
                #
            </Box>
                
    )
}