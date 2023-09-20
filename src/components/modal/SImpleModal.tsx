import { useContext } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import styled from 'styled-components'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import { sizeMedia } from '../../utils/mediaQuerys'
import { CommonContext } from '../../context/commonContext/CommonContext'

export interface LayoutProps {
  padding?: string
  mostrarHeader?: boolean
  mostrarOverLay?: boolean
  positionModal?: string
}

export const SimpleModal = ({
  mostrarHeader = true,
  mostrarOverLay = true,
  padding = '20px',
  positionModal = 'center',
}: LayoutProps) => {
  const { simpleModal, changeSimpleModal, darkTheme } = useContext(
    CommonContext,
  )

  return (
    <>
      {simpleModal.isOpen && (
        <Overlay $mostrarOverLay={mostrarOverLay} $positionModal={positionModal}>
          <ContanedorModal
            className="animate__animated animate__fadeIn"
            $darkTheme={darkTheme}
            $padding={padding}
            width={simpleModal.width}
          >
            {mostrarHeader && (
              <EncabezadoModal>
                <h3>{simpleModal.title}</h3>
                {simpleModal.isButtonClose && (
                  <BotonCerrar
                    onClick={() => {
                      changeSimpleModal({
                        contentModal: null,
                        isOpen: false,
                        title: '',
                      })
                    }}
                  >
                    <IoCloseCircle size={20} />
                  </BotonCerrar>
                )}
              </EncabezadoModal>
            )}

            {simpleModal.contentModal}
          </ContanedorModal>
        </Overlay>
      )}
    </>
  )
}

const Overlay = styled.div<{
  $mostrarOverLay: boolean
  $positionModal: string
}>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background: ${({ $mostrarOverLay }) =>
    $mostrarOverLay ? 'rgba(0, 0, 0, .5)' : 'rgba(0, 0, 0, .0)'};
  display: flex;
  align-items: ${({ $positionModal }) => $positionModal};
  justify-content: center;
`

const ContanedorModal = styled.div<{
  $padding: string
  $darkTheme: boolean
  width?: string
  height?: string
}>`
  width: ${({ width }) => width || '50%'};
  height: ${({ height }) => height || 'auto'};
  min-height: 100px;
  background: ${({ $darkTheme }) => ($darkTheme ? '#1f2430' : '#fff')};
  position: relative;
  border-radius: 10px;
  transition: 0.3s ease all;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: ${({ $padding }) => $padding};
  overflow: auto;

  @media ${sizeMedia('sm')} {
    width: 90%;
  }
`

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  h3 {
    font-weight: 500;
    font-size: 1rem;
    color: #1766dc;
  }
`
const BotonCerrar = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;
  &:hover {
    background: #f2f2f2;
  }
`
