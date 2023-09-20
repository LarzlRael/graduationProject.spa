import React, { useRef, useEffect, useState, useContext } from 'react'

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
import { initialCoordinates, mapsTypeStyle } from '../data/data'
import { generateUniqueKey } from '../utils/key_utils'
import { ButtonIcon } from '../components/widgets/buttons/ButtonIcons'
import { LatLngInt } from '../interfaces/countProvinceDepartamento.interface'
import MarkerClusterGroup from 'react-leaflet-cluster'

import PixiOverlay from 'react-leaflet-pixi-overlay'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext'

export const InteractiveMap = () => {
  const {
    loading,
    currentHeatSources,
    onChange,
    selecteDepartamentCopy,
    getHeatSources,
    stateArrMunProv,
    setChangeMapType,
    //query to find
    queryToFind,
    loadingNetworl,
  } = useFocosCalor()

  const {
    heatResources,

    middlePoint: { coordinates, poligono },
  } = currentHeatSources
  const {
    showOptions,
    setShowOptions,
    setShowProvinvicaMun,
    showProvMun,
    mapStyle,
    changeQueryOneFieldToFind,
  } = useContext(HeatSourcesContext)
  const [key, setKey] = useState(generateUniqueKey())
  useEffect(() => {
    setKey(generateUniqueKey())
  }, [heatResources])

  const [middlePosition, setMiddlePosition] = useState<LatLngInt>({
    latitude: coordinates.latitude ?? initialCoordinates.latitude,
    longitude: coordinates.longitude ?? initialCoordinates.longitude,
  })

  useEffect(() => {
    if (
      coordinates.latitude !== undefined ||
      coordinates.longitude !== undefined
    ) {
      setMiddlePosition(coordinates)
    }
  }, [coordinates])

  function convertToGeoJson(): GeoJsonObject {
    const { type, ...rest } = heatResources
    return {
      type: 'Point',
      ...rest,
    }
  }
  function polyToGeoJson(): GeoJsonObject {
    const { type, ...rest } = poligono
    return {
      type: 'MultiPolygon',
      ...rest,
    }
  }
  function setInfoMarkers() {
    const { type, ...rest } = heatResources
    return rest.features.map((marker) => {
      const marker2 = [marker.properties.latitude, marker.properties.longitude]
      return { marker2, title: JSON.stringify(marker.properties) }
    })
  }

  function setPixiOverlay() {
    const { type, ...rest } = heatResources
    return rest.features.map((marker, index) => ({
      id: index,
      position: [marker.properties.latitude, marker.properties.longitude],

      iconId: 'someIDUniqueToIcon',
      onClick: () => alert('marker clicked'),
      tooltip: JSON.stringify(marker.properties),
      customIcon:
        '<svg style="-webkit-filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));" xmlns="http://www.w3.org/2000/svg" fill="red" width="36" height="36" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>',
    }))
  }

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

        {setInfoMarkers().length > 100 ? (
          <MarkerClusterGroup chunkedLoading>
            {setInfoMarkers().map(({ marker2, title }, index) => (
              <Marker key={index} position={[marker2[0], marker2[1]]}>
                {/* <Popup>{title}</Popup> */}
                <Tooltip>{title}</Tooltip>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          setInfoMarkers().map(({ marker2, title }, index) => (
            <Marker key={index} position={[marker2[0], marker2[1]]}>
              {/* <Popup>{title}</Popup> */}
              <Tooltip>{title}</Tooltip>
            </Marker>
          ))
        )}

        <GeoJSON data={polyToGeoJson()} />
        <RecenterAutomatically
          lat={middlePosition.latitude}
          lng={middlePosition.longitude}
        />
        {/* <PixiOverlay markers={setPixiOverlay()} /> */}
      </MapContainer>
    </div>
  )
}
const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    map.setZoom(7)
  }, [lat, lng])
  return null
}
