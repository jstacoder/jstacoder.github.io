import React from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import 'scss/gatstrap.scss'
import './tabs.scss'

const NavTabs = ({ tabs, initialActiveTab, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(initialActiveTab)

  let count = 0

  const tabContentsArray = React.Children.map(children, child => {
    const tab = tabs[count]
    count++
    return <TabPane tabId={tab}>{child}</TabPane>
  })
  return (
    <section id="tabs">
      <Nav tabs fill>
        {tabs.map(tab => (
          <NavItem key={`${tab}-navlink`}>
            <NavLink
              active={activeTab == tab}
              onClick={() => setActiveTab(tab)}
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
