import React, { Component } from 'react'
import Collapse from 'react-collapse';

import NavMenu from '../nav-menu/nav-menu'

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false
    }
  }

  toggleExpanded = () => {
    this.setState({ isExpanded : !this.state.isExpanded });
  }

  render() {
    return (
      <header className={ `header ${ this.state.isExpanded ? 'expanded' : '' }` }>
        <div className="header__bar">
          <div className="header__logo">P</div>
          { /* TODO: Need dynamic page title here */ }
          <div className="header__title">Project MGMT</div>
          <div className="header__toggle">
            <button className="header__toggle-button"
                    onClick={ this.toggleExpanded }>
              { /* TODO: Icon dropdown / X */ }
              Der
            </button>
          </div>
        </div>
        <Collapse isOpened={ this.state.isExpanded }>
          { /* TODO: Clicking any link should close menu */ }
          <NavMenu showSubsections={ false } />
        </Collapse>
      </header>
    )
  }
}

export default Header
