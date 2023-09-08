export interface ISnackbar {
  isOpen: boolean
  message: string
  kind: boolean
}
export interface CommonState {
  snackBar: ISnackbar
  darkTheme: boolean
  tab: number
  modalIsOpen: boolean
}

type CommonAction =
  | { type: 'changeTheme'; payload: boolean }
  | { type: 'openSnackBar'; payload: ISnackbar }
  | { type: 'changeTab'; payload: number }
  | { type: 'setModalIsOpen'; payload: boolean }
/* | { type: 'removeError' }
  | { type: 'noAuthenticated' } 
  | { type: 'logout' }
  | { type: 'changeTheme'; payload: boolean }
  | { type: 'loading'; payload: boolean } */

export const commonReducer = (
  state: CommonState,
  action: CommonAction,
): CommonState => {
  switch (action.type) {
    case 'openSnackBar':
      return {
        ...state,
        snackBar: {
          isOpen: action.payload.isOpen,
          message: action.payload.message,
          kind: action.payload.kind,
        },
      }
    case 'changeTheme':
      return {
        ...state,
        darkTheme: action.payload,
      }
    case 'changeTab':
      return {
        ...state,
        tab: action.payload,
      }

    case 'setModalIsOpen':
      return {
        ...state,
        modalIsOpen: action.payload,
      }
    default:
      return state
  }
}
