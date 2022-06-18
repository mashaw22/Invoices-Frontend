import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import StatusCard from '../../shared/components/UIElements/StatusCard'
import RightArrowIcon from '../../shared/components/UIElements/images/icon-arrow-right.svg'
import './InvoiceItem.css'

export default function InvoiceItem({ id, clientName, paymentDue, totalCost, status }) {
  const formattedTotalCost = `£${totalCost.toFixed(2)}`
  const formattedDueDate = new Date(paymentDue).toString().slice(4, 15)


  return (
      <Card className="card--hover">
        <li >

          <div className='item__top'>
            <div className='item__info'>
              <h3 className='item__id'><span>#</span>{id}</h3>
              <p className='item__payment-due'>Due {formattedDueDate}</p>
            </div>
            <p className='item__client-name'>{clientName}</p>
          </div>

          <div className='item__bottom'>
            <h3 className='item__total-cost'>{formattedTotalCost}</h3>
            <StatusCard status={status}/>
            <img className='arrow--right' src={RightArrowIcon} alt=''/>
          </div>
        </li>
      </Card>
  )
}