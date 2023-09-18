import React, { useRef, useEffect, useState } from 'react'

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  GeoJSON,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import { useFocosCalor } from '../hooks/usefocosCalor'
import { GeoJsonObject } from 'geojson'
import { MapBoxModal } from '../components/mapbox/MapBoxModal'
import { mapsTypeStyle } from '../data/data'
import { generateUniqueKey } from '../utils/key_utils'
import { ButtonIcon } from '../components/widgets/buttons/ButtonIcons'
import { LatLngInt } from '../interfaces/countProvinceDepartamento.interface'

export const InteractiveMap = () => {
  const {
    loading,

    currentHeatSources,
    onChange,
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

  const [key, setKey] = useState(generateUniqueKey())
  useEffect(() => {
    setKey(generateUniqueKey())
  }, [currentHeatSources.heatResources])

  const [middlePosition, setMiddlePosition] = useState<LatLngInt>({
    latitude: currentHeatSources.middlePoint.coordinates.latitude ?? 0,
    longitude: currentHeatSources.middlePoint.coordinates.longitude ?? 0,
  })

  useEffect(() => {
    if (
      currentHeatSources.middlePoint.coordinates.latitude !== undefined ||
      currentHeatSources.middlePoint.coordinates.longitude !== undefined
    ) {
      setMiddlePosition(currentHeatSources.middlePoint.coordinates)
    }
    console.log(middlePosition)
  }, [currentHeatSources.middlePoint.coordinates])

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
  function setInfoMarkers() {
    const { type, ...rest } = currentHeatSources.heatResources
    return rest.features.map((marker) => {
      const marker2 = [marker.properties.latitude, marker.properties.longitude]
      return { marker2, title: JSON.stringify(marker.properties) }
    })
  }
  console.log(middlePosition)
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
        center={[middlePosition.latitude, middlePosition.longitude]}
        zoom={7}
        key={key}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {setInfoMarkers().map(({ marker2, title }, index) => (
          <Marker key={index} position={[marker2[0], marker2[1]]}>
            {/* <Popup>{title}</Popup> */}
            <Tooltip>{title}</Tooltip>
          </Marker>
        ))}

        <GeoJSON data={polyToGeoJson()} />
      </MapContainer>
    </div>
  )
}
const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  console.log(lat, lng)
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    map.setZoom(7)
  }, [lat, lng])
  return null
}
