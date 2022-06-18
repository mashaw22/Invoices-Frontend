import React, { useReducer, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { validate } from '../../util/validators'

import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state, 
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default: 
            return state
    }
}

export default function Input(props) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '', 
        isTouched: false,
        isValid: props.isValid || false
    })

    const {onInput, id} = props
    const {value, isValid} = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    let selectOptions
    if (props.options) {
        selectOptions = props.options.map(opt => {
            return <option key={nanoid()} value={opt} className="select-option">{opt}</option>
        })
    }

    function element() {
        if (props.element === 'input') {
            return (
                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                />
            )
        } else if (props.element === 'select') {
            return (
                <select
                    id={props.id}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                >
                    {selectOptions}
                </select>
            )
        }
    }


  return (
      <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'} ${props.split && 'form-control__split'} ${props.mobile && 'form-control__mobile'} ${props.tablet && 'form-control__tablet'}`}>
          <div className='label-flex'>
            <label htmlFor={props.id}>{props.label}</label>
            {!inputState.isValid && inputState.isTouched && <p className='error'>{props.errorText} Cannot be empty.</p>}
          </div>
          {element()}
      </div>
  )
}
