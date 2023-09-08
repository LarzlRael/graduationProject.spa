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
  const position = [-17.390915, -66.2137434]
  const {
    viewport,
    setViewport,
    loading,
    loadingState,
    onChange,
    currentGeoJson,
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
    showProvinvicaMun,
  } = useFocosCalor()
  function convertToGeoJson(): GeoJsonObject {
    const { type, ...rest } = currentGeoJson
    return {
      type: 'Point',
      ...rest,
    }
  }
  function polyToGeoJson(): GeoJsonObject {
    const { type, ...rest } = viewport.poligone
    return {
      type: 'MultiPolygon',
      ...rest,
    }
  }
  const [key, setKey] = useState(generateUniqueKey())
  useEffect(() => {
    setKey(generateUniqueKey())
  }, [currentGeoJson, viewport])
  console.log(viewport)
  return (
    <div>
      <ButtonIcon
        style={{
          marginTop: '1rem',
        }}
      />
      <MapBoxModal
        showProvinvicaMun={showProvinvicaMun}
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
        center={[-17.390915, -66.2137434]}
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
        {/*  <RecenterAutomatically
          lat={viewport.latitude}
          lng={viewport.longitude}
        /> */}
      </MapContainer>
    </div>
  )
}
const RecenterAutomatically = ({ lat, lng }: any) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    map.setZoom(10)
  }, [lat, lng])
  return null
}
