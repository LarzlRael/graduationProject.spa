import { useState, useRef } from 'react'
import { useEffect, useContext } from 'react'

import { Line, Bar } from 'react-chartjs-2'
import moment from 'moment'
import Select from 'react-select'

import { meses, monthName } from '../../data/data'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import {
  getOnlyYear,
  getRandomColor,
  getOnlyMonth,
  isYear,
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
  } = useContext(HeatSourcesContext)

  useEffect(() => {
    getHeatSourcesInfoToGragh(
      mounthAndYearSelected.month,
      mounthAndYearSelected.year,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounthAndYearSelected])

  const [lineGraph, setLineGraph] = useState(false)

  const data = {
    labels: titleArray,
    datasets: [
      {
        label: `Focos de calor`,
        data: countByDates?.map((ele) => parseInt(ele.focos_calor))
          ? countByDates?.map((ele) => parseInt(ele.focos_calor))
          : [],
        backgroundColor: titleArray.map(() => getRandomColor()),
        borderColor: titleArray.map(() => getRandomColor()),
        borderWidth: 3,
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
          : mounthAndYearSelected.year + '',
      },
    },
    elements: {
      bar: {
        borderWidth: 5,
      },
    },
  }

  const { response, loading } = useAxiosAuth({
    url: '/analysis/available-mounth',
  })
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
  // list of mouths with year field
  function generateOption() {
    let options: { value: string; label: string }[] = []
    response?.map(({ month, year }: any) =>
      options.push({
        value: month ? month + '-' + year : year,
        label: month ? monthName[month] + '-' + year : year,
      }),
    )

    return options
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
        <>
          <label>Seleccionar Fecha</label>
          <Select
            options={generateOption()}
            onChange={(e) => handleChange(e!.value)}
          />
        </>
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
