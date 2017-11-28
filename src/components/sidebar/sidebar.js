import React from 'react'

import NavMenu from '../nav-menu/nav-menu'

export default () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__title">Playbook</div>
      <NavMenu showSubsections={ true } />
    </aside>
  )
}
