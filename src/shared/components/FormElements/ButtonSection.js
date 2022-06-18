import React from 'react'

import './ButtonSection.css'

export default function ButtonSection(props) {
  return (
    <div className='button-section'>
      {props.children}
    </div>
  )
}
