import { Layout } from '../components/public/Layout'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ResponsiveDatePickers } from '../components/calendar/CalendarPicker'

export const ReportsAndDownloads = () => {
  useDocumentTitle('Descargas')

  return (
    <Layout>
      <ResponsiveDatePickers />
    </Layout>
  )
}
