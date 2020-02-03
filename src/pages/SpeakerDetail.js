import React from 'react'
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { logoTwitter, logoGithub, logoInstagram } from 'ionicons/icons'
import { connect } from '../data/connect.js'
import * as selectors from '../data/selectors.js';

const SpeakerDetail = ({ speaker }) => {
  if (!speaker) {
    return React.createElement("div", null, "Speaker not found")
  }
  return (React.createElement(IonPage, { id: "speaker-detail" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonBackButton, { defaultHref: "/tabs/speakers" })),
        React.createElement(IonTitle, null, speaker.name))),
    React.createElement(IonContent, { className: "ion-padding speaker-detail speaker-page-list" },
      React.createElement("div", { className: "ion-text-center" },
        React.createElement("img", { src: speaker.profilePic, alt: speaker.name }),
        React.createElement("br", null),
        React.createElement(IonButton, { fill: "clear", size: "small", color: "twitter" },
          React.createElement(IonIcon, { icon: logoTwitter, slot: "icon-only" })),
        React.createElement(IonButton, { fill: "clear", size: "small", color: "github" },
          React.createElement(IonIcon, { icon: logoGithub, slot: "icon-only" })),
        React.createElement(IonButton, { fill: "clear", size: "small", color: "instagram" },
          React.createElement(IonIcon, { icon: logoInstagram, slot: "icon-only" }))),
      React.createElement("p", null, speaker.about))))
}
export default connect({
  mapStateToProps: (state, ownProps) => ({
    speaker: selectors.getSpeaker(state, ownProps)
  }),
  component: SpeakerDetail
})
