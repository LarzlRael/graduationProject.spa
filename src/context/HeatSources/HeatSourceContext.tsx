import { createContext, useEffect, useReducer } from 'react'
import {
  heatSourcesReducer,
  HeatSourcestState,
  DateSelectedRangeInterface,
  QueryToFindInterface,
} from './HeatSourcesReducer'
import {
  getAvailableDatesServer,
  getCountHeatSourcesByMonth,
  getCountHeatSourcesByMonths,
} from '../../provider/analysisServices'
import {
  graphTypeArray,
  mapsTypeStyle,
  meses,
  MapStyleIntOption,
  departametsArray,
  initialCoordinates,
} from '../../data/data'

import moment from 'moment'
import { DatesHeatSources } from '../../interfaces/countProvinceDepartamento.interface'
import { IHeatResourcesAndPoint } from '../../interfaces/geoJsonResponse'
import { SelectOptionDateInterface } from './HeatSourcesReducer'
import { addHours } from '../../utils/utils'
import { IavailablesDates } from '../../interfaces/datesResponse'
moment.locale('es')

type HeatSourcesStateProps = {
  datesAvailable: IavailablesDates
  loadingState: boolean
  showProvMun: boolean
  showOptions: boolean
  mapStyle: MapStyleIntOption
  graphType: string
  mounthAndYearSelected: SelectOptionDateInterface
  titleArray: string[]
  countByDates: DatesHeatSources[]

  currentHeatSources: IHeatResourcesAndPoint
  dateSelectedAndRange: DateSelectedRangeInterface
  queryToFind: QueryToFindInterface
  setShowProvinvicaMun: (newState: boolean) => void
  setShowOptions: (newState: boolean) => void
  setChangeMapType: (mapStyle: MapStyleIntOption) => void
  changeTypeGraph: (value: string) => void
  setMounthSelected: (value: SelectOptionDateInterface) => void
  getHeatSourcesInfoToGragh: (monthNumber: number, year: number) => void
  changeCurrentGeoJson: (geoJsonCurrent: IHeatResourcesAndPoint) => void
  changeDateSelectedAndRanked: (
    dateSelectedAndRange: DateSelectedRangeInterface,
  ) => void
  changeQueryOneFieldToFind: (
    field: keyof QueryToFindInterface,
    value: string,
  ) => void
  changeQueryToFind: (queryToFindInterface: QueryToFindInterface) => void
}

const HeatSourcesInitialState: HeatSourcestState = {
  datesAvailable: {
    min_date: new Date(),
    max_date: new Date(),
  },
  loadingState: false,
  showProvMun: false,
  showOptions: false,
  mapStyle: mapsTypeStyle[2],
  graphType: graphTypeArray[0],
  mounthAndYearSelected: {
    month: 1,
    year: new Date().getFullYear(),
    onlyYear: true,
  },
  countByDates: [],
  titleArray: [],
  currentHeatSources: {
    heatResources: {
      type: 'FeatureCollection',
      features: [],
    },
    middlePoint: {
      coordinates: initialCoordinates,

      poligono: {
        type: 'MultiPolygon',
        coordinates: [],
      },
    },
  },

  dateSelectedAndRange: {
    dateStart: null,
    dateEnd: null,
    dateEndRange: 7,
    findbyOneDate: false,
  },
  queryToFind: {
    departamento: departametsArray[0].label,
    image: departametsArray[0].value,
    nameLocation: '',
    typeLocation: 'pais',
    isAllDepartamentos: true,
  },
}

export const HeatSourcesContext = createContext({} as HeatSourcesStateProps)

export const HeatProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    heatSourcesReducer,
    HeatSourcesInitialState,
  )

  useEffect(() => {
    getDatesAvailable()
    setMounthSelected({
      month: 1,
      year: new Date().getFullYear(),
      onlyYear: true,
    })

    changeQueryToFind({
      ...state.queryToFind,
      dateStart: new Date(),
      dateEnd: new Date(),
    })
  }, [])

  const getDatesAvailable = async () => {
    try {
      dispatch({ type: 'loading', payload: true })
      const dates = await getAvailableDatesServer()
      console.log(dates)
      dispatch({
        type: 'dates',
        payload: {
          min_date: addHours(8, new Date(dates.min_date)),
          max_date: addHours(8, new Date(dates.max_date)),
        },
      })
      dispatch({ type: 'loading', payload: false })
    } catch (error) {
      dispatch({ type: 'loading', payload: false })
    }
  }

  const setShowProvinvicaMun = (state: boolean) => {
    dispatch({
      type: 'showProvMun',
      payload: state,
    })
  }
  const setShowOptions = (state: boolean) => {
    dispatch({
      type: 'showOptions',
      payload: state,
    })
  }

  const setChangeMapType = (mapStyle: MapStyleIntOption) => {
    dispatch({
      type: 'changeMapType',
      payload: mapStyle,
    })
  }

  const changeTypeGraph = (value: string) => {
    dispatch({
      type: 'changeGraphType',
      payload: value,
    })
  }

  const setMounthSelected = (
    selectedMountOrYear: SelectOptionDateInterface,
  ) => {
    dispatch({
      type: 'changeMounthOrYear',
      payload: { ...selectedMountOrYear },
    })
  }
  const getHeatSourcesInfoToGragh = async (month: number, year: number) => {
    let getInformation: DatesHeatSources[]
    const arrayTitles: string[] = []

    dispatch({
      type: 'loading',
      payload: true,
    })
    if (state.mounthAndYearSelected.onlyYear) {
      getInformation = await getCountHeatSourcesByMonths({
        year: year,
      })
      getInformation?.map((_, i) => arrayTitles.push(meses[i + 1]))
    } else {
      getInformation = await getCountHeatSourcesByMonth({
        month: month,
        year: year,
      })
      getInformation?.map((resp) =>
        arrayTitles.push(moment(resp.acq_date).add(8, 'hours').format('L')),
      )
    }

    dispatch({
      type: 'loading',
      payload: false,
    })

    dispatch({
      type: 'changeCountByDates',
      payload: getInformation,
    })

    dispatch({
      type: 'setTitlesArray',
      payload: arrayTitles,
    })
  }

  const changeCurrentGeoJson = (currentGeoJson: IHeatResourcesAndPoint) => {
    dispatch({
      type: 'setCurrentHeatSources',
      payload: currentGeoJson,
    })
  }

  const changeDateSelectedAndRanked = (
    dateSelectedAndRange: DateSelectedRangeInterface,
  ) => {
    dispatch({
      type: 'dateSelectedAndRange',
      payload: dateSelectedAndRange,
    })
  }
  const changeQueryToFind = (queryToFind: QueryToFindInterface) => {
    dispatch({
      type: 'setQueryToFind',
      payload: queryToFind,
    })
  }
  const changeQueryOneFieldToFind = (
    field: keyof QueryToFindInterface,
    value: string,
  ) => {
    dispatch({
      type: 'setOneFieldQueryToFind',
      payload: {
        field,
        value,
      },
    })
  }

  return (
    <HeatSourcesContext.Provider
      value={{
        ...state,
        setShowProvinvicaMun,
        setShowOptions,
        setChangeMapType,

        changeTypeGraph,
        setMounthSelected,
        getHeatSourcesInfoToGragh,
        changeCurrentGeoJson,
        changeDateSelectedAndRanked,
        changeQueryOneFieldToFind,
        changeQueryToFind,
      }}
    >
      {children}
    </HeatSourcesContext.Provider>
  )
}
