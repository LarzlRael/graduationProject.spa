/* import { es } from "date-fns/locale"; */
import moment from 'moment'
import 'moment/locale/es' // without this line it didn't work

import { useContext, useEffect } from 'react'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
moment.locale('es')

interface CardInfoInterface {
  imageUrl: string
}
export const CardInfo = ({ imageUrl }: CardInfoInterface) => {
  const {
    queryToFind,
    currentHeatSources,
    showOptions,
    showProvMun,
  } = useContext(HeatSourcesContext)

  const renderPlaceName = (): string | null | undefined => {
    if (!showOptions) {
      return ''
    }
    return showOptions && showProvMun
      ? queryToFind.typeLocation + ' ' + queryToFind.nameLocation
      : queryToFind.typeLocation + ' ' + queryToFind.nameLocation
  }

  return (
    <div>
      <img height="160" src={imageUrl} alt="Contemplative Reptile" />
      <div>
        <h2>
          {queryToFind.departamento} {renderPlaceName()}
        </h2>
        <span>
          {/* Focos de calor detectados en {renderPlaceName()}{' '} */}
          {!queryToFind.findMultipleDates ? (
            <>
              <b>{moment(queryToFind.dateStart).format('LL')}</b>
              <b>es de {currentHeatSources.heatResources.features.length}</b>
            </>
          ) : (
            <>
              <b>{moment(queryToFind.dateStart).format('LL')}</b> hasta{' '}
              <b>{moment(queryToFind.dateEnd).format('LL')}</b> es de{' '}
              <b>es de {currentHeatSources.heatResources.features.length}</b>
            </>
          )}
        </span>
      </div>
      {/*  <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </div>
  )
}
