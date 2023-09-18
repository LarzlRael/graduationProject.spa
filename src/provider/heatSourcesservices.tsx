import { serverAPI } from './serverConfig'
import { IavailablesDates } from '../interfaces/datesResponse'
import { IHeatResourcesAndPoint } from '../interfaces/geoJsonResponse'
import { QueryToFindInterface } from '../context/HeatSources/HeatSourcesReducer'

export const getHigherOrLowerByDate = async (): Promise<IavailablesDates> => {
  const { data } = await serverAPI.get<IavailablesDates>('/analysis/dates')
  return data
}

export const getHotSourcesByType = async (
  heatSourcesByPlace: QueryToFindInterface,
): Promise<IHeatResourcesAndPoint> => {
  const resp = await serverAPI.post<IHeatResourcesAndPoint>(
    `/maps/getHeatSourcesAllByType`,
    {
      ...heatSourcesByPlace,
    },
  )
  return resp.data
}
