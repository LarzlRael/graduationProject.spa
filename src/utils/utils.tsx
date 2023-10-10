import moment from 'moment'
import { cultureInfo } from '../data/data'

export const convertirFecha = (date: Date) => {
  /* 2021-09-14 */
  const currentDate = date.toString().slice(0, 10)
  const newDate = currentDate.split('-')
  const datecurrent = `${newDate[2]}-${newDate[1]}-${newDate[0]}`
  return datecurrent
}

export const setFileNameAndExtension = (
  dateStart: Date,
  extension: string,
  dateEnd?: Date,
): string => {
  const formattedDateStart = formatDate(dateStart)
  const formattedDateEnd = dateEnd ? formatDate(dateEnd) : 'now'
  return `${formattedDateStart}_${formattedDateEnd}.${extension}`
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}${month}${year}`
}

export const getRankDate = (
  time: string,
  dateTo: Date = new Date(),
): string => {
  const date = new Date(dateTo.toISOString().slice(0, 10))

  switch (time) {
    case 'today':
      date.setHours(date.getHours() - 0)
      break
    case '24hrs':
      date.setHours(date.getHours() - 24)
      break
    case 'week':
      date.setHours(date.getHours() - 168)
      break
    case 'twoWeeks':
      date.setHours(date.getHours() - 336)
      break
    case 'oneMounth':
      date.setHours(date.getHours() - 720)
      break

    default:
      date.setHours(date.getHours() - 0)
  }
  date.setHours(date.getHours() - 4 + 24)
  return date.toISOString().slice(0, 10)
}

export const getRandomColor = (): string => {
  const x = Math.floor(Math.random() * 256)
  const y = 100 + Math.floor(Math.random() * 256)
  const z = 50 + Math.floor(Math.random() * 256)
  return `rgb(${x},${y},${z},0.9)`
}

export const capitalizeFirstLetter = (word: string = ''): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min)
}

export const getOnlyMonth = (date: string): number => {
  return parseInt(date.split('-')[0])
}
export const getOnlyYear = (date: string): number => {
  return parseInt(date.split('-')[1])
}

export const isYear = (date: string): boolean => {
  return date.length === 4
}
export function findIndexMonth(monthName: string) {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  // Convertir el mes a minúsculas para hacer la comparación insensible a mayúsculas
  const normalizedMonth = monthName.toLowerCase()

  // Buscar el índice del mes en el array
  const index = months.findIndex((month) => month === normalizedMonth)

  return index + 1
}

export const convertMonths = (date: string): string => {
  /* if (date.length !== 4) {
    return `${cultureInfo.month.name[parseInt(date.split('-')[0])]}-${
      date.split('-')[1]
    }`
  } else {
    return date
  } */
  /* console.log(date?.split('-')) */
  return date
}

export const addHours = (h: number, date: Date) => {
  date.setHours(date.getHours() + h)
  return date
}
