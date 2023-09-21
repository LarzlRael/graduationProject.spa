import { departametsArray, IMapStyleIntOption } from '../../data/data'
import { CardInfo } from '../CardInfo'
import { DatePickerRange } from '../DatePickerRange'

import { LoadingElipsis } from '../widgets/loadings/LoadingElipsis'

import Select from 'react-select'
import { FilledButton } from '../widgets/buttons/FilledButton'
import Checkbox from '../../form/Checkbox'
import { IProvinciasAndMunicipios } from '../../interfaces/provMun.interface'
import { CommonContext } from '../../context/commonContext/CommonContext'
import { useContext, useState } from 'react'
import { Switch } from '../../form/Switch'
import { QueryToFindInterface } from '../../interfaces/heatResources.interfaces'
import { ModalComponent } from '../modal/ModalComponent'
import { useFocosCalor } from '../../hooks/usefocosCalor'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import { mapsTypeStyle } from '../../data/data'
interface Props {
  imageUrl: string
  mapTypeStyle: IMapStyleIntOption[]
  mapStyle: IMapStyleIntOption
  setChangeMapType: (mapStyle: IMapStyleIntOption) => void
  queryToFind: QueryToFindInterface
  changeQueryOneFieldToFind: (
    field: keyof QueryToFindInterface,
    value: string,
  ) => void
  showOptions: boolean
  showProvMun: boolean
  setShowOptions: (newState: boolean) => void
  onChange: (e: any) => void
  stateArrMunProv: IProvinciasAndMunicipios
  loading: boolean
  getHeatSources: () => void
  showProvinvicaMun: (newState: boolean) => void
}
export const MapBoxModal = () => {
  const {
    /* imageUrl, */
    setChangeMapType,
    onChange,
    stateArrayMunProv,
    loading,
    getHeatSources,
  } = useFocosCalor()

  const { darkTheme } = useContext(CommonContext)
  const {
    mapStyle,
    showOptions,
    queryToFind,
    showProvMun,
    setShowProvinvicaMun,
    changeQueryOneFieldToFind,
    changeQueryToFind,
    setShowOptions,
  } = useContext(HeatSourcesContext)

  const handleProvOrMunChange = (e: any) => {
    setShowProvinvicaMun(e.target.checked)

    changeQueryToFind({
      ...queryToFind,
      typeLocation: e.target.checked ? 'provincia' : 'municipio',
      nameLocation: e.target.checked
        ? stateArrayMunProv.provincias[0]
        : stateArrayMunProv.municipios[0],
    })
  }
  const handleChangeFindByProvAndMun = (e: any) => {
    setShowOptions(e.target.checked)
    changeQueryOneFieldToFind(
      'typeLocation',
      e.target.checked ? 'municipio' : 'departamento',
    )
  }

  const generateOptionSelect = (arrayString: string[]) => {
    return arrayString.map((item) => ({
      value: item,
      label: item,
    }))
  }
  return (
    <div className={`modal-content ${darkTheme && 'blackTheme'}`}>
      <div className="modal-info">
        <CardInfo imageUrl={queryToFind.image} />
        <br />
      </div>

      <div>
        <label>Seleccionar departamento</label>
        <Select
          value={departametsArray.filter(
            (option) => option.label === queryToFind.departamento,
          )}
          onChange={(e) => {
            changeQueryToFind({
              ...queryToFind,
              departamento: e!.label,
              image: e!.value,
              typeLocation: e!.label === 'Bolivia' ? 'pais' : 'departamento',
            })
          }}
          options={departametsArray}
        />

        <DatePickerRange />
        {queryToFind.typeLocation !== 'pais' && (
          <>
            <Checkbox
              label="Provincias/municipios"
              isChecked={showOptions}
              onChange={handleChangeFindByProvAndMun}
            />

            {showOptions && (
              <>
                <Switch
                  checked={showProvMun}
                  onChange={handleProvOrMunChange}
                  label={`Buscando por ${
                    showProvMun ? 'Provincia' : 'Municipio'
                  }`}
                />
                <>
                  <label>Seleccionar Provincia</label>
                  <Select
                    onChange={(e) => {
                      changeQueryOneFieldToFind('nameLocation', e!.value)
                    }}
                    value={generateOptionSelect(
                      showProvMun
                        ? stateArrayMunProv.provincias
                        : stateArrayMunProv.municipios,
                    ).filter(
                      (option) => option.value === queryToFind.nameLocation,
                    )}
                    options={
                      showProvMun
                        ? generateOptionSelect(stateArrayMunProv.provincias)
                        : generateOptionSelect(stateArrayMunProv.municipios)
                    }
                  />
                </>
              </>
            )}
          </>
        )}
        {loading ? (
          <LoadingElipsis />
        ) : (
          <center>
            <br />
            <FilledButton onClick={getHeatSources} disabled={loading}>
              Consultar
            </FilledButton>
          </center>
        )}
      </div>
    </div>
  )
}

import React from 'react'

export const MapBoxModal2 = () => {
  return (
    <ModalComponent>
      <MapBoxModal />
    </ModalComponent>
  )
}
