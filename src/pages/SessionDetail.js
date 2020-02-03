import React from 'react'
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react'
import { withRouter } from 'react-router'
import { starOutline, star, share, cloudDownload } from 'ionicons/icons'
import { connect } from '../data/connect.js'
import * as selectors from '../data/selectors.js'
import { Time } from '../components/Time.js'
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions.js';

const SessionDetail = ({ session, addFavorite, removeFavorite, favoriteSessions }) => {
  if (!session) {
    return React.createElement("div", null, "Session not found")
  }
  const isFavorite = favoriteSessions.indexOf(session.id) > -1
  const toggleFavorite = () => {
    isFavorite ? removeFavorite(session.id) : addFavorite(session.id)
  }
  const shareSession = () => { }
  const sessionClick = (text) => {
    console.log(`Clicked ${text}`)
  }
  return (React.createElement(IonPage, { id: "session-detail-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonBackButton, { defaultHref: "/tabs/schedule" })),
        React.createElement(IonButtons, { slot: "end" },
          React.createElement(IonButton, { onClick: () => toggleFavorite() }, isFavorite ?
            React.createElement(IonIcon, { slot: "icon-only", icon: star }) :
            React.createElement(IonIcon, { slot: "icon-only", icon: starOutline })),
          React.createElement(IonButton, { onClick: () => shareSession },
            React.createElement(IonIcon, { slot: "icon-only", icon: share }))))),
    React.createElement(IonContent, null,
      React.createElement("div", { className: "ion-padding" },
        React.createElement("h1", null, session.name),
        session.tracks.map(track => (React.createElement("span", { key: track, className: `session-track-${track.toLowerCase()}` }, track))),
        React.createElement("p", null, session.description),
        React.createElement(IonText, { color: "medium" },
          React.createElement(Time, { date: session.dateTimeStart }),
          " \u2013 ",
          React.createElement(Time, { date: session.dateTimeEnd }),
          React.createElement("br", null),
          session.location)),
      React.createElement(IonList, null,
        React.createElement(IonItem, { onClick: () => sessionClick('watch'), button: true },
          React.createElement(IonLabel, { color: "primary" }, "Watch")),
        React.createElement(IonItem, { onClick: () => sessionClick('add to calendar'), button: true },
          React.createElement(IonLabel, { color: "primary" }, "Add to Calendar")),
        React.createElement(IonItem, { onClick: () => sessionClick('mark as unwatched'), button: true },
          React.createElement(IonLabel, { color: "primary" }, "Mark as Unwatched")),
        React.createElement(IonItem, { onClick: () => sessionClick('download video'), button: true },
          React.createElement(IonLabel, { color: "primary" }, "Download Video"),
          React.createElement(IonIcon, { slot: "end", color: "primary", size: "small", icon: cloudDownload })),
        React.createElement(IonItem, { onClick: () => sessionClick('leave feedback'), button: true },
          React.createElement(IonLabel, { color: "primary" }, "Leave Feedback"))))))
}
export default connect({
  mapStateToProps: (state, OwnProps) => ({
    session: selectors.getSession(state, OwnProps),
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(SessionDetail)
})
