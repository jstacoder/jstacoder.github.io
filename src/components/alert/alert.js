import React from 'react'
import styled from 'styled-components'
import { StyledOcticon, Flex } from '@primer/components'
import {
  Info,
  Alert as AlertIcon,
  Stop,
  LightBulb,
  X as CloseIcon,
} from '@primer/octicons-react'
import { PropTypes } from 'prop-types'

import CloseButton from './close'
import useThemeContext from '../../hooks/themeContext'

export const Alert = ({ icon, children, dismissable, ...props }) => {
  const { theme } = useThemeContext()

  const alertTypes = {
    info: {
      color: theme.colors.info,
      Icon: Info,
    },
    success: {
      color: theme.colors.success,
      Icon: LightBulb,
    },
    warning: {
      color: theme.colors.warning,
      Icon: AlertIcon,
    },
    danger: {
      color: theme.colors.danger,
      Icon: Stop,
    },
    error: {
      color: theme.colors.error,
      Icon: Stop,
    },
  }

  const [iconState, setIcon] = React.useState(alertTypes['info'].icon)

  const getIcon = kind => {
    if (kind in alertTypes) {
      if (kind !== iconState) {
        setIcon(alertTypes[kind].icon)
        return iconState
      }
      return iconState
    }
    return iconState
  }

  const StyledAlert = styled.div`
    padding: 15px 20px;
    border: 1px solid grey;
    border-radius: 3px;
    color: white;
    margin-bottom: 5px;
    background-color: ${({ kind = 'info' }) => alertTypes[kind].color};
  `

  const baseIcon = props.kind in alertTypes ? alertTypes[props.kind].Icon : null

  const Icon = icon || baseIcon
  return props.kind in alertTypes ? (
    <StyledAlert {...props}>
      <Flex>
        <Flex.Item>
          {(icon || baseIcon) && (
            <StyledOcticon
              color="fontColor"
              size={'medium'}
              icon={Icon}
              verticalAlign={'middle'}
              px={2}
            />
          )}
        </Flex.Item>
        <Flex.Item color="fontColor">{children}</Flex.Item>
        <Flex.Item flex={1}>
          <Flex flexDirection={'column'}>
            {dismissable && (
              <Flex.Item alignSelf={'flex-end'} style={{ cursor: 'pointer' }}>
                <CloseButton
                  color="fontColor"
                  alignSelf="flex-end"
                  size={'small'}
                />
              </Flex.Item>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    </StyledAlert>
  ) : null
}

Alert.propTypes = {
  /** What kind of alert is this */
  kind: PropTypes.oneOf(['info', 'warning', 'danger', 'success', 'error']),
  /** custom icon to display with your message */
  icon: PropTypes.func,
  dismissable: PropTypes.boolean,
  /** the body of your message */
  children: PropTypes.node,
}

Alert.defaultProps = {
  kind: 'info',
}
