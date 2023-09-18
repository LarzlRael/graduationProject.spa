import { useEffect, useContext } from 'react'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import { DateSelectedRangeInterface } from '../context/HeatSources/HeatSourcesReducer'
import { LoadingElipsis } from './widgets/loadings/LoadingElipsis'
import { Switch } from '../form/Switch'
import { useFocosCalor } from '../hooks/usefocosCalor'

export const DatePickerRange = () => {
  const {
    dateSelectedAndRange,
    datesAvailable,
    changeDateSelectedAndRanked,
    loadingState,
  } = useContext(HeatSourcesContext)

  const {
    /* dateStart,
    dateEnd, */
    findbyOneDate: isShowSwith,
  } = dateSelectedAndRange
  const { queryToFind, changeQueryToFind } = useFocosCalor()
  useEffect(() => {
    
    changeQueryToFind({
      ...queryToFind,
      dateEnd: moment(queryToFind.dateStart).add(6, 'days').toDate(),
    })
  }, [queryToFind.dateStart])

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

  const onChange = (
    nameField: keyof DateSelectedRangeInterface,
    value: any,
  ) => {
    changeDateSelectedAndRanked({
      ...dateSelectedAndRange,
      [nameField]: value,
    })
    changeQueryToFind({
      ...queryToFind,
      [nameField]: value,
    })
  }

  return !loadingState ? (
    <>
      <div>
        <div>
          <DatePicker
            selected={queryToFind.dateStart}
            maxDate={datesAvailable.max_date}
            dateFormat="dd/MM/yyyy"
            onChange={(e: any) => onChange('dateStart', e!)}
          />
        </div>
        {isShowSwith && (
          <div>
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
        checked={dateSelectedAndRange.findbyOneDate}
        onChange={(e) => onChange('findbyOneDate', e.target.checked)}
        label={`Buscando por ${isShowSwith ? 'Rango' : 'Un solo dia'}`}
      />
    </>
  ) : (
    <LoadingElipsis />
  )
}
