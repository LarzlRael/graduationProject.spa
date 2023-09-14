import { ErrorMessage, useField } from 'formik'
import React, { useState } from 'react'
interface Props {
  label: string
  name: string
  [x: string]: any
}
export const TextArea = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label className="Form__label--pyme" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        className="Form__input--textarea"
        {...field}
        {...props}
      />
      <ErrorMessage
        name={props.name}
        component="label"
        className="Form__text-error"
      />
    </>
  )
}
