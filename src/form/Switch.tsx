import React from 'react'
import './Switch.css'
interface Props {
  label?: string
  checked: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Switch = (props: Props) => {
  return (
    <label className="pure-material-switch">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      {props.label && <span>{props.label}</span>}
    </label>
  )
}
