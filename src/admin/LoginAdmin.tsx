import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './LoginAdmin.css'
/* import ErrorLabel from '../error-label';
import LoginContext from '../login/LoginContext'; */
/* import { getDates } from '../provider/services';
import { DatesResponse } from '../interfaces/datesResponse';
import { v4 as uuidv4 } from 'uuid'; */
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import { LoadingElipsis } from '../components/widgets/loadings/LoadingElipsis'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { ButtonIcon } from '../components/widgets/buttons/ButtonIcons'
import { FilledButton } from '../components/widgets/buttons/FilledButton'
import { postAction } from '../provider/services/action/action'
import { validateStatus } from '../utils/validation'
import { CommonContext } from '../context/commonContext/CommonContext'
import { Form, Formik } from 'formik'
import { Input } from '../components/forms'
import * as Yup from 'yup'
export const AdminLogin = () => {
  const { showSnackBar } = useContext(CommonContext)
  const { startSession, logged, loading } = useContext(AuthAdminContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (logged) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [logged])

  const handleSumbit = ({ username, password }: initialValuesI) => {
    /* singIn({ username: userAdmin.email, password: userAdmin.password }) */
    postAction('auth/signin', {
      username,
      password,
    }).then((res: any) => {
      if (validateStatus(res.status)) {
        window.localStorage.setItem('token', res.data.accessToken)
        startSession(res.data.accessToken)
        showSnackBar({
          message: 'Inicio de sesión exitoso',
          isOpen: true,
          kind: true,
        })
      } else {
        showSnackBar({
          message: 'Usuario o contraseña incorrectos',
          isOpen: true,
          kind: false,
        })
      }
    })
  }

  useDocumentTitle('Iniciar sesión')

  interface initialValuesI {
    username: string
    password: string
  }
  const initialValues = {
    username: 'admin@admin.com',
    password: 'Fantasticbaby11xdA',
  }
  const LoginSchema = Yup.object({
    username: Yup.string()
      .email('Email no valido')
      .required('El email es requerido'),
    password: Yup.string()

      //Minimum Character Validation
      .min(3, 'La contraseña debe tener al menos 3 caracteres')
      .required('La contraseña es requerida'),
  })

  return (
    <div className="LoginAdmin">
      <ButtonIcon className="LoginAdmin__button-icon" />
      <div className="LoginAdmin__form--container animate__animated animate__fadeIn">
        <div className="form animate__animated animate__fadeInUp">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSumbit}
            validationSchema={LoginSchema}
          >
            <Form className="Form__login">
              <h3 className="Form__input-title">Iniciar sesion</h3>
              <Input
                label="Usuario"
                className="Form__input"
                placeholder="Ingrese su usuario o email"
                name="username"
                type="text"
                disabled={loading}
                /* showClearIcon={true} */
              />

              <Input
                label="Contraseña"
                className="Form__input"
                placeholder="Ingrese su contraseña"
                name="password"
                type="password"
                disabled={loading}
              />
              {loading ? (
                <LoadingElipsis />
              ) : (
                <FilledButton
                  /* background="var(--secondary-color)" */
                  type="submit"
                  className="button-login pointer"
                  $margin="1rem 0"
                  borderRadius="20px"
                >
                  Iniciar Sesion
                </FilledButton>
              )}
            </Form>
          </Formik>
        </div>
        <div className="info-login animate__animated animate__fadeInDown">
          <h1>Focos de calor en Bolivia</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui ipsam
            numquam dolore quo, aperiam voluptates labore, error totam rem hic,
            minus incidunt autem nesciunt ea laborum temporibus enim tempora.
          </span>
        </div>
      </div>
    </div>
  )
}
