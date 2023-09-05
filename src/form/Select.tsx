import { css, styled } from 'styled-components'

const sharedStyles = css`
  background-repeat: no-repeat;
  background-color: transparent;
  background-image: url('../images/misc-icons/caret_hack.png');
  background-position: right center;
  box-shadow: none;
  color: rgba(40, 70, 99, 0.6);
  -webkit-appearance: none;
  -moz-appearance: none;
  -moz-margin-start: -3px;
  border: 0;
  padding-bottom: 0;
  padding-left: 0;
  &::-ms-expand {
    display: none;
  }
`

export const BasicDropdownContainer = styled.div`
  border-bottom: 1px solid rgba(41, 70, 97, 0.2);
  position: relative;
  max-width: 230px;
  padding-top: 8px;
  background-color: transparent;
  transition: 0.5s border-color;

  label {
    font-size: 12px;
    top: -14px;
  }

  &.sg-input-container {
    margin-top: 21px;
  }

  &.basic-dropdown-error {
    border-color: $invalid-input-border;
    border-width: 2px;
  }
`

export const BasicDropdownSelect = styled.select`
  ${sharedStyles};

  &[disabled] {
    background-color: transparent;
    color: rgba(40, 70, 99, 0.4);
  }
`

export const Select = () => {
  return (
    <BasicDropdownContainer className="basic-dropdown">
      <label>Label</label>
      <BasicDropdownSelect>
        {/* Opciones del select */}
        <option value="">2</option>
        
      </BasicDropdownSelect>
    </BasicDropdownContainer>
  )
}
