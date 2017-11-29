import React from 'react'

import NavMenu from '../nav-menu/nav-menu'

export default () => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Playbook</h1>
      <NavMenu showSubsections={ true } />
    </aside>
  )
}
