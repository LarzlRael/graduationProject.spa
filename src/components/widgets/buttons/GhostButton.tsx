import React from 'react'
import styled from 'styled-components'

import { ReactElement } from 'react'
/* import { sizeMedia } from '../../styles/mediaQuerys' */
export const ButtonStyle = styled.button<ButtonProps>`
  background: 'transparent';
  color: ${({ textColor, backgroundcolor }) =>
    textColor ? textColor : backgroundcolor};
font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: 1px solid ${({ backgroundcolor }) => backgroundcolor};
  padding: ${({ padding }) => padding ?? '0.7rem'};
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin};

  cursor: pointer;
  /* &:hover {
    background: darken(0.9, ${({ backgroundcolor }) => backgroundcolor});
  } */
  
`
interface ButtonProps {
  children: React.ReactNode
  icon?: ReactElement<any, any>
  onClick?: () => void
  backgroundcolor?: string
  textColor?: string
  type?: 'button' | 'submit'
  margin?: string
  className?: string
  borderRadius?: string
  padding?: string
  fontSize?: string
  disabled?: boolean
}
export const GhostButton = ({
  children,
  onClick,
  icon,
  backgroundcolor,
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
      backgroundcolor={backgroundcolor}
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
