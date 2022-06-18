import React, { useState } from 'react'

import ArrowDown from '../UIElements/images/icon-arrow-down.svg'
// import Checkmark from '../UIElements/images/icon-check.svg'
import './Select.css'

export default function Select(props) {
  const [multiselectIsShowing, setMultiselectIsShowing] = useState(false)

  const toggleMultiselect = () => {
    setMultiselectIsShowing(prevShow => !prevShow)
  }
  

  return (
    <div className='multiselect'>
      <div className='multiselect__select' onClick={toggleMultiselect}>
          <p>Filter</p>
          <img src={ArrowDown} alt=''/>
      </div>

    {multiselectIsShowing && (
      <div className='checkbox-section'>
        <label htmlFor="paid"> Paid
          <input type="checkbox" id="paid"/> 
          <span className='custom-checkbox'></span>
        </label>
        <label htmlFor="pending"> Pending
          <input type="checkbox" id="pending"/> 
          <span className='custom-checkbox'></span>
        </label>
        <label htmlFor="draft">Draft
          <input type="checkbox" id="draft"/> 
          <span className='custom-checkbox'></span>
        </label>
      </div>
    )}
    </div>
  )
}
