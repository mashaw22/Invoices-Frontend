import React from 'react'

import './InvoiceService.css'

export default function InvoiceService({ name, quantity, price, total }) {
    const formatCost = (cost) => {
        return cost.toFixed(2)
    }

  return (
    <React.Fragment>
      <div className='invoice-service--mobile'>
          <div className='invoice-service__info'>
              <h3>{name}</h3>
              <p>{quantity} x £{formatCost(price)}</p>
          </div>
          <h3 className='invoice-service__total'>£{formatCost(total)}</h3>
      </div>

      {/* <div className='invoice-service--tablet'>

        <div className='tablet__name-section'>
          <p>Item Name</p>
          <h5 className='invoice-service--tablet__name'>{name}</h5>
        </div>
        <div className='tablet__quantity-section'>
          <p>QTY.</p>
          <p>{quantity}</p>
        </div>
        <div className='tablet__price-section'>
          <p>Price</p>
          <p>£{formatCost(price)}</p>
        </div>
        <div className='tablet__total-section'>
          <p>Total</p>
          <h5 className='invoice-service__total'>£{formatCost(total)}</h5>
        </div>
        
      </div> */}

    </React.Fragment>
  )
}
