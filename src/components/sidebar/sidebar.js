import React from 'react'

import NavMenu from '../nav-menu/nav-menu'

export default (props) => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Playbook</h1>
      <div className="sidebar__nav">
        <NavMenu items={ props.navItems }
                 activeSection={ props.activeSection }
                 activeSubsection={ props.activeSubsection }
                 onSectionClick={ props.onSectionClick }
                 onScrollSpyUpdate={ props.onScrollSpyUpdate }
                 pageMounted={ props.pageMounted }
                 showSubsections={ true }
        />
      </div>
      <div className="sidebar__footer">
        <a className="nav__link" href="mailto:hello@goinvo.com">Feedback</a>
        <a className="nav__link" href="https://github.com/goinvo/InvoPlaybook" target="_blank">GitHub</a>
      </div>
    </aside>
  )
}
