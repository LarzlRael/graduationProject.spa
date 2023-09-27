import { useEffect, useContext } from 'react'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'

import { LoadingElipsis } from './widgets/loadings/LoadingElipsis'
import { Switch } from '../form/Switch'

import { QueryToFindInterface } from '../interfaces/heatResources.interfaces'
import { Label } from './text'

interface DatePickerRangeProps {
  onChangeDate?: () => void
}
export const DatePickerRange = ({ onChangeDate }: DatePickerRangeProps) => {
  const { datesAvailable, loadingState } = useContext(HeatSourcesContext)
  const { queryToFind, changeQueryToFind } = useContext(HeatSourcesContext)

  const { findMultipleDates: isShowSwith } = queryToFind
  useEffect(() => {
    if (!isShowSwith) {
      changeQueryToFind({
        ...queryToFind,
        dateEnd: queryToFind.dateStart!,
      })
    } else {
      changeQueryToFind({
        ...queryToFind,
        dateEnd: moment(queryToFind.dateStart).add(6, 'days').toDate(),
      })
    }
  }, [queryToFind.dateStart])

  useEffect(() => {
    if (onChangeDate !== undefined) {
      onChangeDate()
    }
  }, [queryToFind.dateEnd, queryToFind.dateStart])

  useEffect(() => {
    if (!isShowSwith) {
      changeQueryToFind({
        ...queryToFind,
        dateEnd: queryToFind.dateStart!,
      })
      return
    }
    changeQueryToFind({
      ...queryToFind,
      dateEnd: moment(queryToFind.dateStart).add(6, 'days').toDate(),
    })
  }, [isShowSwith])

  const onChange = (nameField: keyof QueryToFindInterface, value: any) => {
    changeQueryToFind({
      ...queryToFind,
      [nameField]: value,
    })
  }

  return !loadingState ? (
    <>
      <div>
        <div>
          <Label
            display="block"
            color="var(--color-text)"
            margin="0 0 0.2rem 0"
            fontSize="0.9rem"
            textAlign="start"
            htmlFor=""
          >
            Fecha de inicio
          </Label>
          <DatePicker
            selected={queryToFind.dateStart}
            maxDate={datesAvailable.max_date}
            dateFormat="dd/MM/yyyy"
            onChange={(e: any) => onChange('dateStart', e!)}
          />
        </div>
        {isShowSwith && (
          <div
            style={{
              marginTop: '.5rem',
            }}
          >
            <Label
              display="block"
              color="var(--color-text)"
              margin="0 0 0.2rem 0"
              fontSize="0.9rem"
              textAlign="start"
              htmlFor=""
            >
              Fecha de fin
            </Label>
            <DatePicker
              selected={queryToFind.dateEnd}
              dateFormat="dd/MM/yyyy"
              minDate={queryToFind.dateStart}
              maxDate={queryToFind.dateEnd ?? queryToFind.dateEnd}
              onChange={(e: any) => onChange('dateEnd', e!)}
            />
          </div>
        )}
      </div>

      <Switch
        checked={isShowSwith}
        onChange={(e) => onChange('findMultipleDates', e.target.checked)}
        label={`Buscando por ${isShowSwith ? 'rango' : 'un solo dia'}`}
      />
    </>
  ) : (
    <LoadingElipsis />
  )
}
