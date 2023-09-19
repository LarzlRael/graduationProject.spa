import { createContext, useReducer } from 'react'
import { commonReducer, CommonState, ISnackbar } from './CommonReducer'

type CommonContextProps = {
  snackBar: ISnackbar
  darkTheme: boolean
  tab: number
  modalIsOpen: boolean
  showSnackBar: (parameters: ISnackbar) => void
  setTheme: () => void
  setTabPosition: (tabPosition: number) => void
  closeModal: () => void
  openModal: () => void
}

const CommonInitialState: CommonState = {
  snackBar: {
    isOpen: false,
    message: '',
    kind: true,
  },
  darkTheme: localStorage.getItem('darktheme') === 'true' ? true : false,
  tab: 0,
  modalIsOpen: false,
}

export const CommonContext = createContext({} as CommonContextProps)

export const CommonProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(commonReducer, CommonInitialState)

  const showSnackBar = (parameters: ISnackbar) => {
    dispatch({ type: 'openSnackBar', payload: { ...parameters } })
  }
  const setTabPosition = (tab: number) => {
    dispatch({ type: 'changeTab', payload: tab })
  }

  const setTheme = () => {
    localStorage.setItem('darktheme', JSON.stringify(!state.darkTheme))
    dispatch({
      type: 'changeTheme',
      payload: !state.darkTheme,
    })
  }
  const closeModal = () => {
    dispatch({
      type: 'setModalIsOpen',
      payload: false,
    })
  }
  const openModal = () => {
    dispatch({
      type: 'setModalIsOpen',
      payload: true,
    })
  }

  return (
    <CommonContext.Provider
      value={{
        ...state,
        setTheme,
        showSnackBar,
        setTabPosition,

        closeModal,
        openModal,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}
