import { useField, ErrorMessage } from 'formik'
import React, { useState } from 'react'
interface Props {
  label: string
  name: string
  [x: string]: any
}
export const Switch = ({ label, ...props }: Props) => {
  const [field] = useField({ ...props, type: 'checkbox' })
  return (
    <>
      <label className="toggle">
        <span className="toggle-label Form__label--pyme">{label}</span>
        <input
          type="checkbox"
          {...field}
          {...props}
          className="toggle-checkbox"
        />
        <div className="toggle-switch"></div>
      </label>
      <ErrorMessage
        name={props.name}
        component="label"
        className="Form__text-error"
      />
    </>
  )
}
