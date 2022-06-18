import React from 'react'
import { Link } from 'react-router-dom'

import './Button.css'

export default function Button(props) {
    if (props.href) {
        return (
            <a
                className={`button ${props.new && 'button--new'} ${props.edit && 'button--edit'} ${props.draft && 'button--draft'} ${props.delete && 'button--delete'} ${props.addItem && 'button--add-item'}`}
                href={props.href}
            >
                {props.children}
            </a>
        )
    }
    if (props.to) {
        return (
            <Link 
                to={props.to}
                exact={props.exact}
                className={`button ${props.new && 'button--new'} ${props.edit && 'button--edit'} ${props.draft && 'button--draft'} ${props.delete && 'button--delete'} ${props.addItem && 'button--add-item'}`}
            >
                {props.children}
            </Link>
        )
    }
  return (
    <button
        className={`button ${props.new && 'button--new'} ${props.edit && 'button--edit'} ${props.draft && 'button--draft'} ${props.delete && 'button--delete'} ${props.addItem && 'button--add-item'}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.children}
    </button>
  )
}
