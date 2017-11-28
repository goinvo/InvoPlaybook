import React from 'react'
import Link from 'gatsby-link'

import styles from './main.module.scss'

export default ({ children }) =>
  <div className={ styles.main }>
    {children}
  </div>
