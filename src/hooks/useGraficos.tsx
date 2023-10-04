import { useEffect, useState, useContext } from 'react'
import { getRandomColor } from '../utils/utils'
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import { GraphProps } from '../components/graphs/Graficos'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
import { graphTypeArray } from '../data/data'

export const useGraficos = ({
  info,
  nombreDepartamento,
  loading,
  selected,
}: GraphProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend, ...registerables)
  const { changeTypeGraph, graphType } = useContext(HeatSourcesContext)

  const [stringTitle, setStringTitle] = useState<string[]>([''])
  const [tipoGrafico, setTipoGrafico] = useState<string>()

  useEffect(() => {
    if (info) {
      const arrayTitles = info.map((resp) => resp.nombre)
      setStringTitle(arrayTitles)
    }
  }, [info])

  const data = {
    labels: stringTitle,
    datasets: [
      {
        label: `Departamento de ${nombreDepartamento}`,
        data: info?.map((ele) => parseInt(ele.focos_calor))
          ? info?.map((ele) => parseInt(ele.focos_calor))!
          : [],
        backgroundColor: stringTitle.map(() => getRandomColor()),
        borderColor: Array(stringTitle.length).fill('rgba(0, 0, 0, 0.9)'),
        borderWidth: 1,
      },
    ],
  }

  const data2 = {
    labels: stringTitle,

    datasets: info?.map((ele) => ({
      label: ele.nombre,
      data: parseInt(ele.focos_calor),
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
    })),
  }
  /*   console.log('data ok ', data)
  console.log(':( ', data2) */

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Consultas del departamento de ${nombreDepartamento}`,
      },
    },
    onClick: function (evt: any, elements: any) {
      if (elements.length === 0) {
        return
      }
      selected({
        nameLocation: stringTitle[elements[0].index],
        departamentSelected: nombreDepartamento,
      })
    },
  }

  const options2 = {
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: nombreDepartamento,
      },
    },
    onClick: function (evt: any, elements: any[]) {
      if (elements.length === 0) {
        return
      }
      selected({
        nameLocation: stringTitle[elements[0].index],
        departamentSelected: nombreDepartamento,
      })
    },
  }

  const ShowGraphic = () => {
    switch (graphType) {
      case 'Pie':
        setTipoGrafico('circular')
        return <Pie data={data} />
      case 'Lineas':
        setTipoGrafico('cuadrado')
        return <Line data={data} options={options} />
      case 'Barras Horizontal':
        setTipoGrafico('cuadrado')
        return <Bar data={data} options={options} />
      case 'Barras Vertical':
        setTipoGrafico('cuadrado')
        return <Bar data={data} options={options2} />
      case 'Dona':
        setTipoGrafico('circular')
        return <Doughnut data={data} options={options} />
      default:
        setTipoGrafico('cuadrado')
        return <Pie data={data} />
    }
  }

  return {
    changeTypeGraph,
    ShowGraphic,
    loading,
    graphType,
    info,
    graphTypeArray,
    tipoGrafico,
  }
}
