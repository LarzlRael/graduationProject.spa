import React from 'react'
import { Formik, Form } from 'formik'
import { Input, Select, TextArea } from './'
/* import formJson from './formJson.json' */
import { Switch } from './Switch'
import * as Yup from 'yup'

import { H2 } from '../text'
/* import DropzoneInput from '../input/DropZone' */
/* import { SelectAdd } from './SelectAdd' */

import { GlobalFormInterface, InputJsonI } from './interfaces/formInterfaces'
import { LoadingElipsis } from '../widgets/loadings/LoadingElipsis'
import DropzoneInput from './DragNDrop/DragZone'
/* const initialValues: { [x: string]: any } = {} */

export const GlobalForm = ({
  inputJson,
  onSubmit,
  data,
  formTitle,
  loading,
  titleButton,
}: GlobalFormInterface) => {
  function initialValueGeneration(
    inputJson: any[],
  ): {
    initialValues: {
      [x: string]: any
    }
    validate: {}
  } {
    let initialValues: { [x: string]: any } = {}
    let validate = {}
    inputJson.forEach((i: InputJsonI) => {
      initialValues = {
        ...initialValues,
        [i.name]: data && data[i.name] ? data[i.name] : i.initialValue,
      }
      validate = {
        ...validate,
        [i.name]: i.validate,
      }
    })
    return { initialValues, validate }
  }

  const { initialValues, validate } = initialValueGeneration(inputJson)
  const validationSchema = Yup.object(validate)
  return (
    <div>
      <H2 margin="1rem 0" color="var(--color-text)" fontWeight="600">
        {formTitle}
      </H2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            {inputJson.map((item, index) => {
              switch (item.type) {
                case 'text':
                case 'password':
                case 'email':
                case 'number':
                case 'tel':
                case 'url':
                  return (
                    <Input
                      label={item.label!}
                      name={item.name!}
                      type={item.type}
                      key={item.name}
                    />
                  )
                case 'select':
                  return (
                    <Select
                      label={item.label!}
                      name={item.name!}
                      options={item.options!}
                      key={item.name}
                    />
                  )
                case 'checkbox':
                  return (
                    <Switch
                      label={item.label!}
                      name={item.name!}
                      key={item.name}
                    />
                  )
                case 'area':
                  return (
                    <TextArea
                      label={item.label!}
                      name={item.name}
                      key={item.name}
                    />
                  )
                case 'file':
                  return (
                    <DropzoneInput
                      label={item.label!}
                      name={item.name}
                      key={item.name}
                      uploadFiles={formik.setValues}
                    />
                  )
                /* case 'selectRRSS':
                  return (
                    <SelectAdd
                      name={item.name}
                      label={item.label!}
                      key={item.name}
                    />
                  ) */
              }
            })}
            {!loading ? (
              <button type="submit" className="button-login pointer">
                {titleButton ?? 'Guardar'}
              </button>
            ) : (
              <LoadingElipsis />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}
