import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
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
  faPython,
  faCircleNotch
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
  faCircleNotch,
]

const icons = {}
iconList.forEach(icon => {
  console.log(icon.iconName)
  icons[icon.iconName] = icon
})

const Icon = ({ name, icon, text = '', ...props }) => (
  <div className="icon" title={name || icon.iconName}>
    <FontAwesomeIcon icon={icons[name || icon.iconName]} {...props} />
    <p>{text}</p>
  </div>
)

export default Icon
