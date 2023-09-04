import { useEffect, useContext,useState } from 'react'
import tokenAuth from '../utils/token_auth'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { Navigate } from 'react-router-dom'


const token = localStorage.getItem('token')

if (token) {
  tokenAuth(token)
}

export const PrivateRoute = ({ children }: any) => {
  const { logged, checkToken } = useContext(AuthAdminContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    checkToken()
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="">Cargando</div>
  }
  if (!logged) {
    return <Navigate to="/" />
  }
  return children
}
