import { useState, useEffect, useContext } from 'react'
import {
  OptionAndValueInterface,
  departametsArray,
  mapsTypeStyle,
} from '../data/data'
import {
  getDepartamentPoligone,
  getHeatAllSources,
  getHeatSourcesByDepartament,
  getHotSourcesByDepMun,
  getHotSourcesByDepProv,
  getMidPoint,
} from '../provider/heatSourcesservices'
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
    currentLatLongMidLocation,
    mapStyle,
    currentGeoJson,
    setShowOptions,
    setChangeMapType,
    changeCurrentLatLng,
    changeCurrentGeoJson,
    changeQueryOneFieldToFind,
    changeQueryToFind,

    dateSelectedAndRange,
    queryToFind,
    setShowProvinvicaMun,
  } = useContext(HeatSourcesContext)

  const { darkTheme, showSnackBar, closeModal } = useContext(CommonContext)

  /* function usePrevious(value: QueryToFindInterface) {
        const ref = useRef<QueryToFindInterface>();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const previusQueryToFind = usePrevious(queryToFind); */
  useEffect(() => {
    if (darkTheme) {
      setChangeMapType(mapsTypeStyle[3])
    } else {
      setChangeMapType(mapsTypeStyle[2])
    }
  }, [darkTheme])

  const { dateStart, dateEnd } = dateSelectedAndRange

  const [viewport, setViewport] = useState({
    /* width: 'fit',
    height: '100vh', */
    longitude: currentLatLongMidLocation.coordinates.longitude,
    latitude: currentLatLongMidLocation.coordinates.latitude,
    zoom: 5.2,
    poligone: currentLatLongMidLocation.poligono,
    transitionDuration: 5000,
    /* transitionInterpolator: new FlyToInterpolator(), */
  })

  const goTo = () => {
    setViewport({
      ...viewport,
      longitude: currentLatLongMidLocation.coordinates.longitude,
      latitude: currentLatLongMidLocation.coordinates.latitude,
      poligone: currentLatLongMidLocation.poligono,
      zoom: 6,
      transitionDuration: 1000,
      /* transitionInterpolator: new FlyToInterpolator(), */
    })
  }
  const [loading, setLoading] = useState(false)

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
      departamentSelected: e.label,
      image: e.value,
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

  const getAllContry = async () => {
    const queryResult = await getHeatAllSources({
      dateStart: dateStart!.toISOString().slice(0, 10),
      dateEnd: dateEnd!.toISOString().slice(0, 10),
      departamento: queryToFind.departamentSelected,
    })

    changeCurrentGeoJson(queryResult)
    showSnakBarError(queryResult.features.length)
  }

  const consultarPorDepartamentos = async () => {
    const queryResult = await getHeatSourcesByDepartament({
      dateStart: dateStart!.toISOString().slice(0, 10),
      dateEnd: dateEnd!.toISOString().slice(0, 10),
      departamento: queryToFind.departamentSelected,
    })
    const poligonesDepartament = await getDepartamentPoligone(
      queryToFind.departamentSelected,
    )

    changeCurrentGeoJson(queryResult)
    showSnakBarError(queryResult.features.length)

    setSelecteDepartamentCopy({
      ...selecteDepartamentCopy,
      departamentSelected: queryToFind.departamentSelected,
      image: queryToFind.image,
    })
    changeCurrentLatLng({
      ...currentLatLongMidLocation,
      poligono: poligonesDepartament,
    })
  }

  const consultarProvincias = async () => {
    console.log(queryToFind)
    const queryResult = await getHotSourcesByDepProv({
      dateEnd: dateEnd!.toISOString().slice(0, 10),
      dateStart: dateStart!.toISOString().slice(0, 10),
      provincia: queryToFind.provincia,
    })
    changeCurrentGeoJson(queryResult)
    showSnakBarError(queryResult.features.length)
  }

  const consultarMunicipio = async () => {
    console.log(queryToFind)
    const queryResult = await getHotSourcesByDepMun({
      dateEnd: dateEnd!.toISOString().slice(0, 10),
      dateStart: dateStart!.toISOString().slice(0, 10),
      municipio: queryToFind.municipio,
    })
    changeCurrentGeoJson(queryResult)
    showSnakBarError(queryResult.features.length)
  }

  useEffect(() => {
    if (!loading) {
      setLoading(false)
      return
    }

    setLoading(false)

    if (queryToFind.departamentSelected === 'Bolivia') {
      getAllContry()
      return
    }
    if (!showOptions) {
      consultarPorDepartamentos()
      return
    }
    if (showProvMun) {
      /* /? consultar por provincia */
      consultarProvincias()
    } else {
      /* //? consultar por municipio */
      consultarMunicipio()
    }

    setSelecteDepartamentCopy({
      ...selecteDepartamentCopy,
      departamentSelected: queryToFind.departamentSelected,
      image: queryToFind.image,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    const getArray = async () => {
      const arrayProvinciasList = await getNombresProvinciasAndMun(
        queryToFind.departamentSelected,
      )

      setArrMunProv({
        ...stateArrMunProv,
        ...arrayProvinciasList,
      })
    }
    getArray()
  }, [queryToFind.departamentSelected])

  useEffect(() => {
    const getMiddlePoint = async () => {
      let getMidPointService
      if (!showOptions) {
        getMidPointService = await getMidPoint(
          'departamentos',
          queryToFind.departamentSelected,
        )
      }
      if (showProvMun) {
        getMidPointService = await getMidPoint(
          'provincias',
          queryToFind.provincia,
        )
      } else {
        getMidPointService = await getMidPoint(
          'municipios',
          queryToFind.municipio,
        )
      }
      if (!loading && currentGeoJson.features.length > 0) {
        changeCurrentLatLng({
          coordinates: {
            latitude: getMidPointService.coordinates.latitude,
            longitude: getMidPointService.coordinates.longitude,
          },
          poligono: getMidPointService.poligono,
        })
        closeModal()
      }
    }
    getMiddlePoint()
  }, [loading])

  useEffect(() => {
    goTo()
  }, [currentLatLongMidLocation])

  useEffect(() => {
    changeQueryToFind({
      ...queryToFind,
      municipio: stateArrMunProv.municipios[0] ?? '',
      provincia: stateArrMunProv.provincias[0] ?? '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryToFind.departamentSelected])

  return {
    viewport,
    setViewport,
    onChange,
    loading,
    currentGeoJson,
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
    goTo,
    queryToFind,
    changeQueryToFind,
    changeQueryOneFieldToFind,
    setShowProvinvicaMun,
    consultarProvincias,
    consultarMunicipio,
  }
}
