import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/header/header'
import Main from '../components/main/main'
import Sidebar from '../components/sidebar/sidebar'
import Footer from '../components/footer/footer'

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
      activeSection: activeSection,
      activeSubsection: activeSection.subsections.length ? activeSection.subsections[0] : undefined
    }
  }

  onSectionClick = (section) => (e) => {
    // Reset to top of page (especially if clicking link for page that's already active)
    window.scrollTo(0, 0);

    this.setState({
      activeSection: section,
      activeSubsection: section.subsections[0]
    });
  }

  onScrollSpyUpdate = (heading) => {
    if (heading) {
      const id = heading.id;
      const newActiveSubsection = this.state.activeSection.subsections.find(subsection => subsection.slug === id);

      if (newActiveSubsection) {
        this.setState({ activeSubsection: newActiveSubsection });
      }
    }
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
                onSectionClick={ this.onSectionClick } />
        <Sidebar navItems={ navItems }
                 activeSection={ this.state.activeSection }
                 onSectionClick={ this.onSectionClick }
                 onScrollSpyUpdate={ this.onScrollSpyUpdate } />
        <Main>{ this.props.children() }</Main>
        {
          this.state.activeSubsection ?
            <Footer activeSection={ this.state.activeSection }
                    activeSubsection={ this.state.activeSubsection } />
          : null
        }
      </div>
    )
  }
}

export default Layout
