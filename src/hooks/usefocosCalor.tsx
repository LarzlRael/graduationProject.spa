import { useState, useEffect, useContext, useRef } from 'react'
import { OptionAndValueInterface, departametsArray, mapsTypeStyle } from '../data/data'
import {
  getHeatSourcesByDepartament,
  getHotSourcesByDepMun,
  getHotSourcesByDepProv,
  getMidPoint,
} from '../provider/heatSourcesservices'
import {
  getNombresProvincias,
  getNombresMunicipios,
} from '../provider/analysisServices'
import { RespProvincia } from '../interfaces/provinciasResponse.interface'
import { MunResp } from '../interfaces/municipiosResponse.interface'

import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'

/* import { FlyToInterpolator } from 'react-map-gl' */
import { CommonContext } from '../context/commonContext/CommonContext_'
import { openSnackbar } from '../context/commonContext/actions'

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
    closeModal,
    dateSelectedAndRange,
    queryToFind,
  } = useContext(HeatSourcesContext)

  const { darkTheme, showSnackBar } = useContext(CommonContext)

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
    longitude: currentLatLongMidLocation.longitude,
    latitude: currentLatLongMidLocation.latitude,
    zoom: 5.2,
    transitionDuration: 5000,
    /* transitionInterpolator: new FlyToInterpolator(), */
  })

  const goTo = () => {
    setViewport({
      ...viewport,
      longitude: currentLatLongMidLocation.longitude,
      latitude: currentLatLongMidLocation.latitude,
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

  const [stateArrMunProv, setArrMunProv] = useState<{
    sArrayPro: RespProvincia[]
    sArrayMu: MunResp[]
  }>({
    sArrayPro: [],
    sArrayMu: [],
  })

  const onChange = (e: OptionAndValueInterface) => {
    console.log(e)
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

  const ShowSnakBarError = (isThere: number) => {
    if (isThere === 0) {
      showSnackBar({
        message: 'No se encontraron resultados',
        isOpen: true,
        kind: false,
      })
    }
  }
  useEffect(() => {
    const consultarPorDepartamentos = async () => {
      const queryResult = await getHeatSourcesByDepartament({
        dateStart: dateStart!.toISOString().slice(0, 10),
        dateEnd: dateEnd!.toISOString().slice(0, 10),
        departamento: queryToFind.departamentSelected,
      })

      changeCurrentGeoJson(queryResult)
      ShowSnakBarError(queryResult.features.length)

      setLoading(false)
      setSelecteDepartamentCopy({
        ...selecteDepartamentCopy,
        departamentSelected: queryToFind.departamentSelected,
        image: queryToFind.image,
      })
    }

    const consultarProvincias = async () => {
      changeCurrentGeoJson(
        await getHotSourcesByDepProv({
          dateEnd: dateEnd!.toISOString().slice(0, 10),
          dateStart: dateStart!.toISOString().slice(0, 10),
          provincia: queryToFind.provincia,
        }),
      )

      setLoading(false)
    }

    const consultarMunicipio = async () => {
      const queryResult = await getHotSourcesByDepMun({
        dateEnd: dateEnd!.toISOString().slice(0, 10),
        dateStart: dateStart!.toISOString().slice(0, 10),
        municipio: queryToFind.municipio,
      })
      ShowSnakBarError(queryResult.features.length)
      changeCurrentGeoJson(queryResult)
      setLoading(false)
    }

    if (!loading) {
      setLoading(false)
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
      const arrayProvinciasList = await getNombresProvincias(
        queryToFind.departamentSelected,
      )
      const arrayMunicipiosList = await getNombresMunicipios(
        queryToFind.departamentSelected,
      )
      setArrMunProv({
        ...stateArrMunProv,
        sArrayMu: arrayMunicipiosList,
        sArrayPro: arrayProvinciasList,
      })
    }
    getArray()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryToFind.departamentSelected])

  useEffect(() => {
    const getMiddlePoint = async () => {
      let getMidPointService
      if (!showOptions) {
        getMidPointService = await getMidPoint(
          'departamentos',
          queryToFind.departamentSelected,
        )
        return
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
          latitude: getMidPointService.longitude,
          longitude: getMidPointService.latitude,
        })
        closeModal()
      }
    }
    getMiddlePoint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    goTo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLatLongMidLocation])

  useEffect(() => {
    changeQueryToFind({
      ...queryToFind,
      municipio: stateArrMunProv.sArrayMu[0]
        ? stateArrMunProv.sArrayMu[0].nombre_municipio
        : '',
      provincia: stateArrMunProv.sArrayPro[0]
        ? stateArrMunProv.sArrayPro[0].nombre_provincia
        : '',
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
    darkTheme,
  }
}
