import './Input.scss'
import { ErrorMessage, useField } from 'formik'
import React, { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
interface Props {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  [x: string]: any
  showClearIcon?: boolean
}
export const Input = ({ label, type, showClearIcon, ...props }: Props) => {
  const [field, meta] = useField(props)
  const [check, setcheck] = useState({
    typeInput: 'password',
  })
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target
    setcheck({
      typeInput: checked ? 'text' : 'password',
    })
  }

  return (
    <>
      <label className="Input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div className="Form__input--container">
        <input
          id={props.name}
          className="Form__input--pyme"
          type={type !== 'password' ? type : check.typeInput}
          {...field}
          {...props}

        />
        {showClearIcon && field.value.length > 0 && (
          <FaTimesCircle
            color="var(--secondary-color)"
            onClick={() => field.onChange({ target: { value: '' } })}
            className="Form__input--icon pointer"
          />
        )}
      </div>
      {type === 'password' && (
        <div className="Input__check">
          <label htmlFor="checkBox">Mostrar contraseña</label>
          <input
            onChange={handleCheck}
            type="checkbox"
            name="checkBox"
            id="checkBox"
          />
        </div>
      )}
      <ErrorMessage
        name={props.name}
        component="label"
        className="Form__text-error"
      />
    </>
  )
}
