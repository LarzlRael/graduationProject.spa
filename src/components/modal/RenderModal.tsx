import styled from 'styled-components'
const ModalStyle = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .RenderModal__close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem 1rem;
    background-color: white;
    text-decoration: none;
    border: none;
    cursor: pointer;
    z-index: 2;
    color: var(--red);
    font-size: 1.6rem;
  }
  .RenderModal__container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  .RenderModal__main {
    position: absolute;
    z-index: 1;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    background: ${(props) => props.background};
    padding: 10px 20px;
    border-radius: 10px;
    overflow-y: auto;
    width: ${(props) => props.width};
    min-width: ${(props) => props.minWidth};
  }
  .RenderModal__main::-webkit-scrollbar {
    width: 1rem;
  }
  .RenderModal__main::-webkit-scrollbar-track {
    margin: 10px 0;
  }
  .RenderModal__main::-webkit-scrollbar-thumb {
    background: var(--green);
    border-radius: 25px;
  }
  .RenderModal__close {
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 0;
  }
  @media (max-width: ${(props) => props.width}) {
    .RenderModal__main {
      width: calc(100% - 20px);
      max-height: calc(100vh - 10px);
      min-width: auto;
    }
    .RenderModal__close-button {
      border: 1px solid var(--black);
    }
  }
`
const RenderModal = (props:any) => {
  const {
    onClose,
    children,
    minWidth,
    width = '900px',
    closeOutside = false,
    background = 'var(--white)',
  } = props

  return (
    <ModalStyle background={background} width={width} minWidth={minWidth}>
      <button className="RenderModal__close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <div className="RenderModal__container">
        {closeOutside && (
          <div className="RenderModal__close" onClick={onClose}></div>
        )}
        <div className="RenderModal__main">{children}</div>
      </div>
    </ModalStyle>
  )
}

export default RenderModal
