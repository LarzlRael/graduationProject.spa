import Map, { Layer, NavigationControl, Source } from 'react-map-gl'

import { useFocosCalor } from '../../hooks/usefocosCalor'

import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { MapBoxModal } from './MapBoxModal'
import { mapsTypeStyle } from '../../data/data'

const apikey = process.env.REACT_APP_MAPBOX_KEY

export const MapBoxLayer = () => {
  const {
    viewport,
    setViewport,
    loading,
    loadingState,
    onChange,
    currentGeoJson: focosDeCalor,
    selecteDepartamentCopy,
    layerStyle,
    getHeatSources,
    stateArrMunProv,
    //state from usestate
    // menu controls
    showProvMun,
    showOptions,
    setShowOptions,
    //style maps
    setChangeMapType,
    mapStyle,
    //query to find
    queryToFind,
    changeQueryOneFieldToFind,
    darkTheme,
  } = useFocosCalor()
  useDocumentTitle('Mapa de focos de calor')

  const navControlStyle = {
    left: 10,
    top: 10,
  }

  return (
    <div className="mapContainer">
      <Map
        /* minZoom={viewport.zoom} */
        mapboxApiAccessToken={apikey}
        {...viewport}
        style={{ width: '90vw', height: '100vh' }}
        mapStyle={`mapbox://styles/mapbox/${mapStyle.value}`}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        <Source id="my-data" type="geojson" data={focosDeCalor}>
          <Layer {...layerStyle} />
        </Source>

        <NavigationControl style={navControlStyle} />

        <MapBoxModal
        showProvinvicaMunicipio={showProvMun}
          imageUrl={selecteDepartamentCopy.image}
          isDarkTheme={darkTheme}
          mapTypeStyle={mapsTypeStyle}
          mapStyle={mapStyle}
          setChangeMapType={setChangeMapType}
          queryToFind={queryToFind}
          changeQueryOneFieldToFind={changeQueryOneFieldToFind}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          onChange={onChange}
          showProvMun={showProvMun}
          stateArrMunProv={stateArrMunProv}
          loading={loading}
          getHeatSources={getHeatSources}
        />
      </Map>
    </div>
  )
}
