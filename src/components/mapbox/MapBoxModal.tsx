import {
  mapsTypeStyle,
  departametsArray,
  MapStyleIntOption,
} from '../../data/data'
import { CardInfo } from '../CardInfo'
import { DatePickerRange } from '../DatePickerRange'
import { ModalComponent } from '../ModalComponent'
import { SwitchWidget } from '../widgets/SwitchWidget'
import { LoadingElipsis } from '../widgets/loadings/LoadingElipsis'
import { QueryToFindInterface } from '../../context/HeatSources/HeatSourcesReducer'
import { RespProvincia } from '../../interfaces/provinciasResponse.interface'
import { MunResp } from '../../interfaces/municipiosResponse.interface'
import Select2 from 'react-select'
import { FilledButton } from '../widgets/buttons/FilledButton'
import Checkbox from '../../form/Checkbox'
interface Props {
  imageUrl: string
  isDarkTheme: boolean
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
  stateArrMunProv: {
    sArrayPro: RespProvincia[]
    sArrayMu: MunResp[]
  }
  loading: boolean
  getHeatSources: () => Promise<void>
}
export const MapBoxModal = ({
  imageUrl,
  isDarkTheme,
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
}: Props) => {
  return (
    <ModalComponent>
      <div className={`modal-content ${isDarkTheme && 'blackTheme'}`}>
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
          <label>Seleccionar Departamento</label>
          <Select2
            /* value={queryToFind.departamentSelected} */
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
              <SwitchWidget />
              {showProvMun ? (
                <>
                  <label>Seleccionar Provincia</label>
                  <Select2
                    onChange={(e) => {
                      changeQueryOneFieldToFind('provincia', e!.value)
                    }}
                    /* options={stateArrMunProv.sArrayPro} */
                    options={stateArrMunProv.sArrayPro.map((provincia) => ({
                      value: provincia.nombre_provincia,
                      label: provincia.nombre_provincia,
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
                    options={stateArrMunProv.sArrayMu.map((municipio) => ({
                      value: municipio.nombre_municipio,
                      label: municipio.nombre_municipio,
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
