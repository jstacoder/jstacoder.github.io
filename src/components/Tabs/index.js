import React from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import 'scss/gatstrap.scss'
import styles from './tabs.module.scss'
import { ThemeContext } from '../../theme-context'

const NavTabs = ({ tabs, initialActiveTab, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(initialActiveTab)
  const {
    state: { style },
  } = React.useContext(ThemeContext)
  let count = 0

  const tabContentsArray = React.Children.map(children, child => {
    const tab = tabs[count]
    count++
    return <TabPane tabId={tab}>{child}</TabPane>
  })
  return (
    <section
      className={`${styles.section} ${(style === 'light' && styles.light) ||
        ''}`}
    >
      <Nav tabs fill className={styles.navTabs}>
        {tabs.map(tab => (
          <NavItem key={`${tab}-navlink`}>
            <NavLink
              className={`${styles.navLink} ${
                activeTab == tab ? styles.active : ''
              }`}
              active={activeTab == tab}
              onClick={() => setActiveTab(tab)}
              tag={'span'}
            >
              {tab}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>{tabContentsArray}</TabContent>
    </section>
  )
}

export default NavTabs
