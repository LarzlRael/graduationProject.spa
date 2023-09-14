import React from 'react'
interface Props {
  children: React.ReactNode
  fontSize?: string
  color?: string
  margin?: string
  textAlign?: 'center' | 'start' | 'end' | 'left' | 'right' | 'justify'
  lineHeight?: string
  /* fontWeight?: string | number */
}
export const P = ({
  fontSize,
  color,
  margin,
  textAlign,
  lineHeight,
  children,
}: Props) => {
  return (
    <p
      style={{
        fontSize: fontSize ? fontSize : '14px',
        color: color ? color : '#292828',
        margin: margin ? margin : '0',
        textAlign: textAlign ? textAlign : 'start',
        lineHeight: lineHeight ? lineHeight : '1.5rem',
      }}
    >
      {children}
    </p>
  )
}
