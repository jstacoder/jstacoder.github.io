import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

import {
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
  faAngular,
  faAppStoreIos,
  faAtlassian,
  faBitbucket,
  faBootstrap,
  faConfluence,
  faDocker,
  faDropbox,
  faGulp,
  faJira,
  faLinux,
  faMagento,
  faMarkdown,
  faPython,
} from '@fortawesome/free-brands-svg-icons'
import './style.scss'

library.add(
  faStar,
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
  faAngular,
  faAppStoreIos,
  faAtlassian,
  faBitbucket,
  faBootstrap,
  faConfluence,
  faDocker,
  faDropbox,
  faGulp,
  faJira,
  faLinux,
  faMagento,
  faMarkdown,
  faPython
)

const iconList = [
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faStar,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
  faAngular,
  faAppStoreIos,
  faAtlassian,
  faBitbucket,
  faBootstrap,
  faConfluence,
  faDocker,
  faDropbox,
  faGulp,
  faJira,
  faLinux,
  faMagento,
  faMarkdown,
  faPython,
]

const icons = {}
iconList.forEach(icon => {
  icons[icon.iconName] = icon
})

const Icon = ({ name, icon, text = '' }) => (
  <div className="icon" title={name || icon.iconName}>
    <FontAwesomeIcon icon={icons[name || icon.iconName]} />
    <p>{text}</p>
  </div>
)

export default Icon
