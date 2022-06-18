import React from 'react'

import InvoiceItem from '../components/InvoiceItem'
import IllustrationEmpty from '../../shared/components/UIElements/images/illustration-empty.svg'
import './InvoicesList.css'
import { Link } from 'react-router-dom'

export default function InvoicesList(props) {
    if (props.items.length === 0) {
        return (
            <div className='center invoices-empty'>
                <img src={IllustrationEmpty} alt="No invoices" />
                <h2>There is nothing here.</h2>
                <p>Create an invoice by clicking the <span>New</span> button and get started.</p>
            </div>
        )
    }
  return (
    <ul className='invoices-list center'>
        {props.items.map(invoice => 
        <Link to={`/${invoice.id}/view`} className="invoice-item center" key={invoice.id}>
            <InvoiceItem 
                id={invoice.id}
                clientName={invoice.clientName}
                paymentDue={invoice.paymentDue}
                totalCost={invoice.total}
                status={invoice.status}
            />
        </Link>
        )}
    </ul>
  )
}
