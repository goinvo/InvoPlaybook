import React from 'react'

import NavMenu from '../nav-menu/nav-menu'

export default (props) => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Playbook</h1>
      <div className="sidebar__nav">
        <NavMenu items={ props.navItems }
                 activeSection={ props.activeSection }
                 onSectionClick={ props.onSectionClick }
                 showSubsections={ true }
        />
      </div>
    </aside>
  )
}
