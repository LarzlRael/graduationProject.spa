import { useState, useContext } from 'react'

import { useReport } from '../../hooks/useReport'
import { FaFileCsv, FaFilePdf } from 'react-icons/fa'
import { VscJson } from 'react-icons/vsc'

import moment from 'moment'
import 'moment/locale/es' // without this line it didn't work
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import { GhostButton } from '../widgets/buttons/GhostButton'
import { LoadingSpin } from '../widgets/loadings/Loading'
moment.locale('es')

export const CustomDateRangePickerDay = () => {
  const { datesAvailable } = useContext(HeatSourcesContext)

  const [dates, setValue] = useState<Date[]>([
    datesAvailable[1],
    datesAvailable[1],
  ])
  const {
    generateCVSreport,
    generateGeoJsonReport,
    generatePdfReport,
    generateShapeFile,
    loading,
  } = useReport()

  const onChange = (value: any) => {
    console.log(value[0].toISOString().slice(0, 10))
    setValue(value)
  }

  const size = '1.2rem'
  return (
    <div className="calendar-buttons">
      que fue
      <div className="buttons-groups">
        <GhostButton
          disabled={loading}
          backgroundcolor="var(--primary-color)"
          onClick={() => generatePdfReport(dates[0]!)}
          icon={<FaFilePdf color="#f40f02" size={size} />}
        >
          Descargar Reporte PDF
        </GhostButton>
        <GhostButton
          disabled={loading}
          backgroundcolor="var(--primary-color)"
          onClick={() => generateCVSreport(dates[0]!, dates[1]!)}
          icon={<FaFileCsv size={size} />}
        >
          Descargar CSV
        </GhostButton>
        <GhostButton
          disabled={loading}
          backgroundcolor="var(--primary-color)"
          onClick={() => generateGeoJsonReport(dates[0]!, dates[1]!)}
          icon={<VscJson color="#201b1b" size={size} />}
        >
          Descargar GeoJson
        </GhostButton>
        <GhostButton
          disabled={loading}
          backgroundcolor="var(--primary-color)"
          onClick={() => generateShapeFile(dates[0]!, dates[1]!)}
          icon={<VscJson color="#201b1b" size={size} />}
        >
          Descargar ShapeFile
        </GhostButton>

        {loading && <LoadingSpin />}
        <h2>Consultas entre fechas</h2>
        {dates.map((home, i) => (
          <p key={i}>{moment(home).format('LL')}</p>
        ))}
      </div>
    </div>
  )
}
