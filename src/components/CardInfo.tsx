/* import { es } from "date-fns/locale"; */
import moment from 'moment'
import 'moment/locale/es' // without this line it didn't work
import { HeatSourcestState } from '../context/HeatSources/HeatSourcesReducer'
import { useContext, useEffect } from 'react'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'
moment.locale('es')

interface CardInfoInterface {
  imageUrl: string
}
export const CardInfo = ({ imageUrl }: CardInfoInterface) => {
  const {
    dateSelectedAndRange,
    queryToFind,
    currentGeoJson,
    showOptions,
    showProvMun,
  } = useContext(HeatSourcesContext)

  const renderPlaceName = (): string => {
    if (!showOptions) {
      return ''
    }
    if (showOptions && showProvMun) {
      return queryToFind.provincia
    }
    return queryToFind.municipio
  }

  return (
    <div>
      <img height="160" src={imageUrl} alt="Contemplative Reptile" />
      <div>
        <h2>
          {queryToFind.departamentSelected} {renderPlaceName()}
        </h2>
        <span>
          Focos de calor detectados en {renderPlaceName()}{' '}
          {!dateSelectedAndRange.findbyOneDate ? (
            <>
              <b>{moment(dateSelectedAndRange.dateStart).format('LL')}</b>
              <b>es de {currentGeoJson.features.length}</b>
            </>
          ) : (
            <>
              <b>{moment(dateSelectedAndRange.dateStart).format('LL')}</b> hasta{' '}
              <b>{moment(dateSelectedAndRange.dateEnd).format('LL')}</b> es de{' '}
              <b>{currentGeoJson.features.length}</b>
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
