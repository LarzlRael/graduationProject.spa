export interface HeatSourcesByPlace {
  dateStart: string
  dateEnd: string
  nameLocation?: string
  typeLocation?: 'provincia' | 'municipio' | null
  departamento: string
}

export interface CountInterface {
  year?: number
  month?: number
}
export interface IProvinciasAndMunicipios {
  provincias: string[]
  municipios: string[]
}
