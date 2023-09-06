import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminLogin } from '../admin/LoginAdmin'
import { AdminDashboard } from '../admin/DashBoard'
import { LandingPage } from '../pages/LandingPage'
import { ReportsLists } from '../pages/ReportsLists'
import { Ley1171 } from '../pages/Ley1171'
import { Departaments } from '../pages/Departaments'
import { PrivateRoute } from './AdminRoutes'

import { CommonContext } from '../context/commonContext/CommonContext_'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { LoadingSpin } from '../components/widgets/loadings/Loading'

export const LoadingScreen = () => {
  return <div>cargando</div>
}

export const Navigator = () => {
  const { darkTheme } = useContext(CommonContext)
  const { status } = useContext(AuthAdminContext)

  if (status === 'checking') {
    return <LoadingScreen />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (darkTheme) {
      document.body.className = 'blackTheme'
      return
    }
    document.body.className = ''
  }, [darkTheme])

  return (
    <div className="theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/inicio" element={<LandingPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/reportes" element={<ReportsLists />} />
          <Route path="/ley1171" element={<Ley1171 />} />
          <Route path="/departamentos" element={<Departaments />} />
          {/* <Route path="/report" component={MyDocument} /> */}
          {/* <Route path="/dashboard" component={AdminDashboard} /> */}

          {/* <PrivateRoute path="/dashboard" component={AdminDashboard} /> */}

          {/* <Redirect from="/*" to="/inicio" /> */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}