import React from 'react'
import './styles.css'

export function Container({ children, isExpanded }) {
    return (
      <main className={`main ${isExpanded ? 'main_expanded' : ''}`} >
          {children}
      </main>
    )
  }
