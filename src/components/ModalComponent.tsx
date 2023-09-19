import { useContext } from 'react'

import { Modal } from './Modal'
import { FilledButton } from './widgets/buttons/FilledButton'
import { CommonContext } from '../context/commonContext/CommonContext'

interface ModalProps {
  children: React.ReactNode
}
export const ModalComponent = ({ children }: ModalProps) => {
  const { openModal } = useContext(CommonContext)
  return (
    <div className="modal-wrapper">
      <FilledButton onClick={openModal}>Consultar</FilledButton>
      <Modal titulo="Consultar Focos de calor">{children}</Modal>
    </div>
  )
}
