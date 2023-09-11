import { useRef, useEffect } from 'react'
import { RespFoco } from '../interfaces/countProvinceDepartamento.interface'
import { useGraficos } from '../hooks/useGraficos'
import { LoadingElipsis } from './widgets/loadings/LoadingElipsis'
import Select from 'react-select'
export interface GraphProps {
  info?: RespFoco[]
  nombreDepartamento: string
  loading: boolean
  ref: any
  selected: (value: string) => void
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
    <>
      <label>Tipo de grafico</label>
      <Select
        /* renderValue={(value) => `${graphType}`} */
        options={graphTypeArrayGenerated}
        value={
          graphTypeArrayGenerated.filter(
            (option) => option.value === graphType,
          )
        }
        onChange={(e) => {
          changeTypeGraph(e!.value)
        }}
      />

      {loading ? (
        <LoadingElipsis />
      ) : info?.length === 0 ? (
        <div>No se encontraron datos</div>
      ) : (
        <div
          ref={myRef}
          className={`${tipoGrafico === 'circular' && 'grafic-circle'}`}
        >
          <ShowGraphic />
        </div>
      )}
    </>
  )
}
