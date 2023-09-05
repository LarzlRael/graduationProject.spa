import { useState, Fragment, useContext } from 'react'

import Stack from '@mui/material/Stack'
import { Box, InputLabel, FormControl, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Grid } from '@material-ui/core'
import { useReport } from '../hooks/useReport'

import 'moment/locale/es' // without this line it didn't work
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { FilledButton } from './widgets/buttons/FilledButton'
moment.locale('es')

export const ResponsiveDatePickers = () => {
  const { datesAvailable } = useContext(HeatSourcesContext)
  const {
    generateCVSreport,
    generateGeoJsonReport,
    generatePdfReport,
    generateShapeFile,
  } = useReport()

  const [startDate, setStartDate] = useState<Date | null>(datesAvailable[1])
  const [endDate, setEndDate] = useState<Date | null>(datesAvailable[1])

  const [typeFile, setTypeFile] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTypeFile(event.target.value as string)
  }

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={3}>
          <DatePicker
            /* label="Desde" */
            selected={startDate}
            maxDate={datesAvailable[1]}
            minDate={datesAvailable[0]}
            onChange={(newValue: any) => {
              setStartDate(newValue)
            }}
          />

          <DatePicker
            /* label="Hasta" */
            selected={endDate}
            minDate={datesAvailable[0]}
            maxDate={datesAvailable[1]}
            onChange={(newValue: any) => {
              setEndDate(newValue)
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Seleccionar descarga
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeFile}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="PDF">Reporte PDF</MenuItem>
              <MenuItem value="GeoJson">GeoJson File</MenuItem>
              <MenuItem value="ShapeFile">ShapeFile</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
            </Select>
          </FormControl>
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
        </Box>
      </Grid>
    </Grid>
  )
}
