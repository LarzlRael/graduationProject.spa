import { useState, useEffect, useContext, useRef } from 'react'

import { departametsArray, namesDepartamentos } from '../../data/data'
import {
  getCountByDepPro,
  getCountByDepartamaments,
  getCountByDeMun,
} from '../../provider/analysisServices'
import { Graficos } from '../../components/Graficos'
import { RespFoco } from '../../interfaces/countProvinceDepartamento.interface'

import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import { DatePickerRange } from '../../components/DatePickerRange'
import { FilledButton } from '../../components/widgets/buttons/FilledButton'
import Select from 'react-select'
import { Switch } from '../../form/Switch'
import { useNavigate } from 'react-router-dom'

export const GraphByDepartaments = () => {
  const {
    dateSelectedAndRange,
    showProvMun,
    setShowProvinvicaMun,
    queryToFind,
    changeQueryOneFieldToFind,
    changeQueryToFind,
  } = useContext(HeatSourcesContext)

  const { dateStart, dateEnd, findbyOneDate } = dateSelectedAndRange
  const [showSwitch, setShowSwitch] = useState<boolean>(true)
  const navigate = useNavigate()

  const [departamentoProvincia, setDepartamentoProvincia] = useState({
    departamentSelected: departametsArray[0].label,
    todosDepartamentos: false,
  })
  const onchangeAndSetType = (e: any) => {
    changeQueryOneFieldToFind(
      'typeLocation',
      e.target.checked ? 'provincia' : 'municipio',
    )
    setShowProvinvicaMun(e.target.checked)
  }
  const myRef = useRef(null)

  const [countDepProvState, setCountDepProvState] = useState<RespFoco[]>([])
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProvinciasNamesService = async () => {
    const dateStartToQuery = dateStart?.toISOString().slice(0, 10)
    const dateEndToQuery = findbyOneDate
      ? dateEnd?.toISOString().slice(0, 10)
      : dateStart?.toISOString().slice(0, 10)

    setCountDepProvState(
      await getCountByDepPro({
        dateStart: dateStartToQuery!,
        dateEnd: dateEndToQuery!,
        departamento: departamentoProvincia.departamentSelected,
      }),
    )
    setLoading(false)
  }

  const getDepartamentosNamesService = async () => {
    const dateStartToQuery = dateStart?.toISOString().slice(0, 10)
    const dateEndToQuery = findbyOneDate
      ? dateEnd?.toISOString().slice(0, 10)
      : dateStart?.toISOString().slice(0, 10)

    setCountDepProvState(
      await getCountByDepartamaments({
        dateStart: dateStartToQuery!,
        dateEnd: dateEndToQuery!,
        departamento: departamentoProvincia.departamentSelected,
      }),
    )
    setLoading(false)
  }

  const getMunicipiosServices = async () => {
    const dateStartToQuery = dateStart?.toISOString().slice(0, 10)
    const dateEndToQuery = findbyOneDate
      ? dateEnd?.toISOString().slice(0, 10)
      : dateStart?.toISOString().slice(0, 10)

    setCountDepProvState(
      await getCountByDeMun({
        dateStart: dateStartToQuery!,
        dateEnd: dateEndToQuery!,
        departamento: departamentoProvincia.departamentSelected,
      }),
    )
    setLoading(false)
  }

  useEffect(() => {
    if (loading) {
      if (departamentoProvincia.todosDepartamentos) {
        getDepartamentosNamesService()
        setShowSwitch(false)
        return
      }
      if (showProvMun) {
        getProvinciasNamesService()
        setShowSwitch(true)
      } else {
        getMunicipiosServices()
        setShowSwitch(true)
      }
    }
  }, [
    departamentoProvincia.todosDepartamentos,
    getDepartamentosNamesService,
    getMunicipiosServices,
    getProvinciasNamesService,
    loading,
    showProvMun,
  ])

  const consultar = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (departamentoProvincia.todosDepartamentos) {
      setShowSwitch(false)
      return
    }
    setShowSwitch(true)
  }, [departamentoProvincia.departamentSelected])
  const optionsGenerated = namesDepartamentos.map((departament) => ({
    value: departament,
    label: departament,
  }))
  return (
    <div className="graphDepartaments">
      <div className="combo">
        <div>
          <Select
            options={optionsGenerated}
            /* value={nameDepartament} */

            onChange={(e) =>
              setDepartamentoProvincia((previosState) => ({
                ...previosState,
                departamentSelected: e!.value,
                todosDepartamentos: e!.value === 'Bolivia',
              }))
            }
          />

          {showSwitch && (
            <Switch
              checked={showProvMun}
              onChange={onchangeAndSetType}
              label={`Buscando por ${showProvMun ? 'Provincia' : 'Municipio'}`}
            />
          )}
        </div>
        <div>
          <DatePickerRange />

          <FilledButton onClick={consultar}>Consultar</FilledButton>
        </div>
      </div>

      <Graficos
        ref={myRef}
        info={countDepProvState}
        loading={loading}
        nombreDepartamento={departamentoProvincia.departamentSelected}
        selected={(value) => {
          console.log(value)
          console.log(queryToFind)
          changeQueryToFind({
            ...queryToFind,
            departamentSelected: value.departamentSelected,
            nameLocation: value.value,
          })
        }}
        /*  selected={(value) => {
          console.log(value)
          changeQueryToFind({
            ...queryToFind,
            [showProvMun ? 'provincia' : 'municipio']: value,
            departamentSelected: departamentoProvincia.departamentSelected,
          })
          console.log(queryToFind)
          if (showProvMun) {
            consultarMunicipio().then(() => navigate('/mapa'))
          } else {
            consultarProvincias().then(() => navigate('/mapa'))
          }
        }} */
      />
    </div>
  )
}
