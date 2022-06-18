import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'

import Backdrop from '../../shared/components/UIElements/Backdrop'
import SideDrawer from '../../shared/components/UIElements/SideDrawer'
import Modal from '../../shared/components/UIElements/Modal'
import Card from '../../shared/components/UIElements/Card'
import StatusCard from '../../shared/components/UIElements/StatusCard'
import InvoiceService from '../components/InvoiceService'
import ButtonSection from '../../shared/components/FormElements/ButtonSection'
import Button from '../../shared/components/FormElements/Button'
import { SubNavContext } from '../../shared/context/sub-nav-context'
import './ViewInvoice.css'
import EditInvoice from './EditInvoice'


const INVOICES = [
  {
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentTerms": 1,
    "clientName": "Jensen Huang",
    "clientEmail": "jensenh@mail.com",
    "status": "paid",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "106 Kendell Street",
      "city": "Sharrington",
      "postCode": "NR24 5WQ",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Brand Guidelines",
        "quantity": 1,
        "price": 1800.90,
        "total": 1800.90
      }
    ],
    "total": 1800.90
  },
  {
    "id": "XM9141",
    "createdAt": "2021-08-21",
    "paymentDue": "2021-09-20",
    "description": "Graphic Design",
    "paymentTerms": 30,
    "clientName": "Alex Grim",
    "clientEmail": "alexgrim@mail.com",
    "status": "pending",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "84 Church Way",
      "city": "Bradford",
      "postCode": "BD1 9PB",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Banner Design",
        "quantity": 1,
        "price": 156.00,
        "total": 156.00
      },
      {
        "name": "Email Design",
        "quantity": 2,
        "price": 200.00,
        "total": 400.00
      }
    ],
    "total": 556.00
  },
  {
    "id": "RG0314",
    "createdAt": "2021-09-24",
    "paymentDue": "2021-10-01",
    "description": "Website Redesign",
    "paymentTerms": 7,
    "clientName": "John Morrison",
    "clientEmail": "jm@myco.com",
    "status": "paid",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "79 Dover Road",
      "city": "Westhall",
      "postCode": "IP19 3PF",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Website Redesign",
        "quantity": 1,
        "price": 14002.33,
        "total": 14002.33
      }
    ],
    "total": 14002.33
  },
  {
    "id": "RT2080",
    "createdAt": "2021-10-11",
    "paymentDue": "2021-10-12",
    "description": "Logo Concept",
    "paymentTerms": 1,
    "clientName": "Alysa Werner",
    "clientEmail": "alysa@email.co.uk",
    "status": "pending",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "63 Warwick Road",
      "city": "Carlisle",
      "postCode": "CA20 2TG",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Logo Sketches",
        "quantity": 1,
        "price": 102.04,
        "total": 102.04
      }
    ],
    "total": 102.04
  },
  {
    "id": "AA1449",
    "createdAt": "2021-10-7",
    "paymentDue": "2021-10-14",
    "description": "Re-branding",
    "paymentTerms": 7,
    "clientName": "Mellisa Clarke",
    "clientEmail": "mellisa.clarke@example.com",
    "status": "pending",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "46 Abbey Row",
      "city": "Cambridge",
      "postCode": "CB5 6EG",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "New Logo",
        "quantity": 1,
        "price": 1532.33,
        "total": 1532.33
      },
      {
        "name": "Brand Guidelines",
        "quantity": 1,
        "price": 2500.00,
        "total": 2500.00
      }
    ],
    "total": 4032.33
  },
  {
    "id": "TY9141",
    "createdAt": "2021-10-01",
    "paymentDue": "2021-10-31",
    "description": "Landing Page Design",
    "paymentTerms": 30,
    "clientName": "Thomas Wayne",
    "clientEmail": "thomas@dc.com",
    "status": "pending",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "3964  Queens Lane",
      "city": "Gotham",
      "postCode": "60457",
      "country": "United States of America"
    },
    "items": [
      {
        "name": "Web Design",
        "quantity": 1,
        "price": 6155.91,
        "total": 6155.91
      }
    ],
    "total": 6155.91
  },
  {
    "id": "FV2353",
    "createdAt": "2021-11-05",
    "paymentDue": "2021-11-12",
    "description": "Logo Re-design",
    "paymentTerms": 7,
    "clientName": "Anita Wainwright",
    "clientEmail": "",
    "status": "draft",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "",
      "city": "",
      "postCode": "",
      "country": ""
    },
    "items": [
      {
        "name": "Logo Re-design",
        "quantity": 1,
        "price": 3102.04,
        "total": 3102.04
      }
    ],
    "total": 3102.04
  }
]

