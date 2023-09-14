import { useState, useEffect, useContext } from 'react'
import {
  OptionAndValueInterface,
  departametsArray,
  mapsTypeStyle,
} from '../data/data'
import { getHotSourcesByType } from '../provider/heatSourcesservices'
import { getNombresProvinciasAndMun } from '../provider/analysisServices'

import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'

/* import { FlyToInterpolator } from 'react-map-gl' */
import { CommonContext } from '../context/commonContext/CommonContext_'
import { IProvinciasAndMunicipios } from '../interfaces/provMun.interface'

export const useFocosCalor = () => {
  const {
    datesAvailable,
    loadingState,
    showProvMun,
    showOptions,
    mapStyle,
    currentHeatSources,
    setShowOptions,
    setChangeMapType,

    changeCurrentGeoJson,
    changeQueryOneFieldToFind,
    changeQueryToFind,

    dateSelectedAndRange,
    queryToFind,
    setShowProvinvicaMun,
  } = useContext(HeatSourcesContext)

  const { darkTheme, showSnackBar, closeModal } = useContext(CommonContext)

  useEffect(() => {
    if (darkTheme) {
      setChangeMapType(mapsTypeStyle[3])
    } else {
      setChangeMapType(mapsTypeStyle[2])
    }
  }, [darkTheme])

  const [loading, setLoading] = useState(true)
  const [loadingNetworl, setLoadingNetwork] = useState(false)
  const [viewport, setViewport] = useState({
    /* width: 'fit',
    height: '100vh', */
    longitude: currentHeatSources.middlePoint.coordinates.longitude,
    latitude: currentHeatSources.middlePoint.coordinates.latitude,
    zoom: 5.2,
    poligone: currentHeatSources.middlePoint.poligono,
    transitionDuration: 5000,
    /* transitionInterpolator: new FlyToInterpolator(), */
  })

  const [selecteDepartamentCopy, setSelecteDepartamentCopy] = useState({
    departamentSelected: departametsArray[0].label,
    image: departametsArray[0].value,
  })

  const [stateArrMunProv, setArrMunProv] = useState<IProvinciasAndMunicipios>({
    municipios: [],
    provincias: [],
  })

  const onChange = (e: OptionAndValueInterface) => {
    changeQueryToFind({
      ...queryToFind,
      departamento: e.label,
      image: e.value,
      typeLocation: e.label === 'Bolivia' ? 'pais' : 'departamento',
    })
  }

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10,
        ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 750],
        13,
        ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 50],
      ],
      'circle-opacity': 0.8,
      'circle-color': [
        'step',
        ['get', 'brightness'],
        'rgb(0, 0, 255)', // Color para brightness < 50
        300,
        'rgb(0, 255, 0)', // Color para brightness >= 50 y < 100
        400,
        'rgb(255, 0, 0)', // Color para brightness >= 100
      ],
    },
  }

  const getHeatSources = async () => {
    setLoading(true)
  }

  useEffect(() => {
    getHeatSources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showSnakBarError = (isThere: number) => {
    if (isThere === 0) {
      showSnackBar({
        message: 'No se encontraron resultados',
        isOpen: true,
        kind: false,
      })
    }
  }

  const getHeatSourcesByType = async () => {
    setLoadingNetwork(true)
    const queryResult = await getHotSourcesByType({
      /* dateStart: dateStart!.toISOString().slice(0, 10),
      dateEnd: dateEnd!.toISOString().slice(0, 10), */
      ...queryToFind,
    })
    setLoadingNetwork(false)
    console.log(queryResult.middlePoint.coordinates)
    changeCurrentGeoJson(queryResult)
    /* setViewport({
      ...viewport,
      longitude: queryResult.middlePoint.coordinates.latitude,
      latitude: queryResult.middlePoint.coordinates.longitude,
      poligone: queryResult.middlePoint.poligono,
      zoom: 6,
      transitionDuration: 1000,
    }) */
    showSnakBarError(queryResult.heatResources.features.length)
  }

  useEffect(() => {
    if (!loading) {
      setLoading(false)
    }
    setLoading(false)

    getHeatSourcesByType()

    setSelecteDepartamentCopy({
      ...selecteDepartamentCopy,
      departamentSelected: queryToFind.departamento,
      image: queryToFind.image,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    const getProvAndMunNamesArray = async () => {
      const arrayProvinciasList = await getNombresProvinciasAndMun(
        queryToFind.departamento,
      )

      setArrMunProv({
        ...stateArrMunProv,
        ...arrayProvinciasList,
      })
    }
    getProvAndMunNamesArray()
  }, [queryToFind.departamento])

  /* useEffect(() => {
    changeQueryToFind({
      ...queryToFind,
      municipio: stateArrMunProv.municipios[0] ?? '',
      provincia: stateArrMunProv.provincias[0] ?? '',
    })
  }, [queryToFind.departamentSelected]) */

  return {
    viewport,
    setViewport,
    onChange,
    loading,
    currentHeatSources,
    selecteDepartamentCopy,
    layerStyle,
    stateArrMunProv,
    showOptions,
    getHeatSources,
    setShowOptions,
    /* States from provider usestate */
    datesAvailable,
    loadingState,
    showProvMun,
    setChangeMapType,
    mapStyle,
    loadingNetworl,
    queryToFind,
    changeQueryToFind,
    changeQueryOneFieldToFind,
    setShowProvinvicaMun,
  }
}
