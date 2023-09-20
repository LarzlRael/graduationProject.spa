import RenderModal from './RenderModal'

import './style/GlobalModal.css'
import { useContext } from 'react'
import { CommonContext } from '../../context/commonContext/CommonContext'
import { FilledButton } from '../widgets/buttons/FilledButton'
const GlobalModal = () => {
  const { globalModal, changeModal } = useContext(CommonContext)
  function handelModal() {
    changeModal({
      status: !globalModal.status,
      title: '',
      contentModal: null,
      butttonText: '',
      onClick: null,
      width: null,
    })
  }
  function handelButtonModal() {
    /* if (globalModal.onClick) {
      globalModal.onClick()
    } */
    changeModal({
      status: !globalModal.status,
      title: '',
      contentModal: null,
      butttonText: '',
      onClick: null,
      width: null,
    })
  }
  if (globalModal.status) {
    return (
      <RenderModal
        width={globalModal.width ? globalModal.width : 'auto'}
        minWidth="400px"
        onClose={handelModal}
      >
        {/* <div className="GlobalModal"> */}
        <h2>{globalModal.title}</h2>
        <div className="GlobalModal__p">{globalModal.contentModal}</div>
        <div
          className="GlobalModal__btns"
          style={{
            textAlign: 'center',
          }}
        >
          {globalModal.butttonText !== null && (
            <FilledButton onClick={handelModal}>Cerrar</FilledButton>
          )}
          {globalModal.butttonText && (
            <FilledButton onClick={handelButtonModal}>
              {globalModal.butttonText}
            </FilledButton>
          )}
        </div>
        {/* </div> */}
      </RenderModal>
    )
  } else {
    return null
  }
}
export default GlobalModal