export default function ViewInvoice() {
  const subNav = useContext(SubNavContext)
  const invoiceId = useParams().invoiceId
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const identifiedInvoice = INVOICES.find(i => i.id === invoiceId)
  const formattedTotalCost = identifiedInvoice.total.toFixed(2)

  // open/close/render SideDrawer
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // watch window resizing to determine which type of New Page Button will be rendered
  const watchWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", watchWidth)
    return () => {
      window.removeEventListener('resize', watchWidth)
    }
  }, [])
  
  // determine which button will be rendered depending on screen size
   const editPageButton = () => {
      if (windowWidth > 768) {
          return (
            <Button edit onClick={openDrawerHandler}>Edit</Button>
          )
      } else {
          return (
            <Button edit to={`/${identifiedInvoice.id}/edit`} >Edit</Button>
          )
      }}

  // change drawerIsOpen state
  const openDrawerHandler = () => {
    setDrawerIsOpen(true)
  }
  const closeDrawerHandler = () => {
      setDrawerIsOpen(false)
  }
  
  // render subnavigation
  useEffect(() => {
    subNav.viewOtherNav()
  }, [subNav])
  
  // functions for delete modal
  const showDeleteWarningHandler = () => {
    setShowDeleteModal(true)
  }
  const cancelDeleteWarningHandler = () => {
    setShowDeleteModal(false)
  }
  const confirmDeleteHandler = () => {
    setShowDeleteModal(false)
    console.log('Deleting...')
  }

  const formatDate = (date) => {
    return new Date(date).toString().slice(4, 15)
  }

  const invoiceServiceElements = identifiedInvoice.items.map(item => {
    return <InvoiceService 
      key={nanoid()} 
      name={item.name} 
      quantity={item.quantity} 
      price={item.price} 
      total={item.total} 
    />
  })

  const invoiceNamesServiceElements = identifiedInvoice.items.map(item => {
    return <h5 className='invoice-service--tablet__name' key={nanoid()}>{item.name}</h5>
  })

  const invoiceQtyServiceElements = identifiedInvoice.items.map(item => {
    return <h5 className='invoice-service--tablet__quantity' key={nanoid()}>{item.quantity}</h5>
  })

  const invoicePriceServiceElements = identifiedInvoice.items.map(item => {
    return <h5 className='invoice-service--tablet__price' key={nanoid()}>{item.price}</h5>
  })

  const invoiceTotalServiceElements = identifiedInvoice.items.map(item => {
    return <h5 className='invoice-service--tablet__total' key={nanoid()}>{item.total}</h5>
  })

  // render the page's buttons
  const viewPageButtons = (
    <div className='view-page__buttons'>
      {editPageButton()}
      <Button delete onClick={showDeleteWarningHandler}>Delete</Button>
      {identifiedInvoice.status !== 'draft' &&
        <Button>Mark as {identifiedInvoice.status === 'paid' ? "Unpaid" : "Paid"}</Button>
      }
    </div>
  )


  // render a card or the invoice form
  if (!identifiedInvoice) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find invoice!</h2>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <EditInvoice />
      </SideDrawer>

      <Modal
        show={showDeleteModal}
        onCancel={cancelDeleteWarningHandler}
        header="Confirm Deletion"
        footerClass="view-invoice__modal-actions"
        footer={
          <React.Fragment>
            <Button edit onClick={cancelDeleteWarningHandler}>Cancel</Button>
            <Button delete onClick={confirmDeleteHandler} to="/">Delete</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete invoice {identifiedInvoice.id}? This action cannot be undone.</p>
      </Modal>
      
      <div className='center'>
        <Card className='flex'>
          <div className='invoice__status'>
            <p>Status</p>
            <StatusCard status={identifiedInvoice.status}/>
          </div>
          <div className='view-btn-section__large-screen'>
            {viewPageButtons}
          </div>
        </Card>

        <Card className='invoice__main'>
          <div className='invoice__description-and-sender'>
            <div className='description-section'>
              <h3 className='description-section__id'><span>#</span>{identifiedInvoice.id}</h3>
              <p>{identifiedInvoice.description}</p>
            </div>

            <div className='sender-address-section'>
              <p>{identifiedInvoice.senderAddress.street}</p>
              <p>{identifiedInvoice.senderAddress.city}</p>
              <p>{identifiedInvoice.senderAddress.postCode}</p>
              <p>{identifiedInvoice.senderAddress.country}</p>
            </div>
          </div>

          <div className='billing-section__main'>
            <div className='billing-section'>
              <div className='billing-section__dates'>
                <div className='billing-section__dates-invoice'>
                  <p>Invoice Date</p>
                  <h3>{formatDate(identifiedInvoice.createdAt)}</h3>
                </div>
                <div className='billing-section__dates-payment'>
                  <p>Payment Due</p>
                  <h3>{formatDate(identifiedInvoice.paymentDue)}</h3>
                </div>
              </div>
              <div className='billing-section__address-info'>
                <p>Bill To</p>
                <h3>{identifiedInvoice.clientName}</h3>
                <div className='billing-section__address'>
                  <p>{identifiedInvoice.clientAddress.street}</p>
                  <p>{identifiedInvoice.clientAddress.city}</p>
                  <p>{identifiedInvoice.clientAddress.postCode}</p>
                  <p>{identifiedInvoice.clientAddress.country}</p>
                </div>
              </div>
            </div>
            <div className='email-section'>
              <p>Sent to</p>
              <h3>{identifiedInvoice.clientEmail}</h3>
            </div>
          </div>


          <div className='cost-section'>
            {invoiceServiceElements}

            <div className='cost-section__labels'>

              <div className='tablet__name-section'>
                <p>Item Name</p>
                {invoiceNamesServiceElements}
              </div>
              <div className='tablet__qty-section'>
                <p>QTY.</p>
                {invoiceQtyServiceElements}
              </div>
              <div className='tablet__price-section'>
                <p>Price</p>
                {invoicePriceServiceElements}
              </div>
              <div className='tablet__total-section'>
                <p>Total</p>
                {invoiceTotalServiceElements}
              </div>
              
            </div>

          </div>
          <div className='total-cost-section'>
            <h4>Grand Total</h4>
            <h2>£{formattedTotalCost}</h2>
          </div>
        </Card>
        
        <div className='view-btn-section__small-screen'>
          <ButtonSection>
              {viewPageButtons}
          </ButtonSection>
        </div>

      </div>
    </React.Fragment>
  )
}
