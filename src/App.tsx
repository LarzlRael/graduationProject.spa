import { Navigator } from './navigator/NavigatorAdmin'
import { AuthProvider } from './context/LoginContext/AuthAdminContext'
import { HeatProvider } from './context/HeatSources/HeatSourceContext'
import { CommonProvider } from './context/commonContext/CommonContext'
import { Snackbar } from './components/widgets/snackBar/SnackBar'
import GlobalModal from './components/modal/GlobaModal'
import { SimpleModal } from './components/modal/SImpleModal'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <CommonProvider>
      <AuthProvider>
        <HeatProvider>
          <Navigator />
          <GlobalModal />
          <SimpleModal />
          <Snackbar />
          <ToastContainer />
        </HeatProvider>
      </AuthProvider>
    </CommonProvider>
  )
}

export default App
