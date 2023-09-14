import React from 'react'
import styled from 'styled-components'
export const LabelStyled = styled.label<{
  fontSize?: string
  color?: string
  margin?: string
  display?: string
  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 'initial'
    | 'inherit'
    | string
}>`
  font-size: ${(props) => props.fontSize || '14px'};
  color: ${({ color }) => (color ? color : '#000')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  margin: ${({ margin }) => margin};
  display: ${({ display }) => (display ? display : 'inline-block')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
`
interface SpanProps {
  fontSize?: string
  color?: string
  margin?: string
  htmlFor?: string

  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  fontWeight?: string
  children: React.ReactNode
  display?: string
}
export const Label = (props: SpanProps) => {
  return (
    <LabelStyled htmlFor={props.htmlFor} {...props}>
      {props.children}
    </LabelStyled>
  )
}
