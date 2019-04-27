import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
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
console.log(icons)

const Icon = ({ name }) => (
  <div className="icon" title={name}>
    <FontAwesomeIcon icon={icons[name]} />
  </div>
)

export default Icon
