import React from 'react'

export function Button({ text, type, isDisabled }) {
  return (
    <button className='button_filled text' type={type} disabled={isDisabled}>{text}</button>
  )
}
