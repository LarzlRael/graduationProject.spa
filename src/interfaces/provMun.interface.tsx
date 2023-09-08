export interface HeatSourcesByPlace {
  dateStart: string
  dateEnd: string
  provincia?: string
  municipio?: string
  departamento?: string
}

export interface CountInterface {
  year?: number
  month?: number
}
export interface IProvinciasAndMunicipios {
  provincias: string[]
  municipios: string[]
}
