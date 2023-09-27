import { useEffect, useState, useContext } from 'react'
import jsPDF from 'jspdf'
import { convertirFecha } from '../utils/utils'
import {
  getCVSreport,
  getReportGeoJsonByDate,
  downloadShapeFile,
} from '../provider/reportsServices'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
// Create Document Component

export const useReport = () => {
  const { datesAvailable } = useContext(HeatSourcesContext)

  const [dateFromTo, setDates] = useState({
    dateStart: datesAvailable.max_date,
    dateEnd: datesAvailable.max_date,
  })
  const [loading, setLoading] = useState<boolean>()

  const generateCVSreport = async () => {
    console.log(dateFromTo)
    setLoading(true)
    await getCVSreport({
      ...dateFromTo,
    })
    setLoading(false)
  }

  const generateGeoJsonReport = async () => {
    setLoading(true)
    const getGeoJsonReport = await getReportGeoJsonByDate({
      ...dateFromTo,
    })
    setLoading(false)
    return getGeoJsonReport
  }

  const generatePdfReport = (dateToconsult: Date) => {
    setLoading(true)
    const newDate = convertirFecha(dateToconsult)
    const doc = new jsPDF('portrait', 'px', 'letter', false)
    //TODo generar el informe pdf
    setLoading(false)
    doc.save(`reporte${newDate}.pdf`)
  }
  const generateShapeFile = async () => {
    setLoading(true)
    await downloadShapeFile({
      ...dateFromTo,
    })
    setLoading(false)
  }

  return {
    generateCVSreport,
    generateGeoJsonReport,
    generatePdfReport,
    generateShapeFile,
    loading,
    dateFromTo,
    setDates,
  }
}
