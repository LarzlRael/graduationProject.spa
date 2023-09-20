import { IMapStyleIntOption } from '../data/data'
import { IavailablesDates } from './datesResponse'
import { DatesHeatSources } from './countProvinceDepartamento.interface'
import { IHeatResourcesAndPoint } from './geoJsonResponse'

export interface QueryToFindInterface {
  departamento: string
  image: string
  typeLocation?: 'provincia' | 'municipio' | 'departamento' | 'pais' | null
  nameLocation: string
  dateStart?: Date | null
  dateEnd?: Date | null
  isAllDepartamentos: boolean
  findMultipleDates: boolean
}
export interface SelectOptionDateInterface {
  month: number
  year: number
  onlyYear: boolean
}
export interface IHeatSourcestState {
  datesAvailable: IavailablesDates
  loadingState: boolean
  showProvMun: boolean
  showOptions: boolean
  mapStyle: IMapStyleIntOption
  graphType: string
  mounthAndYearSelected: SelectOptionDateInterface
  countByDates: DatesHeatSources[]
  titleArray: string[]
  currentHeatSources: IHeatResourcesAndPoint
  queryToFind: QueryToFindInterface
}

export enum GraphType {
  VerticalBar = 'Barras Vertical',
  HorizontalBar = 'Barras Horizontal',
  Pie = 'Pie',
  Line = 'Lineas',
  Donut = 'Dona',
}
