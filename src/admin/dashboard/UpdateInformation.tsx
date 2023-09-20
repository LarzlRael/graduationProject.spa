import { useContext, useRef, useState } from 'react'

import { ChangeEvent } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdFileUpload } from 'react-icons/md'
import { uploadFileCVS } from '../../provider/reportsServices'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import ToolTip from '../../components/ToolTip'
import { FilledButton } from '../../components/widgets/buttons/FilledButton'
import { CommonContext } from '../../context/commonContext/CommonContext'
import {
  Loading2,
  LoadingSpin,
} from '../../components/widgets/loadings/Loading'
import { LoadingElipsis } from '../../components/widgets/loadings/LoadingElipsis'
import { postAction } from '../../provider/services/action/ActionAuthorization'
import { validateStatus } from '../../utils/validation'

export const UpdateInformation = () => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const { changeSimpleModal } = useContext(CommonContext)
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFile(e.target.files[0])
    setIsSelected(true)
    e.currentTarget.value = ''
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    let formData = new FormData()
    formData.append('csv', selectedFile)

    changeSimpleModal({
      isOpen: true,
      title: 'ACTUALIZANDO BASE DE DATOS',

      contentModal: (
        <div>
          <h5>Se esta subiendo los datos, no cierre este ventana</h5>
          <LoadingElipsis />
        </div>
      ),
      isButtonClose: true,
      width: '350px',
    })

    setLoading(true)
    postAction('maps/uploadcsvupdate', formData)
      .then((res: any) => {
        /* console.log(res.status)
        if (validateStatus(res.status)) {
          toast.success(res.data.msg)

          changeSimpleModal({
            isOpen: false,
            title: '',
            contentModal: null,
          })
        } else {
          toast.error('Error al subir el archivo')
          changeSimpleModal({
            isOpen: false,
            title: '',
            contentModal: null,
          })
        } */
      })
      .catch((err: any) => {
        toast.error(err)
        changeSimpleModal({
          isOpen: false,
          title: '',
          contentModal: null,
        })
      })

    setLoading(false)
  }

  const clearFile = () => {
    setSelectedFile(undefined)
    setIsSelected(false)
  }

  useDocumentTitle('Actualizar Focos de calor')
  const inputRef = useRef<any>(null)

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click()
  }
  return (
    <div>
      <h2>Actualizar focos de calor</h2>
      <span>¿De donde consigo el archivo ?</span>
      <br />
      <span>
        Subir achivo de formato <b>.CVS</b>
      </span>
      <br />
      <input
        accept=".csv"
        /* className={classes.input} */
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={changeHandler}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <FilledButton onClick={handleClick}>
          Seleccionar archivo CVS
        </FilledButton>
      </label>
      {/*  {
                selectedFiles!.map(file => (
                    <span>{file?.name && file?.name}</span>
                ))
            } */}
      <span>{selectedFile?.name && selectedFile?.name}</span>
      <br />
      {isSelected && (
        <>
          <FilledButton
            onClick={uploadFile}
            icon={<MdFileUpload size="1.5rem" onClick={clearFile} />}
          >
            Actualizar Base de datos
          </FilledButton>
          <IoCloseCircleSharp size="1.5rem" onClick={clearFile} />
        </>
      )}
    </div>
  )
}
