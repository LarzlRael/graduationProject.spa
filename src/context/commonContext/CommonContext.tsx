import { createContext, useReducer } from 'react'
import {
  commonReducer,
  CommonState,
  IModal,
  ISimpleModal,
  ISnackbar,
} from './CommonReducer'

type CommonContextProps = {
  snackBar: ISnackbar
  darkTheme: boolean
  tab: number
  globalModal: IModal
  simpleModal: ISimpleModal
  showSnackBar: (parameters: ISnackbar) => void
  setTheme: () => void
  setTabPosition: (tabPosition: number) => void
  changeModal: (parameters: IModal) => void
  changeSimpleModal: (parameters: ISimpleModal) => void
  clearSimpleaModal: () => void
}

const CommonInitialState: CommonState = {
  snackBar: {
    isOpen: false,
    message: '',
    kind: true,
  },
  globalModal: {
    status: false,
    title: '',
    contentModal: null,
    butttonText: '',
    onClick: null,
    width: null,
  },
  simpleModal: {
    isOpen: false,
    title: '',
    contentModal: null,
    isButtonClose: true,
  },
  darkTheme: localStorage.getItem('darktheme') === 'true' ? true : false,
  tab: 0,
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

  const changeSimpleModal = (parameters: ISimpleModal) => {
    dispatch({
      type: 'changeSimpleModal',
      payload: parameters,
    })
  }
  const setTheme = () => {
    localStorage.setItem('darktheme', JSON.stringify(!state.darkTheme))
    dispatch({
      type: 'changeTheme',
      payload: !state.darkTheme,
    })
  }
  /* const closeModal = () => {
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
  } */

  const changeModal = (parameters: IModal) => {
    dispatch({
      type: 'changeModal',
      payload: parameters,
    })
  }
  const clearSimpleaModal = () => {
    dispatch({
      type: 'clearSimpleModal',
    })
  }

  return (
    <CommonContext.Provider
      value={{
        ...state,
        setTheme,
        showSnackBar,
        setTabPosition,
        changeModal,
        clearSimpleaModal,
        changeSimpleModal,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}
