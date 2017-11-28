import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Sidebar from '../components/sidebar/sidebar'
import Main from '../components/main/main'

import './index.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func,
  }

  // constructor() {
  //   super();
  //
  //   this.state = {
  //     activeSection: sidebarLinks[0],
  //     activeSubSection: sidebarLinks[0]['subsections'][0]
  //   };
  // }
  //
  // setActiveSection = (section, setSubsection = false) => {
  //   if (setSubsection) {
  //     this.setState({
  //       activeSubSection: section
  //     })
  //   } else {
  //     this.setState({
  //       activeSection: section
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <Helmet
          title="GoInvo Playbook"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        {/* <Sidebar activeSection={this.state.activeSection}
                 activeSubSection={this.state.activeSubSection}
                 setActiveSection={this.setActiveSection}
        /> */}
        <Sidebar />
        <Main>{this.props.children()}</Main>
      </div>
    )
  }
}

export default Layout
