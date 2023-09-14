import { serverAPI } from './serverConfig'
import { DatesResponse } from '../interfaces/datesResponse'
import { IHeatResourcesAndPoint } from '../interfaces/geoJsonResponse'
import { QueryToFindInterface } from '../context/HeatSources/HeatSourcesReducer'

export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
  const { data } = await serverAPI.get<DatesResponse>('/analysis/dates')
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
