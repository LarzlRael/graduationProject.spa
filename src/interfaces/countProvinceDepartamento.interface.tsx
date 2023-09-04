export interface CountDepProMun {
  resp: RespFoco[]
}
export interface RespFoco {
  nombre: string
  focos_calor: string
}

export interface CountByDates {
  resp: DatesHeatSources[]
}
export interface DatesHeatSources {
  acq_date: Date
  focos_calor: string
}

export interface LatLngInt {
  longitude: number
  latitude: number
}
