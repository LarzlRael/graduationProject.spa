import { serverAPI } from './serverConfig'
import { DatesResponse } from '../interfaces/datesResponse'
import { HeatSourcesByDeparament } from '../interfaces/hottestByDepartament'
import { HeatSourcesByPlace } from '../interfaces/provMun.interface'
import { GeoJSONResponse } from '../interfaces/HottestSourceResponse'
import {
  CoordLatLngInt,
  LatLngInt,
} from '../interfaces/countProvinceDepartamento.interface'
import { IHeatResourcesAndPoint } from '../interfaces/geoJsonResponse'

export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
  const { data } = await serverAPI.get<DatesResponse>('/analysis/dates')
  return data
}

export const getHotSourcesByType = async (
  heatSourcesByPlace: HeatSourcesByPlace,
): Promise<IHeatResourcesAndPoint> => {
  const resp = await serverAPI.post<IHeatResourcesAndPoint>(
    `/maps/getHeatSourcesAllByType`,
    {
      ...heatSourcesByPlace,
    },
  )
  return resp.data
}
