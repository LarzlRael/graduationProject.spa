import { useRef, useEffect } from 'react'
import { RespFoco } from '../../interfaces/countProvinceDepartamento.interface'
import { useGraficos } from '../../hooks/useGraficos'
import { LoadingElipsis } from '../widgets/loadings/LoadingElipsis'
import Select from 'react-select'

import NotFound from '../widgets/error/NotFound'
export interface GraphProps {
  info?: RespFoco[]
  nombreDepartamento: string
  loading: boolean
  ref: any
  selected: (value: any) => void
}

export const Graficos = (graphProps: GraphProps) => {
  const {
    changeTypeGraph,
    ShowGraphic,
    graphType,
    graphTypeArray,
    tipoGrafico,
  } = useGraficos(graphProps)

  const { loading, info } = graphProps

  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, myRef.current?.offsetTop ? myRef.current?.offsetTop : 0)
  }, [loading])

  const graphTypeArrayGenerated = graphTypeArray.map((graph) => ({
    value: graph,
    label: graph,
  }))
  return (
    <div>
      <label>Tipo de grafico</label>
      <Select
        /* renderValue={(value) => `${graphType}`} */
        options={graphTypeArrayGenerated}
        value={graphTypeArrayGenerated.filter(
          (option) => option.value === graphType,
        )}
        onChange={(e) => {
          changeTypeGraph(e!.value)
        }}
      />

      {loading ? (
        <LoadingElipsis />
      ) : info?.length === 0 ? (
        <NotFound
          ref={myRef}
          subtitle="No se encontraron datos para el departamento seleccionado"
          title="No se encontraron datos"
        />
      ) : (
        <div
          ref={myRef}
          className={`${tipoGrafico === 'circular' && 'grafic-circle'}`}
        >
          <ShowGraphic />
        </div>
      )}
    </div>
  )
}
