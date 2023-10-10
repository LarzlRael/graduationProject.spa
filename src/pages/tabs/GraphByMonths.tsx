import { useState, useRef } from 'react'
import { useEffect, useContext } from 'react'

import { Line, Bar } from 'react-chartjs-2'
import moment from 'moment'
import Select from 'react-select'

import { OptionAndValueInterface, meses, monthName } from '../../data/data'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import {
  getOnlyYear,
  getRandomColor,
  getOnlyMonth,
  isYear,
  findIndexMonth,
} from '../../utils/utils'

import useAxiosAuth from '../../hooks/useAxios'
import { convertMonths } from '../../utils/utils'
import {
  Chart as ChartJS,
  ArcElement,
  registerables,
  Tooltip,
  Legend,
} from 'chart.js'
import { LoadingElipsis } from '../../components/widgets/loadings/LoadingElipsis'
import { Switch } from '../../form/Switch'
import { useNavigate } from 'react-router-dom'
import { Label } from '../../components/text'
moment.locale('es')

export const GraphByMonths = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, ...registerables)

  const {
    setMounthSelected,
    getHeatSourcesInfoToGragh,
    mounthAndYearSelected,
    titleArray,
    loadingState,
    countByDates,
    changeQueryToFind,
    queryToFind,
  } = useContext(HeatSourcesContext)

  const { response, loading } = useAxiosAuth({
    url: '/analysis/available-mounth',
  })

  const navigate = useNavigate()

  useEffect(() => {
    getHeatSourcesInfoToGragh(
      mounthAndYearSelected.month,
      mounthAndYearSelected.year,
    )
  }, [mounthAndYearSelected])

  const [lineGraph, setLineGraph] = useState(false)

  const data = {
    labels: titleArray,
    datasets: [
      {
        label: `Focos de calor`,
        data: countByDates?.map((ele) => parseInt(ele.focos_calor)) || [],
        backgroundColor: titleArray.map(() => getRandomColor()),
        borderColor: Array(titleArray.length).fill('rgba(0, 0, 0, 0.9)'),
        borderWidth: 1,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        /* text: `Focos de calor en ${meses[mounthAndYearSelected.month]}`, */
        text: mounthAndYearSelected.month
          ? monthName[mounthAndYearSelected.month] +
            '-' +
            mounthAndYearSelected.year
          : mounthAndYearSelected.year.toString(),
      },
    },
    elements: {
      bar: {
        borderWidth: 5,
      },
    },
    onClick: function (evt: any, elements: any) {
      if (elements.length === 0) {
        return
      }

      if (monthName.includes(titleArray[elements[0].index])) {
        setMounthSelected({
          month: findIndexMonth(titleArray[elements[0].index]),
          year: mounthAndYearSelected.year,
          onlyYear: false,
        })
        return
      }

      changeQueryToFind({
        ...queryToFind,
        typeLocation: 'pais',
        dateStart: moment(titleArray[elements[0].index], 'DD-MM-YYYY').toDate(),
        dateEnd: moment(titleArray[elements[0].index], 'DD-MM-YYYY').toDate(),
      })

      navigate('/mapa')
    },
  }

  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, myRef.current?.offsetTop ? myRef.current?.offsetTop : 0)
  }, [mounthAndYearSelected])

  const handleChange = (value: string) => {
    if (isYear(value.toString())) {
      setMounthSelected({
        month: 0,
        year: parseInt(value),
        onlyYear: true,
      })
    } else {
      setMounthSelected({
        month: getOnlyMonth(value),
        year: getOnlyYear(value),
        onlyYear: false,
      })
    }
  }

  function generateOption(): OptionAndValueInterface[] {
    return (
      response?.map(({ month, year }: { month?: number; year: number }) => ({
        value: month ? `${month}-${year}` : `${year}`,
        label: month ? `${monthName[month]}-${year}` : `${year}`,
      })) || []
    )
  }

  return (
    <>
      <Switch
        checked={lineGraph}
        onChange={(e) => setLineGraph(e.target.checked)}
        label={`Grafico de ${!lineGraph ? 'Lineas' : 'Puntos'}`}
      />
      {loading ? (
        <LoadingElipsis />
      ) : (
        <div>
          <Label
            display="block"
            color="var(--color-text)"
            margin="0 0 0.2rem 0"
            fontSize="1rem"
            textAlign="start"
          >
            Seleccionar Fecha
          </Label>
          <Select
            value={
              mounthAndYearSelected.onlyYear
                ? generateOption().filter(
                    (option) =>
                      option.value === mounthAndYearSelected.year.toString(),
                  )
                : generateOption().filter(
                    (option) =>
                      option.value ===
                      mounthAndYearSelected.month +
                        '-' +
                        mounthAndYearSelected.year.toString(),
                  )
            }
            options={generateOption()}
            onChange={(e) => handleChange(e!.value)}
          />
        </div>
      )}
      {loadingState ? (
        <LoadingElipsis />
      ) : (
        <div
          style={{ height: '400px', width: '80%', margin: 'auto' }}
          ref={myRef}
        >
          {lineGraph ? (
            <Line data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      )}
    </>
  )
}
