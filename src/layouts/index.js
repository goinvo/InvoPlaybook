import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Header from '../components/header/header'
import Main from '../components/main/main'
import Sidebar from '../components/sidebar/sidebar'
import Footer from '../components/footer/footer'

import { changePageMountedStatus } from '../redux/redux'

import '../scss/index.scss'

import navItems from '../../data/nav-items.json'

const mapStateToProps = ({ pageMounted }) => {
  return { pageMounted }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePageMountedStatus: bool => {
      dispatch(changePageMountedStatus(bool))
    }
  }
}

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func,
  }

  constructor() {
    super();

    let activeSection = navItems[0];

    if (typeof window !== 'undefined') {
      const pathSections = window.location.pathname.split('/');

      // Get the route and set active section if applicable
      if (pathSections.length >= 2) {
        const route = pathSections[pathSections.length - 2];
        if (route) {
          const foundSection = navItems.find(section => section.slug === `/${route}/`);
          if (foundSection) {
            activeSection = foundSection;
          }
        }
      }
    }

    this.state = {
      activeSection: activeSection,
      activeSubsection: activeSection.subsections.length ? activeSection.subsections[0] : {}
    }
  }

  onSectionClick = (section) => (e) => {
    // Reset to top of page (especially if clicking link for page that's already active)
    window.scrollTo(0, 0);

    // react-scrollspy in Sidebar NavMenu tries to read the DOM for elements before
    // Page component has mounted. So use Redux to flag when Page is mounted and then
    // let react-scrollspy render (bool value passed as prop 'pageMounted' to Sidebar )
    this.props.changePageMountedStatus(false);

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
        <Helmet
          title="GoInvo Playbook"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          link={[
            { href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600", rel: "stylesheet" },
            { href: "https://use.typekit.net/brw1pwx.css", rel: "stylesheet" }
          ]}
        />
        <Header navItems={ navItems }
                activeSection={ this.state.activeSection }
                activeSubsection={ this.state.activeSubsection }
                onSectionClick={ this.onSectionClick } />
        <Sidebar navItems={ navItems }
                 activeSection={ this.state.activeSection }
                 activeSubsection={ this.state.activeSubsection }
                 onSectionClick={ this.onSectionClick }
                 onScrollSpyUpdate={ this.onScrollSpyUpdate }
                 pageMounted={ this.props.pageMounted } />
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
