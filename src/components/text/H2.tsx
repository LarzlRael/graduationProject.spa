import React from 'react'
import styled from 'styled-components'
import { sizeMedia } from './mediaQuerys'

export const H2Styled = styled.h2<{
  fontSize?: string
  color?: string
  margin?: string
  bold?: boolean
  fontWeight?: string
  marginResponsive?: string
  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
}>`
  color: ${({ color }) => (color ? color : '#292828')};
  font-size: ${({ fontSize }) => fontSize};
  display: block;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  margin: ${({ margin }) => margin};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};

  @media ${sizeMedia('xs_sm')} {
    margin: ${({ marginResponsive }) => marginResponsive && marginResponsive};
  }
`

interface PropsH2 {
  children: React.ReactNode
  fontSize?: string
  color?: string
  margin?: string
  bold?: boolean
  fontWeight?: string
  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  marginResponsive?: string
  [x: string]: any
}
export const H2 = (props: PropsH2) => (
  <H2Styled className={props.className} {...props}>
    {props.children}
  </H2Styled>
)
