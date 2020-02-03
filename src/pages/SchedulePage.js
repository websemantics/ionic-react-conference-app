import React, { useState, useRef } from 'react'
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'
import { options } from 'ionicons/icons'
import { connect } from '../data/connect.js'
import SessionList from '../components/SessionList.js'
import SessionListFilter from '../components/SessionListFilter.js'
import * as selectors from '../data/selectors.js'
import { setSearchText } from '../data/sessions/sessions.actions.js'
import ShareSocialFab from '../components/ShareSocialFab.js'

const SchedulePage = ({ favoriteGroups, sessionGroups, setSearchText, mode }) => {
  const [segment, setSegment] = useState('all')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const ionRefresherRef = useRef(null)
  const [showCompleteToast, setShowCompleteToast] = useState(false)
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current.complete()
      setShowCompleteToast(true)
    }, 2500)
  }
  return (React.createElement(IonPage, { id: "schedule-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonSegment, { onIonChange: (e) => setSegment(e.detail.value) },
          React.createElement(IonSegmentButton, { value: "all", checked: segment === 'all' }, "All"),
          React.createElement(IonSegmentButton, { value: "favorites", checked: segment === 'favorites' }, "Favorites")),
        React.createElement(IonButtons, { slot: "end" },
          React.createElement(IonButton, { onClick: () => setShowFilterModal(true) }, mode === 'ios' ? 'Filter' : React.createElement(IonIcon, { icon: options, slot: "icon-only" })))),
      React.createElement(IonToolbar, null,
        React.createElement(IonSearchbar, { placeholder: "Search", onIonChange: (e) => setSearchText(e.detail.value) }))),
    React.createElement(IonContent, null,
      React.createElement(IonRefresher, { slot: "fixed", ref: ionRefresherRef, onIonRefresh: doRefresh },
        React.createElement(IonRefresherContent, null)),
      React.createElement(IonToast, { isOpen: showCompleteToast, message: "Refresh complete", duration: 2000, onDidDismiss: () => setShowCompleteToast(false) }),
      React.createElement(SessionList, { sessionGroups: sessionGroups, listType: segment, hide: segment === 'favorites' }),
      React.createElement(SessionList, { sessionGroups: favoriteGroups, listType: segment, hide: segment === 'all' })),
    React.createElement(IonModal, { isOpen: showFilterModal, onDidDismiss: () => setShowFilterModal(false) },
      React.createElement(SessionListFilter, { onDismissModal: () => setShowFilterModal(false) })),
    React.createElement(ShareSocialFab, null)))
}
export default connect({
  mapStateToProps: (state) => ({
    sessionGroups: selectors.getGroupedSessions(state),
    favoriteGroups: selectors.getGroupedFavorites(state),
    mode: getConfig().get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(SchedulePage)
})
