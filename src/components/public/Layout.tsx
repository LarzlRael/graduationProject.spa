import { useContext } from 'react'
import { CommonContext } from '../../context/commonContext/CommonContext'
import { Header } from './Header'

interface LayoutProps {
  children: any
}
export const Layout = ({ children }: LayoutProps) => {
  const { darkTheme } = useContext(CommonContext)
  return (
    <div className={`layout_page ${darkTheme && 'darkTheme'}`}>
      <Header />
      {children}
    </div>
  )
}
