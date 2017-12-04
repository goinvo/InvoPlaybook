import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Collapse from 'react-collapse'
import Scrollspy from 'react-scrollspy'

class NavMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    activeSection: PropTypes.object.isRequired,
    activeSubsection: PropTypes.object.isRequired,
    onSectionClick: PropTypes.func.isRequired,
    onScrollSpyUpdate: PropTypes.func,
    showSubsections: PropTypes.bool
  }

  isActiveSection = (section) => {
    return section.slug === this.props.activeSection.slug;
  }

  getSubsectionSlugs = (section) => {
    return section.subsections.map(subsection => subsection.slug);
  }

  onScrollSpyUpdate = (heading) => {
    if (this.props.onScrollSpyUpdate) {
      this.props.onScrollSpyUpdate(heading);
    }
  }

  render() {
    return (
      <nav className="nav">
        <ul className="nav__menu">
          {
            this.props.items.map((section, index) => {
              return (
                <li key={section.slug}
                    className={ this.isActiveSection(section) ? 'active' : '' }>
                  <div>
                    <Link to={`${section.slug}`}
                          className="nav__link"
                          onClick={this.props.onSectionClick(section)}>
                      {section.title}
                    </Link>
                  </div>
                  {
                    this.props.showSubsections ?
                      <Collapse isOpened={this.isActiveSection(section)}>
                        <Scrollspy items={this.getSubsectionSlugs(section)}
                                   className="nav__menu nav__menu--subsection"
                                   onUpdate={ this.onScrollSpyUpdate }>
                          {
                            section.subsections.map((subsection, index) => {
                              return (
                                <li key={subsection.slug} className={ `${ subsection === this.props.activeSubsection ? 'is-current' : '' } `}>
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
