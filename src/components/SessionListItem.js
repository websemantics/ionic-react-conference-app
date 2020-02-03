import React, { useRef } from 'react'
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption } from '@ionic/react'
import { Time } from './Time.js'

const SessionListItem = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, session, listType }) => {
  const ionItemSlidingRef = useRef(null)
  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close()
  }
  const removeFavoriteSession = () => {
    onAddFavorite(session.id)
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(session.id)
          dismissAlert()
        }
      }
    ])
  }
  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession()
    }
    else {
      // remember this session as a user favorite
      onAddFavorite(session.id)
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ])
    }
  }
  return (React.createElement(IonItemSliding, { ref: ionItemSlidingRef, class: 'track-' + session.tracks[0].toLowerCase() },
    React.createElement(IonItem, { routerLink: `/tabs/schedule/${session.id}` },
      React.createElement(IonLabel, null,
        React.createElement("h3", null, session.name),
        React.createElement("p", null,
          React.createElement(Time, { date: session.dateTimeStart }),
          " \u2014\u00A0",
          React.createElement(Time, { date: session.dateTimeEnd }),
          " \u2014\u00A0",
          session.location))),
    React.createElement(IonItemOptions, null, listType === "favorites" ?
      React.createElement(IonItemOption, { color: "danger", onClick: () => removeFavoriteSession() }, "Remove")
      :
      React.createElement(IonItemOption, { color: "favorite", onClick: addFavoriteSession }, "Favorite"))))
}

export default React.memo(SessionListItem)
