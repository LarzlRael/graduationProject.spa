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
import { useFocosCalor } from '../../hooks/usefocosCalor'

export const GraphByDepartaments = () => {
  const {
    showProvMun,
    setShowProvinvicaMun,
    queryToFind,
    changeQueryOneFieldToFind,
    changeQueryToFind,
  } = useContext(HeatSourcesContext)

  const [showSwitch, setShowSwitch] = useState<boolean>(true)
  const navigate = useNavigate()

  const onchangeAndSetType = (e: any) => {
    changeQueryOneFieldToFind(
      'typeLocation',
      e.target.checked ? 'provincia' : 'municipio',
    )
    setShowProvinvicaMun(e.target.checked)
    consultar()
  }
  const myRef = useRef(null)

  const [countDepProvState, setCountDepProvState] = useState<RespFoco[]>([])
  const [loading, setLoading] = useState(false)
  const { getHeatSources } = useFocosCalor()

  const getDepartamentosNamesService = async () => {
    setCountDepProvState(
      await getCountByDepartamaments({
        ...queryToFind,
      }),
    )
    setLoading(false)
  }

  const getProvinciasOrProv = async () => {
    let resp: RespFoco[] = []
    resp = showProvMun
      ? await getCountByDepPro(queryToFind)
      : await getCountByDeMun(queryToFind)

    setCountDepProvState(resp)
    setLoading(false)
  }

  useEffect(() => {
    if (loading) {
      if (queryToFind.isAllDepartamentos) {
        getDepartamentosNamesService()
        return
      }
      getProvinciasOrProv()
      setShowSwitch(true)
    }
  }, [loading])

  const consultar = () => {
    setLoading(true)
  }
  useEffect(() => {
    consultar()
  }, [])

  useEffect(() => {
    if (queryToFind.isAllDepartamentos) {
      setShowSwitch(false)
      return
    }
    setShowSwitch(true)
  }, [queryToFind.departamento])
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
            value={optionsGenerated.filter(
              (option) => option.value === queryToFind.departamento,
            )}
            onChange={(e) => {
              changeQueryToFind({
                ...queryToFind,
                departamento: e!.value,
                isAllDepartamentos: e!.value === 'Bolivia',
                typeLocation: e!.value === 'Bolivia' ? 'pais' : 'departamento',
              })
              consultar()
            }}
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
          <DatePickerRange onChangeDate={consultar} />

          <FilledButton onClick={consultar}>Consultar</FilledButton>
        </div>
      </div>

      <Graficos
        ref={myRef}
        info={countDepProvState}
        loading={loading}
        nombreDepartamento={queryToFind.departamento}
        selected={(value) => {
          changeQueryToFind({
            ...queryToFind,
            departamento: queryToFind.isAllDepartamentos
              ? value.nameLocation
              : queryToFind.departamento,

            nameLocation: value.nameLocation,
            typeLocation: queryToFind.isAllDepartamentos
              ? 'departamento'
              : showProvMun
              ? 'provincia'
              : 'municipio',
          })
          getHeatSources()
          navigate('/mapa')
        }}
      />
    </div>
  )
}
