import { Layout } from '../components/Layout'
import { ResponsiveDatePickers } from '../components/CalendarPicker'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const ReportsAndDownloads = () => {
  useDocumentTitle('Descargas')

  return (
    <Layout>
      <ResponsiveDatePickers />
    </Layout>
  )
}
