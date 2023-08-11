import React from 'react'

export function Button({ text, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled}>{text}</button>
  )
}
