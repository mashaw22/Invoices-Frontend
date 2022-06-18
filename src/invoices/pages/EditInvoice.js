import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { SubNavContext } from '../../shared/context/sub-nav-context'
import { useForm } from '../../shared/hooks/form-hook'
import ButtonSection from '../../shared/components/FormElements/ButtonSection'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
// import DeleteIcon from '../../shared/components/UIElements/images/icon-delete.svg'
import Card from '../../shared/components/UIElements/Card'
import './InvoiceForm.css'

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


export default function EditInvoice(props) {
  const [isLoading, setIsLoading] = useState(true)
  const invoiceId = useParams().invoiceId

  const [formState, inputHandler, setFormData] = useForm(
    {
      createdAt: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      paymentTerms: {
        value: '',
        isValid: true
      },
      clientName: {
        value: '',
        isValid: false
      },
      clientEmail: {
        value: '',
        isValid: false
      },
      senderAddress: {
        street: {
          value: '',
          isValid: false
        },
        city: {
          value: '',
          isValid: false
        },
        postCode: {
          value: '',
          isValid: false
        },
        country: {
          value: '',
          isValid: false
        }
      },
      clientAddress: {
        street: {
          value: '',
          isValid: false
        },
        city: {
          value: '',
          isValid: false
        },
        postCode: {
          value: '',
          isValid: false
        },
        country: {
          value: '',
          isValid: false
        }
      },
      items: [
        {
          name: {
            value: '',
            isValid: false
          },
          quantity: {
            value: '',
            isValid: false
          },
          price: {
            value: '',
            isValid: false
          },
          total: {
            value: '',
            isValid: false
          }
        }
      ],
      total: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const identifiedInvoice = INVOICES.find(i => i.id === invoiceId)

  useEffect(() => {
    if (identifiedInvoice) {
      setFormData(
        {
          createdAt: {
            value: identifiedInvoice.createdAt,
            isValid: true
          },
          description: {
            value: identifiedInvoice.description,
            isValid: true
          },
          paymentTerms: {
            value: identifiedInvoice.paymentTerms,
            isValid: true
          },
          clientName: {
            value: identifiedInvoice.clientName,
            isValid: true
          },
          clientEmail: {
            value: identifiedInvoice.clientEmail,
            isValid: true
          },
          senderAddress: {
            street: {
              value: identifiedInvoice.senderAddress.street,
              isValid: true
            },
            city: {
              value: identifiedInvoice.senderAddress.city,
              isValid: true
            },
            postCode: {
              value: identifiedInvoice.senderAddress.postCode,
              isValid: true
            },
            country: {
              value: identifiedInvoice.senderAddress.country,
              isValid: true
            }
          },
          clientAddress: {
            street: {
              value: identifiedInvoice.clientAddress.street,
              isValid: true
            },
            city: {
              value: identifiedInvoice.clientAddress.city,
              isValid: true
            },
            postCode: {
              value: identifiedInvoice.clientAddress.postCode,
              isValid: true
            },
            country: {
              value: identifiedInvoice.clientAddress.country,
              isValid: true
            }
          },
          items: [
            {
              name: {
                value: identifiedInvoice.items.name,
                isValid: true
              },
              quantity: {
                value: identifiedInvoice.items.quantity,
                isValid: true
              },
              price: {
                value: identifiedInvoice.items.price,
                isValid: true
              },
              total: {
                value: identifiedInvoice.items.total,
                isValid: true
              }
            }
          ],
          total: {
            value: '',
            isValid: true
          }
        },
        true
      )
    }  
    setIsLoading(false)
  }, [setFormData, identifiedInvoice, setIsLoading])

  const subNav = useContext(SubNavContext)

  useEffect(() => {
    subNav.viewOtherNav()
  }, [subNav])

  const invoiceUpdateSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) //send this to the backend
  }

  // render card if unable to find invoice
  if (!identifiedInvoice) {
    return (
      <div className='center'>
        <Card className='center'>
          <h2>Could not find invoice!</h2>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='center'>
        <Card className='center'>
          <h2>Loading...</h2>
        </Card>
      </div>
    )
  }

  // render edit form to page
  return (
    <form onSubmit={invoiceUpdateSubmitHandler}>
      <div className='form-inputs'>
        <h1>Edit <span>#</span>{invoiceId} </h1>
        <div className='bill-from'>
          <p className='bill-from__title'>Bill From</p>
          <Input 
            id="street"
            element="input"
            type="text"
            label="Street Address"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a valid street address."
            onInput={inputHandler}
            value={formState.inputs.senderAddress.street.value}
            valid={formState.inputs.senderAddress.street.isValid}
          />
          
            <div className='invoice__inline-inputs'>
              <Input 
                id="city"
                element="input"
                type="text"
                label="City"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a city."
                onInput={inputHandler}
                value={formState.inputs.senderAddress.city.value}
                valid={formState.inputs.senderAddress.city.isValid}
                split
              />
              <Input 
                id="postCode"
                element="input"
                type="text"
                label="Post Code"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a valid Post Code."
                onInput={inputHandler}
                value={formState.inputs.senderAddress.postCode.value}
                valid={formState.inputs.senderAddress.postCode.isValid}
                split
              />
            <Input 
              id="country"
              element="input"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              // errorText="Please enter a country."
              onInput={inputHandler}
              value={formState.inputs.senderAddress.country.value}
            valid={formState.inputs.senderAddress.country.isValid}
              split
              tablet
            />
            </div>
            <Input 
              id="country"
              element="input"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              // errorText="Please enter a valid country."
              onInput={inputHandler}
              value={formState.inputs.senderAddress.country.value}
            valid={formState.inputs.senderAddress.country.isValid}
              mobile
            />
          
        </div>

        <div className='bill-to'>
          <p className='bill-to__title'>Bill To</p>
          <Input 
            id="clientName"
            element="input"
            type="text"
            label="Client's Name"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a name."
            onInput={inputHandler}
            value={formState.inputs.clientName.value}
            valid={formState.inputs.clientName.isValid}
          />
          <Input 
            id="clientEmail"
            element="input"
            type="email"
            label="Client's Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            value={formState.inputs.clientEmail.value}
            valid={formState.inputs.clientEmail.isValid}
          />
          <Input 
            id="street"
            element="input"
            type="text"
            label="Street Address"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a valid street address."
            onInput={inputHandler}
            value={formState.inputs.clientAddress.street.value}
            valid={formState.inputs.clientAddress.street.isValid}
          />
          <div className='invoice__inline-inputs'>
          <Input 
                id="city"
                element="input"
                type="text"
                label="City"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a city."
                onInput={inputHandler}
                value={formState.inputs.clientAddress.city.value}
                valid={formState.inputs.clientAddress.city.isValid}
                split
              />
              <Input 
                id="postCode"
                element="input"
                type="text"
                label="Post Code"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a post code."
                onInput={inputHandler}
                value={formState.inputs.clientAddress.postCode.value}
                valid={formState.inputs.clientAddress.postCode.isValid}
                split
              />
            <Input 
              id="country"
              element="input"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              // errorText="Please enter a valid country."
              onInput={inputHandler}
              value={formState.inputs.clientAddress.country.value}
              valid={formState.inputs.clientAddress.country.isValid}
              split
              tablet
            />
            </div>
            <Input 
              id="country"
              element="input"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              // errorText="Please enter a valid country."
              onInput={inputHandler}
              value={formState.inputs.clientAddress.country.value}
              valid={formState.inputs.clientAddress.country.isValid}
              mobile
            />
        </div>

        <div className='invoice__inline-inputs'>
          <Input 
            id="createdAt"
            element="input"
            type="date"
            label="Invoice Date"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a date."
            onInput={inputHandler}
            value={formState.inputs.createdAt.value}
            valid={formState.inputs.createdAt.isValid}
          />
          <Input 
            id="paymentTerms"
            element="select"
            label="Payment Terms"
            validators={[]}
            // errorText="Please select payment terms."
            onInput={inputHandler}
            options={[
              "Net 1 Day",
              "Net 7 Days",
              "Net 14 Days",
              "Net 30 Days"
            ]}
            value={formState.inputs.paymentTerms.value}
            valid={formState.inputs.paymentTerms.isValid}
          />
        </div>

        <Input 
            id="description"
            element="input"
            type="text"
            label="Project Descripton"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a description for your project."
            onInput={inputHandler}
            value={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}
          />


        {/* <div className='invoice-items'>
          <h2>Item List</h2>
          <div className='invoice-item__section'>
            <Input 
              id="name"
              element="input"
              type="text"
              label="Item Name"
              validators={[VALIDATOR_REQUIRE()]}
              // errorText="Please enter an item."
              onInput={inputHandler}
              value={formState.inputs.items.name.value}
              valid={formState.inputs.items.name.isValid}
              split
            />
            <div className='invoice-item__info'>
              <Input 
                id="quantity"
                element="input"
                type="number"
                label="Qty."
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a valid quantity."
                onInput={inputHandler}
                value={formState.inputs.items.quantity.value}
                valid={formState.inputs.items.quantity.isValid}
                split
                threeWay
              />
              <Input 
                id="price"
                element="input"
                type="number"
                label="Price"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a valid price."
                onInput={inputHandler}
                value={formState.inputs.items.price.value}
                valid={formState.inputs.items.price.isValid}
                split
                threeWay
              />
              <Input 
                id="total"
                element="input"
                type="number"
                label="Total"
                validators={[VALIDATOR_REQUIRE()]}
                // errorText="Please enter a valid price."
                onInput={inputHandler}
                value={formState.inputs.items.total.value}
                valid={formState.inputs.items.total.isValid}
                split
                threeWay
              />
              <div>
                <img src={DeleteIcon} alt='delete'/>
              </div>

            </div>

          </div>
          <Button addItem>+ Add New Item</Button>
        </div> */}
      </div>
      <div className='gradient'></div>

      <ButtonSection >
        <Button edit>Cancel</Button>
        <Button type="submit" disabled={!formState.isValid}>Save Changes</Button>
      </ButtonSection>
    </form>
  )
}
