import React, { useContext, useEffect } from 'react'

import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { SubNavContext } from '../../shared/context/sub-nav-context'
import { useForm } from '../../shared/hooks/form-hook'
import ButtonSection from '../../shared/components/FormElements/ButtonSection'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import DeleteIcon from '../../shared/components/UIElements/images/icon-delete.svg'
import './InvoiceForm.css'


export default function NewInvoice() {
  const [formState, inputHandler] = useForm(
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

  const subNav = useContext(SubNavContext)

  useEffect(() => {
    subNav.viewOtherNav()
  }, [subNav])


  const invoiceSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) //send this to the backend
  }

  return (
    <form onSubmit={invoiceSubmitHandler}>
      <div className='form-inputs'>
        <h1>New Invoice</h1>
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
          />
          <Input 
            id="clientEmail"
            element="input"
            type="email"
            label="Client's Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input 
            id="street"
            element="input"
            type="text"
            label="Street Address"
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a valid street address."
            onInput={inputHandler}
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
          />


        <div className='invoice-items'>
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
                split
                threeWay
              />
              <div>
                <img src={DeleteIcon} alt='delete'/>
              </div>

            </div>

          </div>
          <Button addItem>+ Add New Item</Button>
        </div>
      </div>
        <div className='gradient'></div>


      <ButtonSection >
        <Button edit>Discard</Button>
        <div className='buttons-right'>
          <Button draft>Save as Draft</Button>
          <Button type="submit" >Save & Send</Button>
        </div>
      </ButtonSection>
    </form>
  )
}
