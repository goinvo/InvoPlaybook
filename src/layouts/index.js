import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/header/header'
import Main from '../components/main/main'
import Sidebar from '../components/sidebar/sidebar'

import '../scss/index.scss'

import navItems from '../../data/nav-items.json'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func,
  }

  constructor() {
    super();

    let activeSection = navItems[0];
    const pathSections = window.location.pathname.split('/');

    // Get the route and set active section if applicable
    if (pathSections.length >= 2) {
      const route = pathSections[1];
      if (route) {
        const foundSection = navItems.find(section => section.slug === `/${route}/`);
        if (foundSection) {
          activeSection = foundSection;
        }
      }
    }

    this.state = {
      activeSection: activeSection
    }
  }

  onSectionClick = (section) => (e) => {
    // Reset to top of page (especially if clicking link for page that's already active)
    window.scrollTo(0, 0);

    this.setState({ activeSection: section });
  }

  render() {
    return (
      <div className="app">
        { /* Define html head with Helmet */ }
        { /* TODO: Need adobe font */ }
        <Helmet
          title="GoInvo Playbook"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          link={[
            { href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600", rel: "stylesheet" }
          ]}
        />
        <Header navItems={ navItems }
                activeSection={ this.state.activeSection }
                onSectionClick={ this.onSectionClick }
        />
        <Sidebar navItems={ navItems }
                 activeSection={ this.state.activeSection }
                 onSectionClick={ this.onSectionClick }
        />
        <Main>{ this.props.children() }</Main>
      </div>
    )
  }
}

export default Layout
