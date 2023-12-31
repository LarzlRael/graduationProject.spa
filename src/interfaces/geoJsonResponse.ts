import { LatLngInt } from "./countProvinceDepartamento.interface"

export interface GeoJsonResponse {
  ok: boolean
  report: GeoJsonFeature
}

export interface GeoJsonFeature {
  type: string
  features: Feature[]
}

export interface IHeatResourcesAndPoint {
  heatResources: GeoJsonFeature
  middlePoint: {
    coordinates: LatLngInt
    poligono: Poligono
  }
}

export interface Feature {
  type: FeatureType
  geometry: Geometry
  properties: Properties
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Poligono {
  type: string
  coordinates: Array<Array<Array<number[]>>>
}

export interface Properties {
  id: number
  geometry: string
  latitude: number
  longitude: number
  brightness: number
  scan: number
  track: number
  acq_date: Date
  acq_time: number
  satellite: Satellite
  instrument: Instrument
  confidence: number
  version: Version
  bright_t31: number
  frp: number
  daynight: Daynight
  field_15: null
}

export enum Daynight {
  D = 'D',
  N = 'N',
}

export enum Instrument {
  Modis = 'MODIS',
}

export enum Satellite {
  Aqua = 'Aqua',
  Terra = 'Terra',
}

export enum Version {
  The61Nrt = '6.1NRT',
}

export enum FeatureType {
  Feature = 'Feature',
}
