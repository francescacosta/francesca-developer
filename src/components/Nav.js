import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount() {
    this.setState({ currentPath: this.props.location.pathname })
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav => {
    if (this.state.activeSubNav === subNav) {
      this.setState({ activeSubNav: false })
    } else {
      this.setState({ activeSubNav: subNav })
    }
  }

  render() {
    const { active } = this.state
    const { subNav } = this.props

    const NavLink = ({ to, className, children, ...props }) => {
      const isActive = to === this.state.currentPath ? 'active' : ''

      return (
        <Link
          to={to}
          className={`NavLink ${isActive} ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )
    }

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link className="logo" to="/" onClick={this.handleLinkClick}>
            <h2>FRONT-END WEB DEVELOPER</h2>
            <h4>Francesca Costa</h4>
          </Link>
          <div className="Nav--Links">
            <NavLink to="/about/">About</NavLink>
            <NavLink to="/work/">Work</NavLink>

            <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => {
  return (
    <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
  )
}
