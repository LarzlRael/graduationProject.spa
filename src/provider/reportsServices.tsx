import { saveAs } from 'file-saver'

import { baseURL, serverAPI } from './serverConfig'
import { IGenerateReport } from '../interfaces/reportsInterface'
import { setFileNameAndExtension } from '../utils/utils'

export const downloadShapeFile = async (generateReport: IGenerateReport) => {
  const { dateStart, dateEnd } = generateReport
  const url = `${baseURL}/reports/getshapefile/${dateStart}/${dateEnd}`
  const openWindow = window.open(url, '_blank')
  if (openWindow) {
    openWindow.focus()
  }
}

export const getReportGeoJsonByDate = async (
  generateReport: IGenerateReport,
) => {
  const response = await serverAPI.post(
    'reports/geojsonreport',
    generateReport,
    {
      responseType: 'blob',
    },
  )

  let blob = new Blob([response.data])
  saveAs(
    blob,
    `reporte ${setFileNameAndExtension(
      generateReport.dateStart,
      'geojson',
      generateReport.dateEnd,
    )}`,
  )
}

export const getCVSreport = async (generateReport: IGenerateReport) => {
  console.log(generateReport);
  const response = await serverAPI.post('reports/getreportcvs', generateReport)

  console.log(response.data);
  let blob = new Blob([response.data])
  saveAs(
    blob,
    `reporte ${setFileNameAndExtension(
      generateReport.dateStart,
      'csv',
      generateReport.dateEnd,
    )}`,
  )
}
interface IUploadFile {
  ok: boolean
  msg: string
}
export const uploadFileCVS = async (file: File): Promise<IUploadFile> => {
  let formData = new FormData()

  formData.append('csv', file)

  try {
    const response = await serverAPI.post('maps/uploadcsvupdate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response.status === 200 || response.status === 201) {
      return response.data
    } else {
      return response.data
    }
  } catch (error) {
    return {
      ok: false,
      msg: 'Hubo un error al subir el archivo',
    }
  }
}
