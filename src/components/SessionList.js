import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert } from '@ionic/react'
import React, { useState, useCallback } from 'react'
import SessionListItem from './SessionListItem.js'
import { Time } from '../components/Time.js'
import { connect } from '../data/connect.js'
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions.js';

const SessionList = ({ addFavorite, removeFavorite, favoriteSessions, hide, sessionGroups, listType }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertHeader, setAlertHeader] = useState('')
  const [alertButtons, setAlertButtons] = useState([])
  const handleShowAlert = useCallback((header, buttons) => {
    setAlertHeader(header)
    setAlertButtons(buttons)
    setShowAlert(true)
  }, [])
  if (sessionGroups.length === 0 && !hide) {
    return (React.createElement(IonList, null,
      React.createElement(IonListHeader, null, "No Sessions Found")))
  }
  return (React.createElement(React.Fragment, null,
    React.createElement(IonList, { style: hide ? { display: 'none' } : {} }, sessionGroups.map((group, index) => (React.createElement(IonItemGroup, { key: `group-${index}` },
      React.createElement(IonItemDivider, { sticky: true },
        React.createElement(IonLabel, null,
          React.createElement(Time, { date: group.startTime }))),
      group.sessions.map((session, sessionIndex) => (React.createElement(SessionListItem, { onShowAlert: handleShowAlert, isFavorite: favoriteSessions.indexOf(session.id) > -1, onAddFavorite: addFavorite, onRemoveFavorite: removeFavorite, key: `group-${index}-${sessionIndex}`, session: session, listType: listType }))))))),
    React.createElement(IonAlert, { isOpen: showAlert, header: alertHeader, buttons: alertButtons, onDidDismiss: () => setShowAlert(false) })))
}

export default connect({
  mapStateToProps: (state) => ({
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: SessionList
})
