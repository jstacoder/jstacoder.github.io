import React from 'react'
import color from 'color'

export const PlaceholdIt = props => {
  const generateUrl = ({
    height,
    width,
    format,
    text,
    backgroundColor,
    textColor,
  }) => {
    const baseUrl = 'https://via.placeholder.com/'

    let url = baseUrl

    if (height) {
      url = `${baseUrl}${height}${width ? `x${width}` : ''}`
    }
    if (format) {
      url = `${url}.${format}/`
    } else {
      url = `${url}/`
    }
    if (backgroundColor) {
      url = `${url}${
        color(backgroundColor)
          .hex()
          .split('#')[1]
      }`
    }
    if (textColor) {
      url = `/${url}${
        color(textColor)
          .hex()
          .split('#')[1]
      }`
    }
    if (text) {
      url = `${url}?text=${encodeURIComponent(text)}`
    }
    return url
  }

  return <img src={generateUrl(props)} />
}
