import React from 'react'
import styled from 'styled-components'
import { sizeMedia } from './mediaQuerys'

export const SpanStyled = styled.span<{
  fontSize?: string
  color?: string
  margin?: string
  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 'initial'
    | 'inherit'
    | string
  marginResponsive?: string
}>`
  font-size: ${(props) => props.fontSize || '18px'};
  color: ${({ color }) => (color ? color : '#292828')};
  display: block;
  margin-top: 1rem;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  margin: ${({ margin }) => margin};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  @media ${sizeMedia('xs_sm')} {
    margin: ${({ marginResponsive }) => marginResponsive && marginResponsive};
  }
`
interface SpanProps {
  fontSize?: string
  color?: string
  margin?: string

  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  fontWeight?: string
  children: React.ReactNode
  marginResponsive?: string
}
export const Span = (spanProps: SpanProps) => {
  return <SpanStyled {...spanProps}>{spanProps.children}</SpanStyled>
}
