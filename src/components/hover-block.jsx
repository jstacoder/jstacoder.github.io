/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

export const HoverBlock = ({url, sx, ...props}) =>{
    return (
        <Box
        as='a'
        href={url}
        sx={{
          ...sx,
          position: 'relative',
          height: '100%',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',          
          justifyContent: 'center',
          alignText: 'center',
          border: '1px solid',
          borderColor: 'transparent',
          borderRadius: '3px',
          bg: 'white',
          p: url ? 5 : 3,
          ':hover': {
            transform: ' scale(1.025)',
          }
        }}                  
        {...props}
      />
    )
}