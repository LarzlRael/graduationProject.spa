export interface ISnackbar {
  isOpen: boolean
  message: string
  kind: boolean
}
export interface IModal {
  status: boolean
  title: string
  contentModal: React.ReactNode
  butttonText: string
  onClick?: (() => void) | null | undefined
  width?: string | null | undefined
}
export interface ISimpleModal {
  isOpen: boolean
  title: string
  contentModal: React.ReactNode
  isButtonClose?: boolean
  width?: string | undefined
}
export interface CommonState {
  snackBar: ISnackbar
  darkTheme: boolean
  tab: number
  globalModal: IModal
  simpleModal: ISimpleModal
}

type CommonAction =
  | { type: 'changeTheme'; payload: boolean }
  | { type: 'openSnackBar'; payload: ISnackbar }
  | { type: 'changeTab'; payload: number }
  | { type: 'changeModal'; payload: IModal }
  | { type: 'changeSimpleModal'; payload: ISimpleModal }
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
    case 'changeModal':
      return {
        ...state,
        globalModal: action.payload,
      }
    case 'changeSimpleModal':
      return {
        ...state,
        simpleModal: action.payload,
      }

    default:
      return state
  }
}
