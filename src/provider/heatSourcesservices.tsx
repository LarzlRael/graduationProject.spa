import { serverAPI } from './serverConfig'
import { DatesResponse } from '../interfaces/datesResponse'
import { HeatSourcesByDeparament } from '../interfaces/hottestByDepartament'
import { HeatSourcesByPlace } from '../interfaces/provMun.interface'
import { GeoJSONResponse } from '../interfaces/HottestSourceResponse'
import {
  CoordLatLngInt,
  LatLngInt,
} from '../interfaces/countProvinceDepartamento.interface'

export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
  const { data } = await serverAPI.get<DatesResponse>('/analysis/dates')
  return data
}
export const getHeatSourcesByDepartament = async (
  consulHeatSources: HeatSourcesByPlace,
): Promise<GeoJSONResponse> => {
  const resp = await serverAPI.post<Promise<GeoJSONResponse>>(
    '/maps/getheatsourcesbydeparment',
    {
      ...consulHeatSources,
    },
  )

  return resp.data
}

export const getHeatAllSources = async (
  consulHeatSources: HeatSourcesByPlace,
): Promise<GeoJSONResponse> => {
  /* delete consulHeatSources.departamento */
  const resp = await serverAPI.post<Promise<GeoJSONResponse>>(
    '/maps/getbybetweendate',
    {
      ...consulHeatSources,
    },
  )

  return resp.data
}

export const getnHeatSourceByDepartament = async (
  hottestbydeparament: HeatSourcesByDeparament,
): Promise<GeoJSONResponse> => {
  const resp = await serverAPI.post<Promise<GeoJSONResponse>>(
    '/analysis/getnheatsourcebydepartament',
    {
      ...hottestbydeparament,
    },
  )
  return resp.data
}


export const getHotSourcesByDepType = async (
  provincia: HeatSourcesByPlace,
): Promise<GeoJSONResponse> => {
  const resp = await serverAPI.post<GeoJSONResponse>(
    `/maps/get_heat_sources_by_type`,
    {
      ...provincia,
    },
  )
  return resp.data
}

export const getMidPoint = async (
  typeLocation: string,
  nameLocation: string,
): Promise<CoordLatLngInt> => {
  const resp = await serverAPI.get<CoordLatLngInt>(
    `/maps/getMidPoint/${typeLocation}/${nameLocation}`,
  )
  console.log(typeLocation, nameLocation);
  console.log(resp.data);
  return resp.data
}

export const getDepartamentPoligone = async (
  departament: string,
): Promise<CoordLatLngInt> => {
  const resp = await serverAPI.get<any>(
    `/maps/getDepartmentPoligonoes/${departament}`,
  )
  return resp.data
}
