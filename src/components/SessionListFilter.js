import React from 'react'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonFooter, IonIcon } from '@ionic/react'
import { logoAngular, call, document, logoIonic, hammer, restaurant, cog, colorPalette, construct, compass } from 'ionicons/icons'
import { connect } from '../data/connect.js'
import { updateFilteredTracks } from '../data/sessions/sessions.actions.js'

const SessionListFilter = ({ allTracks, filteredTracks, onDismissModal, updateFilteredTracks }) => {
  const toggleTrackFilter = (track) => {
    if (filteredTracks.indexOf(track) > -1) {
      updateFilteredTracks(filteredTracks.filter(x => x !== track))
    }
    else {
      updateFilteredTracks([...filteredTracks, track])
    }
  }
  const handleDeselectAll = () => {
    updateFilteredTracks([])
  }
  const handleSelectAll = () => {
    updateFilteredTracks([...allTracks])
  }
  const iconMap = {
    'Angular': logoAngular,
    'Documentation': document,
    'Food': restaurant,
    'Ionic': logoIonic,
    'Tooling': hammer,
    'Design': colorPalette,
    'Services': cog,
    'Workshop': construct,
    'Navigation': compass,
    'Communication': call
  }
  return (React.createElement(React.Fragment, null,
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonTitle, null, "Filter Sessions"),
        React.createElement(IonButtons, { slot: "end" },
          React.createElement(IonButton, { onClick: onDismissModal, strong: true }, "Done")))),
    React.createElement(IonContent, { class: "outer-content" },
      React.createElement(IonList, null,
        React.createElement(IonListHeader, null, "Tracks"),
        allTracks.map((track, index) => (React.createElement(IonItem, { key: track },
          React.createElement(IonIcon, { className: "filter-icon", icon: iconMap[track], color: "medium" }),
          React.createElement(IonLabel, null, track),
          React.createElement(IonToggle, { onClick: () => toggleTrackFilter(track), checked: filteredTracks.indexOf(track) !== -1, color: "success", value: track })))))),
    React.createElement(IonFooter, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonButton, { onClick: handleDeselectAll }, "Deselect All")),
        React.createElement(IonButtons, { slot: "end" },
          React.createElement(IonButton, { onClick: handleSelectAll }, "Select All"))))))
}

export default connect({
  mapStateToProps: (state) => ({
    allTracks: state.data.allTracks,
    filteredTracks: state.data.filteredTracks
  }),
  mapDispatchToProps: {
    updateFilteredTracks
  },
  component: SessionListFilter
})
