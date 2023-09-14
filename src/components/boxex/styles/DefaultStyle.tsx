import styled from 'styled-components'

const DefaultStyle = styled.button<{
  padding?: string
  width?: string
  background?: string
  color?: string
  fontSize?: string
  fontWeight?: string
}>`
  padding: ${(props) => (props.padding ? props.padding : '5px')};
  border-radius: 5px;
  border: 1px solid ${(props) =>
    props.color ? props.color : 'var(--secondary-color)'};
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.6rem')};  ;
  width: ${(props) => (props.width ? props.width : 'auto')};
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  flex-wrap: nowrap;
  background: ${(props) =>
    props.background
      ? 'var(--white)'
      : props.color
      ? props.color
      : 'var(--orange2)'};
  color: ${(props) => (props.background ? 'var(--orange2)' : 'var(--white)')};

  &:hover {
    /* border: 1px solid
      ${(props) =>
        props.background
          ? 'var(--black)'
          : props.color
          ? props.color
          : 'var(--orange2)'}; */
    opacity: 0.7;
    /* color: var(--black); */
  }
  &:disabled {
    opacity: 0.1 !important;
  }
`
export default DefaultStyle
