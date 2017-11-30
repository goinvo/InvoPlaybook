import React, { Component } from 'react'
import PropTypes from 'prop-types'

import iconPrevious from '../../assets/images/icon-arrow-left.png';
import iconNext from '../../assets/images/icon-arrow-right.png';

class Footer extends Component {
  static propTypes = {
    activeSection: PropTypes.object.isRequired,
    activeSubsection: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      previousSubsection: undefined,
      nextSubsection: undefined
    }
  }

  componentWillMount() {
    this.setPreviousAndNextSubsections(this.props.activeSection, this.props.activeSubsection)
  }

  componentWillUpdate(props) {
    if (props.activeSubsection !== this.props.activeSubsection) {
      this.setPreviousAndNextSubsections(props.activeSection, props.activeSubsection)
    }
  }

  setPreviousAndNextSubsections = (activeSection, activeSubsection) => {
    const subsectionsMax = activeSection.subsections.length - 1;
    const activeSubsectionIndex = activeSection.subsections.findIndex(subsection => subsection.slug === activeSubsection.slug)

    if (activeSubsectionIndex >= 0 && activeSubsectionIndex <= subsectionsMax) {
      this.setState({
        previousSubsection: activeSubsectionIndex > 0 ? activeSection.subsections[activeSubsectionIndex - 1] : undefined,
        nextSubsection: activeSubsectionIndex < subsectionsMax ? activeSection.subsections[activeSubsectionIndex + 1] : undefined
      })
    }
  }

  render() {
    return (
      <footer className="footer">
        <ul className="footer__nav">
          <li className="footer__nav-item">
            {
              this.state.previousSubsection ?
                <a href={ `#${this.state.previousSubsection.slug}` }>
                  <img src={ iconPrevious } />
                  <div className="footer__nav-item-text">
                    { this.state.previousSubsection.value }
                  </div>
                </a>
              : null
            }
          </li>
          <li className="footer__nav-item">
            {
              this.state.nextSubsection ?
                <a href={ `#${this.state.nextSubsection.slug}` }>
                  <div className="footer__nav-item-text">
                    { this.state.nextSubsection.value }
                  </div>
                  <img src={ iconNext } />
                </a>
              : null
            }
          </li>
        </ul>
        { this.props.activeSubsection.slug }
      </footer>
    )
  }
}

export default Footer
