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
import { CommonContext } from '../context/commonContext/CommonContext_'
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

  const [userAdmin, setUserAdmin] = useState({
    email: 'admin@admin.com',
    password: 'Fantasticbaby11xdA',
  })
  //? Error state
  const [Error, setError] = useState({
    error_message: null,
  })
  const { error_message } = Error

  const handleSumbit = (e: any) => {
    e.preventDefault()
    /* singIn({ username: userAdmin.email, password: userAdmin.password }) */
    postAction('auth/signin', {
      username: userAdmin.email,
      password: userAdmin.password,
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

  const { email, password } = userAdmin

  const onChange = (e: any) => {
    setUserAdmin({
      ...userAdmin,
      [e.target.name]: e.target.value,
    })
    setError({
      ...Error,
      error_message: null,
    })
  }

  useDocumentTitle('Login')

  return (
    <div className="LoginAdmin">
      <ButtonIcon className="LoginAdmin__button-icon" />
      <div className="login-div animate__animated animate__fadeIn">
        <div className="form animate__animated animate__fadeInUp">
          <form className="formLogin" onSubmit={handleSumbit}>
            <h3 className="title">Login</h3>
            <input
              className={error_message ? 'input-login error' : 'input-login'}
              placeholder="Usuario"
              onChange={onChange}
              name="email"
              value={email}
              type="text"
            />
            <br />
            <input
              className={error_message ? 'input-login error' : 'input-login'}
              placeholder="Contraseña"
              onChange={onChange}
              value={password}
              name="password"
              type="password"
            />

            {!loading ? (
              <FilledButton
                type="submit"
                className="button-login pointer"
                fontSize="1rem"
              >
                Iniciar Sesion
              </FilledButton>
            ) : (
              <LoadingElipsis />
            )}

            {/* {error_message &&
                        <ErrorLabel message={error_message} />} */}
          </form>
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
