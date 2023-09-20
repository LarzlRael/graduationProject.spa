import { useContext } from 'react'
import { FilledButton } from '../widgets/buttons/FilledButton'
import { CommonContext } from '../../context/commonContext/CommonContext'

interface ModalProps {
  children: React.ReactNode
}
export const ModalComponent = ({ children }: ModalProps) => {
  const { changeSimpleModal } = useContext(CommonContext)
  function onClick() {
    changeSimpleModal({
      contentModal: children,
      isOpen: true,
      title: 'Consultar Focos de calor',
      isButtonClose: true,
    })
  }
  return (
    <div className="modal-wrapper">
      <FilledButton onClick={onClick}>Consultar</FilledButton>
    </div>
  )
}
