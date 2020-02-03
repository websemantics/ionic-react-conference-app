import React, { useRef, useEffect } from 'react'

const Map = ({ mapCenter, locations }) => {
  const mapEle = useRef(null)
  const map = useRef()
  useEffect(() => {
    map.current = new google.maps.Map(mapEle.current, {
      center: {
        lat: mapCenter.lat,
        lng: mapCenter.lng
      },
      zoom: 16
    })
    addMarkers()
    google.maps.event.addListenerOnce(map.current, 'idle', () => {
      if (mapEle.current) {
        mapEle.current.classList.add('show-map')
      }
    })
    function addMarkers() {
      locations.forEach((markerData) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        })
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData.lat, markerData.lng),
          map: map.current,
          title: markerData.name
        })
        marker.addListener('click', () => {
          infoWindow.open(map.current, marker)
        })
      })
    }
  }, [mapCenter, locations])
  return (React.createElement("div", { ref: mapEle, className: "map-canvas" }))
}

export default Map
