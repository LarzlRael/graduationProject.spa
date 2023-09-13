import React, { useRef, useEffect, useState } from 'react'
import { MapBoxLayer } from '../components/mapbox/MapBoxLayer'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  GeoJSON,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import { useFocosCalor } from '../hooks/usefocosCalor'
import { GeoJsonObject } from 'geojson'
import { MapBoxModal } from '../components/mapbox/MapBoxModal'
import { mapsTypeStyle } from '../data/data'
import { generateUniqueKey } from '../utils/key_utils'
import { ButtonIcon } from '../components/widgets/buttons/ButtonIcons'
/* import './react-leaflet.css'; */

export const InteractiveMap = () => {
  const {
    loading,

    onChange,
    currentHeatSources,
    selecteDepartamentCopy,

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
    setShowProvinvicaMun,
    loadingNetworl,
  } = useFocosCalor()

  function convertToGeoJson(): GeoJsonObject {
    const { type, ...rest } = currentHeatSources.heatResources
    return {
      type: 'Point',
      ...rest,
    }
  }
  function polyToGeoJson(): GeoJsonObject {
    const { type, ...rest } = currentHeatSources.middlePoint.poligono
    return {
      type: 'MultiPolygon',
      ...rest,
    }
  }
  const [key, setKey] = useState(generateUniqueKey())
  useEffect(() => {
    setKey(generateUniqueKey())
  }, [currentHeatSources.heatResources])
  const initialPosition = [-17.390915, -66.2137434]

  return (
    <div>
      <ButtonIcon
        style={{
          marginTop: '1rem',
        }}
      />

      <MapBoxModal
        showProvinvicaMun={setShowProvinvicaMun}
        imageUrl={selecteDepartamentCopy.image}
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
      <MapContainer
        center={[initialPosition[0], initialPosition[1]]}
        zoom={7}
        key={key}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={convertToGeoJson()} />
        <GeoJSON data={polyToGeoJson()} />

        {currentHeatSources.middlePoint.coordinates.longitude !== undefined && (
          <RecenterAutomatically
            lat={currentHeatSources.middlePoint.coordinates.longitude}
            lng={currentHeatSources.middlePoint.coordinates.latitude}
          />
        )}
      </MapContainer>
    </div>
  )
}
const RecenterAutomatically = ({ lat, lng }: any) => {
  console.log(lat, lng)
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    map.setZoom(9)
  }, [lat, lng])
  return null
}
