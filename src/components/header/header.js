import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collapse from 'react-collapse'

import NavMenu from '../nav-menu/nav-menu'

import iconCaret from '../../assets/images/icon-caret.png';
import iconX from '../../assets/images/icon-x.png';

class Header extends Component {
  static propTypes = {
    navItems: PropTypes.array.isRequired,
    activeSection: PropTypes.object.isRequired,
    activeSubsection: PropTypes.object.isRequired,
    onSectionClick: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      isExpanded: false
    }
  }

  collapse = () => {
    document.documentElement.classList.toggle('freeze-scrolling', false);
    this.setState({ isExpanded: false });
  }

  toggleExpanded = (e) => {
    e.stopPropagation();
    document.documentElement.classList.toggle('freeze-scrolling', !this.state.isExpanded);
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  onSectionClick = (section) => (e) => {
    this.collapse();

    this.props.onSectionClick(section)(e);
  }

  render() {
    return (
      <header className={ `header ${ this.state.isExpanded ? 'expanded' : '' }` }>
        <div className="header__overlay" onClick={ this.collapse }></div>
        <div className="header__bar" onClick={ this.toggleExpanded }>
          <h1 className="header__logo">P</h1>
          <div className={ `header__title ${ this.state.isExpanded ? 'hide' : '' }` }>{ this.props.activeSection.title }</div>
          <div className="header__toggle">
            <button className="header__toggle-button"
                    onClick={ this.toggleExpanded }>
              { this.state.isExpanded ? <img src={ iconX } /> : <img src={ iconCaret } /> }
            </button>
          </div>
        </div>
        <div className="header__nav">
          <Collapse isOpened={ this.state.isExpanded } springConfig={{stiffness: 1000, damping: 80}}>
            <NavMenu items={ this.props.navItems }
                     activeSection={ this.props.activeSection }
                     activeSubsection={ this.props.activeSubsection }
                     onSectionClick={ this.onSectionClick }
                     showSubsections={ false } />
          </Collapse>
        </div>
      </header>
    )
  }
}

export default Header
