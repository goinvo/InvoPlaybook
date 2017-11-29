import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/header/header'
import Main from '../components/main/main'
import Sidebar from '../components/sidebar/sidebar'

import '../scss/index.scss'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func,
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
        <Header />
        <Sidebar />
        <Main>{ this.props.children() }</Main>
      </div>
    )
  }
}

export default Layout
