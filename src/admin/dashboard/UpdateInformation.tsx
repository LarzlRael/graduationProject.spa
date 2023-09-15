import { useRef, useState } from 'react'

import { ChangeEvent } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdFileUpload } from 'react-icons/md'
import { uploadFileCVS } from '../../provider/reportsServices'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import ToolTip from '../../components/ToolTip'
import { FilledButton } from '../../components/widgets/buttons/FilledButton'

export const UpdateInformation = () => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [isSelected, setIsSelected] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFile(e.target.files[0])
    setIsSelected(true)
    e.currentTarget.value = ''
  }

  const uploadFile = async () => {
    if (!selectedFile) return
    const message = await uploadFileCVS(selectedFile)

    if (message.ok) {
      toast.success(message.msg, {})
    } else {
      toast.error(message.msg)
    }
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

      <ToastContainer />
    </div>
  )
}
