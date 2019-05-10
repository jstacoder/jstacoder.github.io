import React from 'react'
import { Link } from 'gatsby'

const LinkWrapper = ({ location, path, children }) => (
  <li className={location.pathname === path ? 'nav-item active' : 'nav-item'}>
    {children}
  </li>
)

class Navi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
        <div className="container">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">{title}</h1>
          </Link>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <LinkWrapper location={location} path={'/'}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </LinkWrapper>
              <LinkWrapper location={location} path={'/Profile/'}>
                <Link to="/Profile/" className="nav-link">
                  Profile
                </Link>
              </LinkWrapper>
              <LinkWrapper location={location} path={'/github-repos/'}>
                <Link to={'/github-repos/'} className={'nav-link'}>
                  Github Repos
                </Link>
              </LinkWrapper>
            </ul>
          </div>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default Navi
