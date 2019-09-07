/** @jsx jsx */
/* eslint-disable prettier/prettier */
import { jsx, css, Box } from 'theme-ui'

export const Blockquote = props =>{
  const styles = css({
    p: '10px 30px 10px 30px',
    m: '30px 0',
    borderRadius: 1,
    borderLeft: '4px solid',
    borderColor: 'blockquote',
    bg: 'gray.2',
    p: {
      color: 'darkText',
      fontSize: '18px',
    },
    [[
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ]]: {
      fontSize: '22px',
      m: '15px 0',
    },
    p: {
      m: '5px 0 10px',
    }
  })

  return (
    <Box as='blockquote' {...props} styles={styles} />      
  )
}
  

