import React, { Component } from 'react'
import Link from 'gatsby-link'
import Collapse from 'react-collapse'
import Scrollspy from 'react-scrollspy'

import sidebarData from '../../../data/sidebar.json'

import styles from './sidebar.module.scss'

class Sidebar extends Component {

  constructor() {
    super();

    this.state = {
      activeSection: sidebarData[0]
    };
  }

  isActiveSection = (section) => {
    return section === this.state.activeSection;
  }

  setActiveSection = (section) => (e) => {
    this.setState({
      activeSection: section
    })
  }

  getSubsectionSlugs = (section) => {
    return section.subsections.map(subsection => subsection.slug);
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <ul>
          {
            sidebarData.map((section, index) => {
              return (
                <li key={section.slug}>
                  <div>
                    <Link to={`${section.slug}`}
                          onClick={this.setActiveSection(section)}>
                      {section.title}
                    </Link>
                  </div>
                  <Collapse isOpened={this.isActiveSection(section)}>
                    <Scrollspy items={this.getSubsectionSlugs(section)} currentClassName="is-current">
                      {
                        section.subsections.map((subsection, index) => {
                          return (
                            <li key={subsection.slug}>
                              <Link to={`${section.slug}#${subsection.slug}`}>
                                {subsection.value}
                              </Link>
                            </li>
                          )
                        })
                      }
                    </Scrollspy>
                  </Collapse>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Sidebar
