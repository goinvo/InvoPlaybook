import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Collapse from 'react-collapse'
import Scrollspy from 'react-scrollspy'

import navItems from '../../../data/nav-items.json'

class NavMenu extends Component {
  static propTypes = {
    showSubsections: PropTypes.bool
  }

  constructor() {
    super();

    this.state = {
      activeSection: navItems[0]
    };
  }

  isActiveSection = (section) => {
    return section === this.state.activeSection;
  }

  setActiveSection = (section) => (e) => {
    // Reset to top of page (especially if clicking link for page that's already active)
    window.scrollTo(0, 0 );

    this.setState({
      activeSection: section
    })
  }

  getSubsectionSlugs = (section) => {
    return section.subsections.map(subsection => subsection.slug);
  }

  render() {
    return (
      <nav className="nav">
        <ul className="nav__menu">
          {
            navItems.map((section, index) => {
              return (
                <li key={section.slug}
                    className={ this.isActiveSection(section) ? 'active' : '' }>
                  <div>
                    <Link to={`${section.slug}`}
                          className="nav__link"
                          onClick={this.setActiveSection(section)}>
                      {section.title}
                    </Link>
                  </div>
                  {
                    this.props.showSubsections ?
                      <Collapse isOpened={this.isActiveSection(section)}>
                        <Scrollspy items={this.getSubsectionSlugs(section)}
                                   className="nav__menu nav__menu--subsection"
                                   currentClassName="is-current">
                          {
                            section.subsections.map((subsection, index) => {
                              return (
                                <li key={subsection.slug}>
                                  <Link to={`${section.slug}#${subsection.slug}`}
                                        className="nav__link nav__link--subsection">
                                    {subsection.value}
                                  </Link>
                                </li>
                              )
                            })
                          }
                        </Scrollspy>
                      </Collapse>
                    : null
                  }
                </li>
              )
            })
          }
        </ul>
      </nav>
    )
  }
}

export default NavMenu
