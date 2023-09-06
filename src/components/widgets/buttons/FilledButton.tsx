import React from 'react'
import styled from 'styled-components'

import { ReactElement } from 'react'
/* import { sizeMedia } from '../../styles/mediaQuerys' */
export const ButtonStyle = styled.button<ButtonProps>`
  background: ${({ backGroundColor }) =>
    backGroundColor ? backGroundColor : '#444752'};
  color: ${({ textColor }) => (textColor ? textColor : 'white')};
font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: none;
  padding: ${({ padding }) => padding ?? '0.7rem'};
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin};

  cursor: pointer;
  /* &:hover {
    background: darken(0.9, ${({ backGroundColor }) => backGroundColor});
  } */
  
`
interface ButtonProps {
  children: React.ReactNode
  icon?: ReactElement<any, any>
  onClick?: () => void
  backGroundColor?: string
  textColor?: string
  type?: 'button' | 'submit'
  margin?: string
  className?: string
  borderRadius?: string
  padding?: string
  fontSize?: string
  disabled?: boolean
}
export const FilledButton = ({
  children,
  onClick,
  icon,
  backGroundColor,
  textColor,
  type = 'button',
  margin = '0',
  className,
  borderRadius,
  padding,
  fontSize = '1rem',
  disabled,
}: ButtonProps) => {
  return (
    <ButtonStyle
      disabled={disabled}
      type={type}
      backGroundColor={backGroundColor}
      onClick={onClick}
      textColor={textColor}
      margin={margin}
      borderRadius={borderRadius}
      className={className}
      padding={padding}
      fontSize={fontSize}
    >
      {children}

      {icon && (
        <>
          <div
            style={{
              marginLeft: '10px',
            }}
          />
          {icon}
        </>
      )}
    </ButtonStyle>
  )
}
