import React, { useContext, useState, useEffect } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { accountsLink } from './dataMenu'
import { UpdateInformation } from './dashboard/UpdateInformation'
import { CVSTutorial } from './dashboard/CVSTutorial'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useWindowDimensions } from '../hooks/useWindowsDimentions'

export const AdminDashboard = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { logOut } = useContext(AuthAdminContext)
  const { windowDimensions } = useWindowDimensions()

  const handleToogleMenu = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    if (windowDimensions.width < 768) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }, [windowDimensions.width])

  useDocumentTitle('dashboard')

  const goToLink = () => {
    if (windowDimensions.width < 768) {
      handleToogleMenu()
    }
  }

  return (
    <div>
      <div className="toolbar">
        <i
          onClick={handleToogleMenu}
          className={`${
            openMenu ? 'fa fa-bars' : 'fas fa-arrow-left'
          } menu-bar`}
          aria-hidden="true"
        ></i>
        <h4>Panel de administracion</h4>
      </div>
      <div className="dashboard">
        <div className={`dash ${openMenu ? 'open-menu' : 'close-menu'}`}>
          <div className="profile-image">
            <img
              className="profile-image-img"
              src="https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg"
              alt=""
            />
            <span className="profile-image-name">Nombre de Usuario</span>
          </div>
          <div className="dash-group">
            {accountsLink.map((item, i) => (
              <div key={i}>
                <span className="title-dash">{item.title_group}</span>
                {item.items.map((link) => (
                  <NavLink
                    key={uuidv4()}
                    className="dash-item"
                    to={link.to}
                    onClick={goToLink}
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
          <span className="title-dash">Empleados</span>
          <div className="dash-group">
            <ul className="dash-item">Ver empleados</ul>
            <ul className="dash-item">Cuentas asociadas</ul>
            <ul className="dash-item" onClick={logOut}>
              Salir
            </ul>
          </div>
        </div>
        <div className="dash-content">
          <div className="dashContentContainer">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard/actualizar" />} />
              <Route path="/actualizar" element={<UpdateInformation />} />
              <Route path="/tutorial" element={<CVSTutorial />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
