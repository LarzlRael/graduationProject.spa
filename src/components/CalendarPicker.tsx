import { useState, useContext } from 'react'
import { useReport } from '../hooks/useReport'

import 'moment/locale/es' // without this line it didn't work
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { FilledButton } from './widgets/buttons/FilledButton'
import Select from 'react-select'
moment.locale('es')

export const ResponsiveDatePickers = () => {
  const { datesAvailable } = useContext(HeatSourcesContext)
  const {
    generateCVSreport,
    generateGeoJsonReport,
    generatePdfReport,
    generateShapeFile,
  } = useReport()

  const [startDate, setStartDate] = useState<Date | null>(
    datesAvailable.min_date,
  )
  const [endDate, setEndDate] = useState<Date | null>(datesAvailable.max_date)

  const [typeFile, setTypeFile] = useState('')

  /*  const handleChange = (event: SelectChangeEvent) => {
    setTypeFile(event.target.value as string)
  } */

  const dowloadFileSelected = () => {
    switch (typeFile) {
      case 'PDF':
        return generatePdfReport(new Date())
      case 'CSV':
        return generateCVSreport(startDate!, endDate!)

      case 'ShapeFile':
        return generateShapeFile(startDate!, endDate!)

      case 'GeoJson':
        return generateGeoJsonReport(startDate!, endDate!)

      default:
        break
    }
  }
  const options = [
    { value: 'PDF', label: 'PDF' },
    { value: 'GeoJson', label: 'GeoJson File' },
    { value: 'ShapeFile', label: 'ShapeFile' },
    { value: 'CSV', label: 'CSV' },
  ]

  return (
    <>
      <>
        <>
          <DatePicker
            /* label="Desde" */
            selected={startDate}
            maxDate={datesAvailable.min_date}
            minDate={datesAvailable.max_date}
            onChange={(newValue: any) => {
              setStartDate(newValue)
            }}
          />

          <DatePicker
            /* label="Hasta" */
            selected={endDate}
            minDate={datesAvailable.min_date}
            maxDate={datesAvailable.max_date}
            onChange={(newValue: any) => {
              setEndDate(newValue)
            }}
          />
        </>
      </>
      <>
        <>
          <>
            <label>Seleccionar descarga</label>
            <Select
              options={options}
              onChange={(e) => {
                setTypeFile(e!.value)
              }}
            />
          </>
          {typeFile !== '' && (
            <>
              Descargar Archivo {typeFile} <br />
              Desde: <b>{moment(startDate).format('LL')}</b>
              <br />
              hasta:
              <b> {moment(endDate).format('LL')}</b>
              <br />
              <FilledButton onClick={dowloadFileSelected}>
                Descargar archivo {typeFile}
              </FilledButton>
            </>
          )}
        </>
      </>
    </>
  )
}
