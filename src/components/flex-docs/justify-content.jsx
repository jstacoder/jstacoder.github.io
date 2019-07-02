import React from 'react'
import { BorderBox, Box, Flex, Text  } from '@primer/components'
import PropTypes from 'prop-types'

const x = (<>
<Flex flexWrap={'wrap'} alignItems={'center'} height={500}>
<Text mb={0} style={{alignSelf: 'flex-end'}}>SpaceAround</Text>
<Flex minWidth={'100%'} justifyContent={'space-around'}>
  <BorderBox bg={'green.3'} size={20}></BorderBox>
  <BorderBox bg={'blue.3'} size={20}></BorderBox>
  <BorderBox bg={'orange.3'} size={20}></BorderBox>
  <BorderBox bg={'gray.3'} size={20}></BorderBox>
</Flex>
<Text mb={0} style={{alignSelf: 'flex-end'}}>SpaceBetween</Text>
<Flex minWidth={'100%'} justifyContent={'space-between'}>
  <BorderBox bg={'green.3'} size={20}></BorderBox>
  <BorderBox bg={'blue.3'} size={20}></BorderBox>
  <BorderBox bg={'orange.3'} size={20}></BorderBox>
  <BorderBox bg={'gray.3'} size={20}></BorderBox>
</Flex>
<Text mb={0} style={{alignSelf: 'flex-end'}}>SpaceEvenly</Text>
<Flex minWidth={'100%'} justifyContent={'space-evenly'}>
  <BorderBox bg={'green.3'} size={20}></BorderBox>
  <BorderBox bg={'blue.3'} size={20}></BorderBox>
  <BorderBox bg={'orange.3'} size={20}></BorderBox>
  <BorderBox bg={'gray.3'} size={20}></BorderBox>
</Flex>
</Flex>
</>)


export const FlexBlock = ({bg, brightness = 3, size = 20, ...props}) =>
  <BorderBox {...props} size={size} bg={`${bg}.${brightness}`} />
  
FlexBlock.propTypes = {
  bg: PropTypes.string.isRequired,
  brightness: PropTypes.number,
  size: PropTypes.number,
}

FlexBlock.defaultProps = {
  size: 20,
  brightness: 3,
}

const BlueBlock = props => <FlexBlock {...props} bg={'blue'}/>

const GreenBlock = props => <FlexBlock {...props} bg={'green'}/>

const YellowBlock = props => <FlexBlock {...props} bg={'yellow'}/>

const RedBlock = props => <FlexBlock {...props} bg={'red'}/>

export const BlockGroup = ({justifyContent}) =>{
  return (
    <BorderBox m={2} p={2} bg={'gray.3'}>
      <Flex minWidth={'100%'} justifyContent={justifyContent}>
        <BlueBlock/>
        <GreenBlock/>
        <RedBlock/>
        <YellowBlock/>
      </Flex>
    </BorderBox>
  )
}

BlockGroup.propTypes = {
  justifyContent: PropTypes.oneOf(['space-between', 'space-around', 'space-evenly', 'flex-end', 'flex-start', 'center']).isRequired
}

export const SpaceBetween = props => <BlockGroup justifyContent={'space-between'}/>

export const SpaceAround = props => <BlockGroup justifyContent={'space-around'} />

export const SpaceEvenly = props => <BlockGroup justifyContent={'space-evenly'} />

export const FlexStart = props => <BlockGroup justifyContent={'flex-start'} />

export const FlexEnd = props => <BlockGroup justifyContent={'flex-end'} />

export const Center = props => <BlockGroup justifyContent={'center'}/>
