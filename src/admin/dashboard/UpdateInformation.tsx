import { useContext, useRef, useState } from 'react'

import { ChangeEvent } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdFileUpload } from 'react-icons/md'
import { uploadFileCVS } from '../../provider/reportsServices'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

import { FilledButton } from '../../components/widgets/buttons/FilledButton'
import { CommonContext } from '../../context/commonContext/CommonContext'
import {
  Loading2,
  LoadingSpin,
} from '../../components/widgets/loadings/Loading'
import { LoadingElipsis } from '../../components/widgets/loadings/LoadingElipsis'
import {
  getAction,
  postAction,
} from '../../provider/services/action/ActionAuthorization'
import { validateArray, validateStatus } from '../../utils/validation'
import ToolTip from '../../components/boxex/ToolTip'
import BoxFlex from '../../components/boxex/BoxFlex'
import { H2 } from '../../components/text'

export const UpdateInformation = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const { changeSimpleModal, clearSimpleaModal } = useContext(CommonContext)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  const uploadFile = async () => {
    if (!selectedFiles) return

    let formData = new FormData()
    /* formData.append('csv', selectedFile) */
    selectedFiles.forEach((file, index) => {
      formData.append('csv', file)
    })

    changeSimpleModal({
      isOpen: true,
      title: 'ACTUALIZANDO BASE DE DATOS',
      contentModal: (
        <div>
          <H2>Se esta subiendo los datos, no cierre este ventana</H2>
          <LoadingElipsis />
        </div>
      ),
      isButtonClose: false,
      width: '350px',
    })

    setLoading(true)
    postAction('maps/uploadcsvupdate', formData)
      .then((res: any) => {
        clearSimpleaModal()
        if (validateStatus(res.status)) {
          toast.success(res.data.message)
          clearAllFiles()
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err: any) => {
        toast.error(err)
      })

    setLoading(false)
  }

  const clearFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((file, i) => i !== index))
  }
  const clearAllFiles = () => {
    setSelectedFiles([])
  }

  useDocumentTitle('Actualizar Focos de calor')
  const inputRef = useRef<any>(null)

  const handleOpen = () => inputRef.current.click()

  const updateFromServer = async () => {
    changeSimpleModal({
      isOpen: true,
      title: 'ACTUALIZANDO BASE DE DATOS',
      contentModal: (
        <div>
          <H2 textAlign="center">
            Se esta actualizando la base de datos desde el servidor, no cierre
            este ventana
          </H2>
          <LoadingElipsis />
        </div>
      ),
      isButtonClose: false,
      width: '350px',
    })
    getAction('history/updateFromAPI')
      .then((res: any) => {
        clearSimpleaModal()
        if (validateStatus(res.status)) {
          toast.success('Base de datos actualizada correctamente')
        } else {
          toast.error('Hubo un error al actualizar la base de datos')
        }
      })
      .catch((err: any) => {
        toast.error('Error al actualizar la base de datos')
      })
  }

  return (
    <div>
      <H2 color="var(--primary-color)">Actualizar focos de calor</H2>
      <span>
        ¿De donde consigo los archivo para actualizar los focos de calor?
      </span>
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
        multiple={true}
        onChange={changeHandler}
      />

      <FilledButton onClick={handleOpen}>Seleccionar archivo CVS</FilledButton>

      {validateArray(selectedFiles) &&
        selectedFiles.map((file, index) => (
          <BoxFlex>
            <span key={index}>
              {file?.name && file?.name}
              {'  '}
              {file && Math.floor(file.size / 1000)} KB
            </span>
            <ToolTip
              content="Eliminar este archivo"
              children={
                <button
                  className="button__without__styles"
                  onClick={() => clearFile(index)}
                >
                  <IoCloseCircleSharp size="25" color="var(--primary-color)" />
                </button>
              }
            />
          </BoxFlex>
        ))}

      {validateArray(selectedFiles) && (
        <FilledButton onClick={uploadFile}>
          Actualizar Base de datos
        </FilledButton>
      )}
      <br />
      <br />
      <FilledButton onClick={updateFromServer}>
        Actualizar automaticamente
      </FilledButton>
    </div>
  )
}
