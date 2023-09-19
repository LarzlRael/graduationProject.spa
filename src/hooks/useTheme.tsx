import { useContext } from 'react'
import { CommonContext } from '../context/commonContext/CommonContext'
// useTheme hook

export const useTheme = () => {
  const { setTheme, darkTheme } = useContext(CommonContext)

  return {
    setTheme,
    darkTheme,
  }
}
