/* import { appLogo } from '../../data/constants' */
import { LoadingSpin } from './Loading'
import './LoadingWithLogo.scss'

function LoadingWihLogo() {
  return (
    <div className="loading-container">
      {/* <img src={appLogo} alt="Logo" className="loading-logo" /> */}
      <div className="loading-spinner"></div>
    </div>
  )
}

export default LoadingWihLogo
