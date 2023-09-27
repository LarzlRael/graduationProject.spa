import { useState, useContext } from 'react'
import { useReport } from '../hooks/useReport'

import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import moment from 'moment'
import 'moment/locale/es' // without this line it didn't work
import DatePicker from 'react-datepicker'
import { FilledButton } from './widgets/buttons/FilledButton'
import Select from 'react-select'
import { Label } from './text'
import { GhostButton } from './widgets/buttons/GhostButton'

import { FaFileCsv, FaFilePdf } from 'react-icons/fa'
import { VscJson } from 'react-icons/vsc'

moment.locale('es')
const size = '1.2rem'
export const ResponsiveDatePickers = () => {
  const { datesAvailable } = useContext(HeatSourcesContext)
  const {
    generateCVSreport,
    generateGeoJsonReport,
    generatePdfReport,
    generateShapeFile,
    dateFromTo,
    setDates,
    loading,
  } = useReport()

  const [typeFile, setTypeFile] = useState('')

  /*  const handleChange = (event: SelectChangeEvent) => {
    setTypeFile(event.target.value as string)
  } */

  /* const dowloadFileSelected = () => {
    switch (typeFile) {
      case 'PDF':
        return generatePdfReport(new Date())
      case 'CSV':
        return generateCVSreport()

      case 'ShapeFile':
        return generateShapeFile()

      case 'GeoJson':
        return generateGeoJsonReport()

      default:
        break
    }
  }
  const options = [
    { value: 'PDF', label: 'PDF' },
    { value: 'GeoJson', label: 'GeoJson File' },
    { value: 'ShapeFile', label: 'ShapeFile' },
    { value: 'CSV', label: 'CSV' },
  ] */

  return (
    <>
      <div>
        <div>
          <Label
            display="block"
            color="var(--color-text)"
            fontSize="1rem"
            textAlign="start"
            htmlFor=""
          >
            Fecha de inicio
          </Label>
          <DatePicker
            /* label="Desde" */
            dateFormat="dd/MM/yyyy"
            selected={dateFromTo.dateStart}
            minDate={datesAvailable.min_date}
            maxDate={datesAvailable.max_date}
            onChange={(newValue: any) => {
              setDates({
                ...dateFromTo,
                dateStart: newValue,
              })
            }}
          />
        </div>
        <div
          className="div"
          style={{
            marginTop: '.5rem',
          }}
        >
          <Label
            display="block"
            color="var(--color-text)"
            fontSize="1rem"
            textAlign="start"
            htmlFor=""
          >
            Fecha fin
          </Label>
          <DatePicker
            /* label="Hasta" */
            dateFormat="dd/MM/yyyy"
            selected={dateFromTo.dateEnd}
            minDate={datesAvailable.min_date}
            maxDate={datesAvailable.max_date}
            onChange={(newValue: any) => {
              setDates({
                ...dateFromTo,
                dateEnd: newValue,
              })
            }}
          />
        </div>
      </div>
      <div>
        <div className="buttons-groups">
          <GhostButton
            disabled={loading}
            backgroundcolor="var(--primary-color)"
            onClick={() => generatePdfReport(dateFromTo.dateStart)}
            icon={<FaFilePdf color="#f40f02" size={size} />}
          >
            Descargar Reporte PDF
          </GhostButton>
          <GhostButton
            disabled={loading}
            backgroundcolor="var(--primary-color)"
            onClick={generateCVSreport}
            icon={<FaFileCsv size={size} />}
          >
            Descargar CSV
          </GhostButton>
          <GhostButton
            disabled={loading}
            backgroundcolor="var(--primary-color)"
            onClick={generateGeoJsonReport}
            icon={<VscJson color="#201b1b" size={size} />}
          >
            Descargar GeoJson
          </GhostButton>
          <GhostButton
            disabled={loading}
            backgroundcolor="var(--primary-color)"
            onClick={generateShapeFile}
            icon={<VscJson color="#201b1b" size={size} />}
          >
            Descargar ShapeFile
          </GhostButton>
        </div>

        <div>
          Desde: <b>{moment(dateFromTo.dateStart).format('DD/MM/yyyy')}</b>
          <br />
          hasta:
          <b> {moment(dateFromTo.dateEnd).format('DD/MM/yyyy')}</b>
          <br />
          {/* <FilledButton onClick={dowloadFileSelected}>
          Descargar archivo {typeFile}
        </FilledButton> */}
        </div>
      </div>
    </>
  )
}
