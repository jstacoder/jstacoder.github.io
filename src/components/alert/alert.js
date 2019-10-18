import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, StyledOcticon, Text } from '@primer/components'
import {
  Alert as AlertIcon,
  Info,
  LightBulb,
  Stop,
} from '@primer/octicons-react'
import PropTypes from 'prop-types'

import CloseButton from './close'
import useThemeContext from '../../hooks/themeContext'

export const Alert = ({
  onDismiss,
  icon: Icon,
  children,
  dismissable,
  color,
  ...props
}) => {
  const [dismissed, setDismissed] = useState(false)

  const dismiss = () => {
    setDismissed(true)
  }

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

  const [alertColor, setAlertColor] = useState(colorGetter())

  function colorGetter() {
    if (color) {
      return color
    }
    if (props.kind in alertTypes) {
      return alertTypes[props.kind].color
    }
    return alertColor
  }

  const [initialKind, setInitialKind] = useState(null)

  React.useEffect(() => {
    if (initialKind === null) {
      setInitialKind(props.kind)
    }
  }, [])

  const [kind, setKind] = useState(initialKind || props.kind)

  const StyledAlert = styled.div`
    padding: 15px 20px;
    border: 1px solid grey;
    border-radius: 3px;
    color: white;
    margin-bottom: 5px;
    background-color: ${alertColor};
  `

  const getIcon = xprops => {
    const baseIcon =
      props.kind in alertTypes ? alertTypes[props.kind].Icon : null
    return Icon !== undefined ? props => <Icon {...props} /> : baseIcon
  }

  const onClick = e => {
    onDismiss()

    dismiss()
  }

  return props.kind in alertTypes && !dismissed ? (
    <StyledAlert {...props}>
      <Flex>
        <Flex.Item>
          <StyledOcticon
            color="fontColor"
            size={'medium'}
            icon={getIcon()}
            verticalAlign={'text-top'}
            px={2}
          />
        </Flex.Item>
        <Flex.Item color="fontColor">
          <Text as={'p'} mt={'8px'}>
            {children}
          </Text>
        </Flex.Item>
        <Flex.Item flex={1}>
          <Flex flexDirection={'column'}>
            {dismissable && (
              <Flex.Item alignSelf={'flex-end'} style={{ cursor: 'pointer' }}>
                <CloseButton
                  onClick={onClick}
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
  kind: PropTypes.oneOf(['info', 'warning', 'danger', 'success', 'error', '']),
  /** custom icon to display with your message */
  icon: PropTypes.func,
  /** extra action function before alert is dismissed */
  onDismiss: PropTypes.func,
  /** should we show an x icon to close alert */
  dismissable: PropTypes.bool,
  /** the body of your message */
  children: PropTypes.node,
}

Alert.defaultProps = {
  kind: 'info',
  onDismiss: () => {},
}
