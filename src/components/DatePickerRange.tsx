import { useEffect, useContext } from 'react'
import { FormControlLabel } from '@material-ui/core'
import { Switch } from '@mui/material'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import { DateSelectedRangeInterface } from '../context/HeatSources/HeatSourcesReducer'
import { LoadingElipsis } from './widgets/LoadingElipsis'

export const DatePickerRange = () => {
  const {
    dateSelectedAndRange,
    datesAvailable,
    changeDateSelectedAndRanked,
    loadingState,
  } = useContext(HeatSourcesContext)

  const {
    dateStart,
    dateEnd,
    findbyOneDate: isShowSwith,
  } = dateSelectedAndRange

  useEffect(() => {
    /* setEndDateRange(moment(dateStart,).add(6, 'days').toDate()); */
    changeDateSelectedAndRanked({
      ...dateSelectedAndRange,
      dateEnd: moment(dateStart).add(6, 'days').toDate(),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart])

  useEffect(() => {
    if (!isShowSwith) {
      changeDateSelectedAndRanked({
        ...dateSelectedAndRange,
        dateEnd: dateStart,
      })
      return
    }
    changeDateSelectedAndRanked({
      ...dateSelectedAndRange,
      dateEnd: moment(dateStart).add(6, 'days').toDate(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowSwith])

  const onChange = (
    value: any,
    nameField: keyof DateSelectedRangeInterface,
  ) => {
    changeDateSelectedAndRanked({
      ...dateSelectedAndRange,
      [nameField]: value,
    })
  }
  return !loadingState ? (
    <>
      <>
        <br />

        <DatePicker
          selected={dateStart}
          maxDate={datesAvailable[1]}
          onChange={(e: any) => onChange(e!, 'dateStart')}
        />
        {isShowSwith && (
          <DatePicker
            selected={dateEnd}
            minDate={dateStart ? dateStart : null}
            maxDate={dateEnd ? dateEnd : datesAvailable[1]}
            onChange={(e: any) => onChange(e!, 'dateEnd')}
          />
        )}
      </>

      <FormControlLabel
        control={
          <Switch
            checked={dateSelectedAndRange.findbyOneDate}
            onChange={(e) => onChange(e.target.checked, 'findbyOneDate')}
          />
        }
        label={`Buscando por ${isShowSwith ? 'Rango' : 'Un solo dia'}`}
      />
    </>
  ) : (
    <LoadingElipsis />
  )
}
