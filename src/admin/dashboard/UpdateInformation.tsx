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
import { postAction } from '../../provider/services/action/ActionAuthorization'
import { validateArray, validateStatus } from '../../utils/validation'
import ToolTip from '../../components/boxex/ToolTip'
import BoxFlex from '../../components/boxex/BoxFlex'
import { H2 } from '../../components/text'

export const UpdateInformation = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const { changeSimpleModal, clearSimpleaModal } = useContext(CommonContext)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFile(Array.from(e.target.files))
    setIsSelected(true)
    e.currentTarget.value = ''
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    let formData = new FormData()
    /* formData.append('csv', selectedFile) */
    selectedFile.forEach((file, index) => {
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
        console.log(res.status)
        if (validateStatus(res.status)) {
          console.log(res.data)
          toast.success(res.data.message)
          clearSimpleaModal()
          clearFile()
        } else {
          toast.error('Error al subir el archivo')
          clearSimpleaModal()
        }
      })
      .catch((err: any) => {
        toast.error(err)
        clearSimpleaModal()
      })

    setLoading(false)
  }

  const clearFile = () => {
    setSelectedFile([])
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
        multiple={false}
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
      <span>
        {validateArray(selectedFile) &&
          selectedFile.map((file, index) => (
            <span key={index}>
              {file?.name && file?.name}
              <br />
            </span>
          ))}
      </span>
      <br />
      {isSelected && (
        <BoxFlex>
          <FilledButton
            onClick={uploadFile}
            icon={<MdFileUpload size="1.5rem" onClick={clearFile} />}
          >
            Actualizar Base de datos
          </FilledButton>
          <ToolTip
            content="Cancelar"
            children={
              <button
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
                onClick={clearFile}
              >
                <IoCloseCircleSharp size="25" color="var(--primary-color)" />
              </button>
            }
          ></ToolTip>
        </BoxFlex>
      )}
    </div>
  )
}
