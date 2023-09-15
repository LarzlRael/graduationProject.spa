export const images = [
  { name: 'La Paz', source: 'lapaz.png' },
  { name: 'Oruro', source: 'Oruro.png' },
  { name: 'Potosi', source: 'potosi.png' },
  { name: 'Tarija', source: 'tarija.png' },
  { name: 'Chuquisaca', source: 'chuquisaca.png' },
  { name: 'Cochabamba', source: 'cochabamba.png' },
  { name: 'Beni', source: 'beni.png' },
  { name: 'Pando', source: 'pando.png' },
  { name: 'Santa Cruz', source: 'santacruz.png' },
]
export const namesDepartamentos = [
  'Bolivia',
  'La Paz',
  'Oruro',
  'Potosi',
  'Tarija',
  'Chuquisaca',
  'Cochabamba',
  'Beni',
  'Pando',
  'Santa Cruz',
]
export interface OptionAndValueInterface {
  label: string
  value: string
}
export const departametsArray: OptionAndValueInterface[] = [
  {
    label: 'Bolivia',
    value:
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6f/46/31.jpg',
  },
  {
    label: 'La Paz',
    value:
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6f/46/31.jpg',
  },
  {
    label: 'Oruro',
    value:
      'http://www.chamlaty.com/wp-content/uploads/2019/03/Captura-de-pantalla-2019-03-15-a-las-10.30.43.png',
  },
  {
    label: 'Potosi',
    value:
      'https://www.elcolombiano.com/binrepository/733x562/0c0/0d0/none/11101/WVSQ/potosiimagen_37443608_20210329100749.jpg',
  },
  {
    label: 'Tarija',
    value: 'https://i.ytimg.com/vi/b2_SfdyiKKM/maxresdefault.jpg',
  },
  {
    label: 'Chuquisaca',
    value:
      'https://mediaim.expedia.com/destination/1/170eb17de2d7bbf1ed92aed5e6b7ffca.jpg?impolicy=fcrop&w=360&h=224&q=mediumLow',
  },
  {
    label: 'Cochabamba',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cristo_de_La_Concordia.jpg/295px-Cristo_de_La_Concordia.jpg',
  },
  {
    label: 'Beni',
    value:
      'https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/26.11%20beni.jpg?itok=u3eluHWH',
  },
  {
    label: 'Pando',
    value:
      'https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/cobija2.jpg?itok=k2R_1uLY',
  },
  {
    label: 'Santa Cruz',
    value: 'https://i.ytimg.com/vi/QTDLMVXDvzs/maxresdefault.jpg',
  },
]

export const cultureInfo = {
  day: {
    name: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ],
    abbr: ['Dom', 'Lun', 'Martes', 'Mie', 'Jue', 'Vie', 'Sab'],
  },
  month: {
    name: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    abbr: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
  },
}

export const monthName = [
  '',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const mapType = [
  'streets-v11',
  'outdoors-v11',
  'light-v10',
  'dark-v10',
  'satellite-v9',
  'satellite-streets-v11',
  'navigation-day-v1',
  'navigation-night-v1',
]
export interface MapStyleIntOption {
  value: string
  label: string
}

export const mapsTypeStyle: MapStyleIntOption[] = [
  {
    label: 'Mapa de Calles',
    value: 'streets-v11',
  },
  {
    value: 'outdoors-v11',
    label: 'Mapa al aire libre',
  },
  {
    value: 'light-v10',
    label: 'Mapa Claro',
  },
  {
    value: 'dark-v10',
    label: 'Mapa Oscuro',
  },
  {
    value: 'satellite-v9',
    label: 'Mapa de satélite',
  },
  {
    value: 'satellite-streets-v11',
    label: 'Mapa de satélites y calles',
  },
  {
    value: 'navigation-day-v1',
    label: 'Mapa de navegación',
  },
  {
    value: 'navigation-night-v1',
    label: 'Mapa de noche',
  },
]

export const meses = [
  'El Año Entero',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const graphTypeArray = [
  'Barras Vertical',
  'Barras Horizontal',
  'Pie',
  'Lineas',
  'Dona',
]
