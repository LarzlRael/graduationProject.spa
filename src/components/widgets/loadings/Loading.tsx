import styled from 'styled-components'
/* import { primaryColor } from '../../../context/themeColors' */
export const LoadingSpin = () => {
  return (
    <>
      <LoadingSpiner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingSpiner>
    </>
  )
}

export const LoadingExpanded = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingSpiner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingSpiner>
    </div>
  )
}
const LoadingSpiner = styled.div`
    display: block;
    margin: auto;
    position: relative;
    width: 80px;
    height: 80px;
}
div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--primary-color) transparent transparent transparent;
    }
div:nth-child(1) {
    animation-delay: -0.45s;
}
div:nth-child(2) {
    animation-delay: -0.3s;
}
div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
    }
`
export const Loading2 = styled.div`
  @keyframes loader {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  &:before,
  &:after {
    animation: loader 2s linear infinite;
    content: '';
    border: 2px solid #fff;
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius: 50%;
  }
  &:after {
    opacity: 0;
    animation-delay: 1s;
  }
`

export const Loading3 = () => {
  return (
    <>
      <Loading2></Loading2>
    </>
  )
}
