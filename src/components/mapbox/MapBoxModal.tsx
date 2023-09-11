import {
  mapsTypeStyle,
  departametsArray,
  MapStyleIntOption,
} from '../../data/data'
import { CardInfo } from '../CardInfo'
import { DatePickerRange } from '../DatePickerRange'
import { ModalComponent } from '../ModalComponent'

import { LoadingElipsis } from '../widgets/loadings/LoadingElipsis'
import { QueryToFindInterface } from '../../context/HeatSources/HeatSourcesReducer'

import Select2 from 'react-select'
import { FilledButton } from '../widgets/buttons/FilledButton'
import Checkbox from '../../form/Checkbox'
import { IProvinciasAndMunicipios } from '../../interfaces/provMun.interface'
import { CommonContext } from '../../context/commonContext/CommonContext_'
import { useContext } from 'react'
import { Switch } from '../../form/Switch'
interface Props {
  imageUrl: string
  mapTypeStyle: MapStyleIntOption[]
  mapStyle: MapStyleIntOption
  setChangeMapType: (mapStyle: MapStyleIntOption) => void
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
export const MapBoxModal = ({
  imageUrl,
  mapTypeStyle,
  mapStyle,
  setChangeMapType,
  queryToFind,
  changeQueryOneFieldToFind,
  showOptions,
  setShowOptions,
  onChange,
  showProvMun,
  stateArrMunProv,
  loading,
  getHeatSources,
  showProvinvicaMun,
}: Props) => {
  const { darkTheme } = useContext(CommonContext)
  return (
    <ModalComponent>
      <div className={`modal-content ${darkTheme && 'blackTheme'}`}>
        <div className="modal-info">
          <CardInfo imageUrl={imageUrl} />
          <br />

          <label id="demo-simple-select-label">Seleccionar Tipo de Mapa</label>
          <Select2
            onChange={(e) => setChangeMapType(e!)}
            /* value={mapStyle.label} */
            /* onChange={(e) => setChangeMapType(e.target.value)} */
            options={mapTypeStyle}
          />
        </div>

        <div>
          <label>Seleccionar departamento</label>
          <Select2
            onChange={(e) => {
              onChange(e)
            }}
            options={departametsArray}
          />

          <DatePickerRange />

          <Checkbox
            label="Provincias/municipios"
            isChecked={showOptions}
            onChange={({ target }) => setShowOptions(target.checked)}
          />

          {showOptions && (
            <>
              <Switch
                checked={showProvMun}
                onChange={(e) => showProvinvicaMun(e.target.checked)}
                label={`Buscando por ${
                  showProvMun ? 'Provincia' : 'Municipio'
                }`}
              />
              {showProvMun ? (
                <>
                  <label>Seleccionar Provincia</label>
                  <Select2
                    onChange={(e) => {
                      changeQueryOneFieldToFind('provincia', e!.value)
                    }}
                    /* options={stateArrMunProv.sArrayPro} */
                    options={stateArrMunProv.provincias.map((provincia) => ({
                      value: provincia,
                      label: provincia,
                    }))}
                  />
                </>
              ) : (
                <>
                  <label>Seleccionar Municipio</label>
                  <Select2
                    onChange={(e) =>
                      changeQueryOneFieldToFind('municipio', e!.value)
                    }
                    options={stateArrMunProv.municipios.map((municipio) => ({
                      value: municipio,
                      label: municipio,
                    }))}
                  />
                </>
              )}
            </>
          )}
          <br />
          <br />
          {!loading ? (
            <center>
              <br />
              <FilledButton onClick={getHeatSources} disabled={loading}>
                Consultar
              </FilledButton>
            </center>
          ) : (
            <LoadingElipsis />
          )}
        </div>
      </div>
    </ModalComponent>
  )
}
