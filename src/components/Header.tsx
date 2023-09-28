import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'
import { useWindowDimensions } from '../hooks/useWindowsDimentions'
import { IoPersonCircle } from 'react-icons/io5'

export const Header = () => {
  const { windowDimensions } = useWindowDimensions()

  const [isOpenMenu, setShowMenu] = useState(true)

  const closeMenu = () => {
    if (windowDimensions.width <= 768) {
      hideMenu()
    }
  }

  const showMenu = () => {
    setShowMenu(true)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  useEffect(() => {
    if (windowDimensions.width < 768) {
      hideMenu()
    } else {
      showMenu()
    }
  }, [windowDimensions.width])

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/inicio">Logo</NavLink>
        <div className="menu-icon">
          <IoMenu
            color="#fff"
            onClick={isOpenMenu ? hideMenu : showMenu}
            fontSize={40}
          />
        </div>
      </div>
      <div className={`enlaces ${isOpenMenu ? 'openMenu' : 'closeMenu'}`}>
        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/inicio"
        >
          Inicio
        </NavLink>

        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/mapa"
        >
          Mapa
        </NavLink>
        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/reportes"
        >
          Reportes y descargas
        </NavLink>

        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/departamentos"
        >
          Departamentos
        </NavLink>
        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/ley1171"
        >
          Ley 1171
        </NavLink>
        <NavLink
          /* activeClassName="active" */
          onClick={() => closeMenu()}
          className="link"
          to="/login"
        >
          <IoPersonCircle fontSize={30} />
        </NavLink>
      </div>
    </header>
  )
}
