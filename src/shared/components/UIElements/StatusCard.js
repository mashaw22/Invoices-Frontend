import React from 'react'

import StatusIconPaid from '../UIElements/images/status-icon-paid.svg'
import StatusIconPending from '../UIElements/images/status-icon-pending.svg'
import StatusIconDraft from '../UIElements/images/status-icon-draft.svg'
import './StatusCard.css'

export default function StatusCard({status}) {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1)
  return (
    <div 
        className={`
            item__status 
            ${status === 'paid' && 'paid'} 
            ${status === 'pending' && 'pending'} 
            ${status === 'draft' && 'draft'}
        `}
    >
        {status === 'paid' && <img className='status__icon' src={StatusIconPaid} alt=''/>}
        {status === 'pending' && <img className='status__icon' src={StatusIconPending} alt=''/>}
        {status === 'draft' && <img className='status__icon' src={StatusIconDraft} alt=''/>}
        <h3>{formattedStatus}</h3>
  </div>
  )
}
