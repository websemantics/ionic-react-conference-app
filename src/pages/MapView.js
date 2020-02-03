import React from 'react'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react'
import Map from '../components/Map.js'
import { connect } from '../data/connect.js'
import * as selectors from '../data/selectors.js'

const MapView = ({ locations, mapCenter }) => {
  return (React.createElement(IonPage, { id: "map-view" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "Map"))),
    React.createElement(IonContent, { class: "map-page" },
      React.createElement(Map, { locations: locations, mapCenter: mapCenter }))))
}
export default connect({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
})
