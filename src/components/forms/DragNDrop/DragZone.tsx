// import { NormalButton } from "../buttons";
// import { Loading } from "../animation";
import { useDropzone, FileWithPath } from 'react-dropzone'
import React, { useMemo } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import styled,{CSSProp} from 'styled-components'

import './DragZone.scss'

const baseStyle = {
  flex: 1,
  display: 'flex',
  /* flexDirection: FlexDirection.Row, */
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#469585',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

interface DropzoneInputProps {
  uploadFiles: any
  name: string
  label: string
  small?: boolean
  type?: [string]
}
function DropzoneInput({
  uploadFiles,
  name,
  label,
  small,
  type,
}: DropzoneInputProps) {
  const [files, setfiles] = useState<JSX.Element[]>([])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: {
      image: type ? type : ['image/jpeg', 'image/png', 'image/jpg'],
    },
  })
  useEffect(() => {
    function clearAll() {
      setfiles([])
      uploadFiles((a: any) => ({
        ...a,
        [name]: null,
      }))
    }

    setfiles(
      acceptedFiles.map((file: FileWithPath, i) => {
        const f = file.path!.split('.')

        return (
          <div key={i} className="StyledDropzone__file">
            <div className="Dropzone__extension">{f[f.length - 1]}</div>
            <h4 className="Dropzone__filename">{file.path}</h4>
            <img
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
              }}
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
            <FaTimes color="red" onClick={clearAll} />
            {/* <h5>{Math.round(file.size / 1024)}kb</h5> */}
          </div>
        )
      }),
    )

    if (acceptedFiles.length > 0) {
      uploadFiles((a: any) => ({
        ...a,
        [name]: acceptedFiles[0],
      }))
    }
  }, [acceptedFiles, uploadFiles, name])

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )
  return (
    <FlexContainer small={small} className="StyledDropzone">
      <label className="StyledDropzone__label">{label}</label>
      <div className="StyledDropzone__square" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <i className="fas fa-cloud-upload-alt"></i>
        <h4 className="StyledDropzone__h3--gray">
          Arrastra y suelta tus archivos aquí
        </h4>
        <h4 className="StyledDropzone__h3--orange">o presiona para buscar</h4>
        {/* <h4 className="StyledDropzone__h3--orange">
          (Solo se aceptaran imágenes)
        </h4> */}
      </div>
      <div className="StyledDropzone__fields">
        {files.length !== 0 ? (
          <div className="StyledDropzone__container">
            <h3 className="StyledDropzone__Fh3">Listos para enviar</h3>
            {files}
            {/* <div className="StyledDropzone__btn">
              {load ? (
                <NormalButton
                  onClick={() => uploadFiles(acceptedFiles[0], name)}
                >
                  Subir archivo
                </NormalButton>
              ) : (
                <Loading />
              )}
            </div> */}
          </div>
        ) : (
          <h4 className="StyledDropzone__Fh4">No hay imagenes</h4>
        )}
      </div>
    </FlexContainer>
  )
}

const FlexContainer = styled.div<{
  small?: boolean
}>`
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${(props) => (props.small ? 'column' : 'row')};
  gap: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: var(--white);
  padding: 20px;
  border-radius: 10px;
  & .StyledDropzone__fields {
    width: ${(props) => (props.small ? '100%' : '50%')};
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    & .StyledDropzone__fields {
      width: 100%;
    }
  }
`

export default DropzoneInput
