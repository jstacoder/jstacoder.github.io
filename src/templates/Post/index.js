import { Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Img from 'gatsby-image'

import Badges from 'components/Badges'
import Adsense from 'components/Adsense'
import Button from 'components/Button'
import './style.scss'

const Post = ({ data, options }) => {
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    image,
  } = data.frontmatter
  const { isIndex, adsense } = options
  const html = get(data, 'html')
  const isMore = isIndex && !!html.match('<!--more-->')
  const fixed = get(image, 'childImageSharp.fixed')

  return (
    <div className="article" key={path}>
      <div className="container">
        <div className="info">
          <Link style={{ boxShadow: 'none' }} to={path}>
            <h1>{title}</h1>
            <time dateTime={date}>{date}</time>
          </Link>
          <Badges items={[category]} primary={true} />
          <Badges items={tags} />
        </div>
        <div className="content">
          <p>{description}</p>
          {fixed ? (
            <Img fixed={fixed} style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            ''
          )}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: isMore ? getDescription(html) : html,
          }}
        />
        {isMore ? <Button path={path} label={'MORE'} primary={true} /> : ''}
        {getAd(isIndex, adsense)}
      </div>
    </div>
  )
}

export default Post

const getAd = (isIndex, adsense) => {
  return !isIndex ? <Adsense clientId={adsense} slotId="" format="auto" /> : ''
}

const getDescription = body => {
  // body = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
  if (body.match('<!--more-->')) {
    body = body.split('<!--more-->')
    if (typeof body[0] !== 'undefined') {
      return body[0]
    }
  }
  return body
}
