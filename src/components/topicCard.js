/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { Fragment } from 'react'
import { HoverBlock } from './hover-block'
import { Placeholder } from './placeholder'

function TopicCard({ topic: { web_url, image_url, name, description } }) {
  return (
    <Fragment>
      {web_url ? (
        <HoverBlock url={web_url}>
          {image_url ? (
            <Box
              as="img"
              src={image_url}
              sx={{
                width: '64px',
                height: '64px',
                mx: 'auto',
                borderRadius: 1,
                mb: 3,
              }}
              alt={name}
            />
          ) : (
            <Placeholder />
          )}
          <Box
            as="p"
            sx={{
              fontSize: 3,
              lineHeight: 'condensed',
              textAlign: 'center',
              color: 'gray.9',
              mb: 0,
              mt: 1,
            }}
          >
            {name}
          </Box>
          {description && (
            <Box
              as="p"
              sx={{
                fontSize: 5,
                color: 'gray.5',
                textAlign: 'center',
                mb: 0,
                mt: 1,
              }}
            >
              {description}
            </Box>
          )}
        </HoverBlock>
      ) : (
        <Box
          as="div"
          sx={{
            fontFamily: 'normal',
            position: 'relative',
            height: '100%',
            textAlign: 'center',
            border: 1,
            borderColor: 'gray.0',
            borderRadius: 1,
            bg: 'white',
            p: 5,
          }}
        >
          {image_url ? (
            <Box
              as="img"
              src={image_url}
              sx={{
                width: '64px',
                height: '64px',
                mx: 'auto',
                borderRadius: 1,
                mb: 3,
              }}
              alt={name}
            />
          ) : (
            <Placeholder />
          )}
          <Box
            as="p"
            sx={{
              fontSize: 3,
              lineHeight: 'condensed',
              textAlign: 'center',
              mb: 0,
              mt: 1,
            }}
          >
            {name}
          </Box>
          {description && (
            <Box
              as="p"
              sx={{
                fontSize: 5,
                color: 'gray.5',
                textAlign: 'center',
                mb: 0,
                mt: 1,
              }}
            >
              {description}
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  )
}

export default TopicCard
