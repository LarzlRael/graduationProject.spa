import { useEffect, useContext } from 'react'
import tokenAuth from '../utils/token_auth'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { Navigate, Route, RouteProps } from 'react-router-dom'

const token = localStorage.getItem('token')

if (token) {
  tokenAuth(token)
}

export const PrivateRoute = ({ children }: any) => {
  const { logged, checkToken } = useContext(AuthAdminContext)

  useEffect(() => {
    checkToken()
  }, [])

  if (!logged) {
    return <div className="">Cargado</div>
  }
  if (!logged) {
    return <Navigate to="/" />
  }
  return children
}
