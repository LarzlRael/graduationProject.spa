import { createContext, useEffect, useReducer, useContext } from 'react'

/* import { authReducer, AuthState } from '../AuthAdminReducer' */

import {
  LoginData,
  LoginResponse,
  RegisterData,
} from './interfaces/login.admin.interfaces'
import { serverAPI } from '../../provider/serverConfig'
import { singInAdmin } from '../../provider/authServices'
import tokenAuth from '../../utils/token_auth'
import { authReducer, AuthState } from './AuthAdminReducer'
import { CommonContext } from '../commonContext/CommonContext'

type AuthContextProps = {
  errorMessage: string
  token: string | null
  user: null
  status: 'checking' | 'authenticated' | 'not-authenticated'
  logged: boolean
  loading: boolean
  singUp: (obj: any) => void
  startSession: (token: string) => void
  logOut: () => void
  removeError: () => void
  checkToken: () => void
}

const AuthInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  logged: false,
  errorMessage: '',
  loading: false,
}

export const AuthAdminContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      tokenAuth(token)
    }
    // if there is not token
    if (!token) return dispatch({ type: 'noAuthenticated' })

    // There is token:
    try {
      const resp = await serverAPI.get<LoginResponse>('/auth/checktoken')
      /* if (resp.status !== 200) {
                return dispatch({ type: 'noAuthenticated' });
            } */
      dispatch({
        type: 'startSession',
        payload: {
          token: resp.data.accessToken,
          usuario: resp.data.usuario,
        },
      })
      localStorage.setItem('token', resp.data.accessToken)
    } catch (error) {
      return dispatch({ type: 'noAuthenticated' })
    }
  }

  const startSession = async (token: string) => {
    dispatch({
      type: 'startSession',
      payload: {
        token: token,
        usuario: null,
      },
    })
  }

  const singUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const { data } = await serverAPI.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      })

      dispatch({
        type: 'startSession',
        payload: {
          token: data.accessToken,
          usuario: data.usuario,
        },
      })
      localStorage.setItem('token', data.accessToken)
    } catch (error) {
      console.log(error)
      /* dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'El correo ya está registrado',
            }); */
    }
  }

  const logOut = async () => {
    dispatch({ type: 'logout' })
  }

  const removeError = () => {
    dispatch({
      type: 'removeError',
    })
  }

  return (
    <AuthAdminContext.Provider
      value={{
        singUp,
        startSession,
        logOut,
        removeError,
        checkToken,
        ...state,
      }}
    >
      {children}
    </AuthAdminContext.Provider>
  )
}
