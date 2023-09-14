import { useState, useEffect } from 'react'
import { useDebounceValue } from '../../hooks/useDebounceValue'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'
import ToolTip from '../boxex/ToolTip'

interface Props {
  onDebounce: (value: string) => void
  placeholder?: string
  callback?: () => void
}

export const SearchInput = ({ onDebounce, placeholder, callback }: Props) => {
  const [textValue, setTextValue] = useState('')

  const { debouncedValue } = useDebounceValue(textValue, 750)

  useEffect(() => {
    onDebounce(debouncedValue)
  }, [debouncedValue, onDebounce])

  return (
    <div className="search-form">
      <div className="search-form__wrapper">
        <div className="search-form__wrapper--icon">
          <input
            placeholder={placeholder}
            autoCapitalize="none"
            value={textValue}
            className="search-form__input"
            onChange={(e) => {
              setTextValue(e.target.value)
            }}
          />
          {textValue.length > 0 && (
            <FaTimesCircle
              className="search-form__icon"
              onClick={() => setTextValue('')}
              color="var(--secondary-color)"
            />
          )}
        </div>

        <ToolTip content="Buscar">
          <button className="search-form__button">
            <FaSearch
              name="search-outline"
              color="white"
              size={15}
              onClick={callback}
            />
          </button>
        </ToolTip>
      </div>
    </div>
  )
}
