import React from 'react'
import './styles.css'

export function Container({ children }) {
    return (
      <main className='main'>
          {children}
      </main>
    )
  }
