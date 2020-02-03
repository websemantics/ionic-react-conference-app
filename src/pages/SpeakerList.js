import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonGrid, IonRow, IonCol } from '@ionic/react'
import SpeakerItem from '../components/SpeakerItem.js'
import { connect } from '../data/connect.js'
import * as selectors from '../data/selectors.js'

const SpeakerList = ({ speakers, speakerSessions }) => {
  return (React.createElement(IonPage, { id: "speaker-list" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "Speakers"))),
    React.createElement(IonContent, { className: `outer-content` },
      React.createElement(IonList, null,
        React.createElement(IonGrid, { fixed: true },
          React.createElement(IonRow, { "align-items-stretch": true }, speakers.map(speaker => (React.createElement(IonCol, { size: "12", "size-md": "6", key: speaker.id },
            React.createElement(SpeakerItem, { key: speaker.id, speaker: speaker, sessions: speakerSessions[speaker.id] }))))))))))
}

export default connect({
  mapStateToProps: (state) => ({
    speakers: selectors.getSpeakers(state),
    speakerSessions: selectors.getSpeakerSessions(state)
  }),
  component: React.memo(SpeakerList)
})
