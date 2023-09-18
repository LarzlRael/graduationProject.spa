import { DatesHeatSources } from '../../interfaces/countProvinceDepartamento.interface'
import { MapStyleIntOption } from '../../data/data'
import { IHeatResourcesAndPoint } from '../../interfaces/geoJsonResponse'
import { IavailablesDates } from '../../interfaces/datesResponse'

export interface DateSelectedRangeInterface {
  dateStart: Date | null
  dateEnd: Date | null
  dateEndRange: number
  findbyOneDate: boolean
}
export interface QueryToFindInterface {
  departamento: string
  image: string
  typeLocation?: 'provincia' | 'municipio' | 'departamento' | 'pais' | null
  nameLocation: string
  dateStart?: Date | null
  dateEnd?: Date | null
  isAllDepartamentos: boolean
}
export interface SelectOptionDateInterface {
  month: number
  year: number
  onlyYear: boolean
}
export interface HeatSourcestState {
  datesAvailable: IavailablesDates
  loadingState: boolean
  showProvMun: boolean
  showOptions: boolean
  mapStyle: MapStyleIntOption
  graphType: string
  mounthAndYearSelected: SelectOptionDateInterface
  countByDates: DatesHeatSources[]
  titleArray: string[]
  currentHeatSources: IHeatResourcesAndPoint

  dateSelectedAndRange: DateSelectedRangeInterface
  queryToFind: QueryToFindInterface
}

type HeatSourceAction =
  | { type: 'dates'; payload: IavailablesDates }
  | { type: 'loading'; payload: boolean }
  | { type: 'showProvMun'; payload: boolean }
  | { type: 'showOptions'; payload: boolean }
  | { type: 'changeMapType'; payload: MapStyleIntOption }
  | { type: 'changeGraphType'; payload: string }
  | { type: 'changeMounthOrYear'; payload: SelectOptionDateInterface }
  | { type: 'changeCountByDates'; payload: DatesHeatSources[] }
  | { type: 'setTitlesArray'; payload: string[] }
  | { type: 'setCurrentHeatSources'; payload: IHeatResourcesAndPoint }
  | { type: 'dateSelectedAndRange'; payload: DateSelectedRangeInterface }
  | { type: 'setQueryToFind'; payload: QueryToFindInterface }
  | {
      type: 'setOneFieldQueryToFind'
      payload: { field: keyof QueryToFindInterface; value: string }
    }

/* | { type: 'addError', payload: string }
| { type: 'noAuthenticated' }
| { type: 'logout' } 
 */
export const heatSourcesReducer = (
  state: HeatSourcestState,
  action: HeatSourceAction,
): HeatSourcestState => {
  switch (action.type) {
    case 'dates':
      return {
        ...state,
        datesAvailable: action.payload,
      }
    case 'loading':
      return {
        ...state,
        loadingState: action.payload,
      }
    case 'showProvMun':
      return {
        ...state,
        showProvMun: action.payload,
      }
    case 'showOptions':
      return {
        ...state,
        showOptions: action.payload,
      }
    case 'changeMapType':
      return {
        ...state,
        mapStyle: action.payload,
      }
    case 'changeGraphType':
      return {
        ...state,
        graphType: action.payload,
      }
    case 'changeMounthOrYear':
      return {
        ...state,
        mounthAndYearSelected: {
          ...state.mounthAndYearSelected,
          month: action.payload.month,
          year: action.payload.year,
          onlyYear: action.payload.onlyYear,
        },
      }
    case 'changeCountByDates':
      return {
        ...state,
        countByDates: action.payload,
      }
    case 'setTitlesArray':
      return {
        ...state,
        titleArray: action.payload,
      }

    case 'setCurrentHeatSources':
      return {
        ...state,
        currentHeatSources: action.payload,
      }

    case 'dateSelectedAndRange':
      return {
        ...state,
        dateSelectedAndRange: action.payload,
      }
    case 'setOneFieldQueryToFind':
      return {
        ...state,
        queryToFind: {
          ...state.queryToFind,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'setQueryToFind':
      return {
        ...state,
        queryToFind: action.payload,
      }

    default:
      return state
  }
}
