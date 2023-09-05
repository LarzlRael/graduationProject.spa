import { useContext } from 'react'

import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import { Modal } from './Modal'
import { FilledButton } from './widgets/buttons/FilledButton'

interface ModalProps {
  children: React.ReactNode
}
export const ModalComponent = ({ children }: ModalProps) => {
  const { openModal } = useContext(HeatSourcesContext)
  return (
    <div className="modal-wrapper">
      <FilledButton  onClick={openModal}>
        Consultar
      </FilledButton>
      <Modal titulo="Consultar Focos de calor">{children}</Modal>
    </div>
  )
}
