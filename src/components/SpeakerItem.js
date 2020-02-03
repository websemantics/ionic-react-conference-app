import React, { useState } from 'react'
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet } from '@ionic/react'
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons'

const SpeakerItem = ({ speaker, sessions }) => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionSheetButtons, setActionSheetButtons] = useState([])
  const [actionSheetHeader, setActionSheetHeader] = useState('')
  function openSpeakerShare(speaker) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked')
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked')
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked')
        }
      }
    ])
    setActionSheetHeader(`Share ${speaker.name}`)
    setShowActionSheet(true)
  }
  function openContact(speaker) {
    setActionSheetButtons([
      {
        text: `Email ( ${speaker.email} )`,
        handler: () => {
          window.open('mailto:' + speaker.email)
        }
      },
      {
        text: `Call ( ${speaker.phone} )`,
        handler: () => {
          window.open('tel:' + speaker.phone)
        }
      }
    ])
    setActionSheetHeader(`Share ${speaker.name}`)
    setShowActionSheet(true)
  }
  return (React.createElement(React.Fragment, null,
    React.createElement(IonCard, { className: "speaker-card" },
      React.createElement(IonCardHeader, null,
        React.createElement(IonItem, { button: true, detail: false, routerLink: `/tabs/speakers/${speaker.id}`, lines: "none" },
          React.createElement(IonAvatar, { slot: "start" },
            React.createElement("img", { src: process.env.PUBLIC_URL + speaker.profilePic, alt: "Speaker profile pic" })),
          speaker.name)),
      React.createElement(IonCardContent, { class: "outer-content" },
        React.createElement(IonList, null,
          sessions.map(session => (React.createElement(IonItem, { routerLink: `/tabs/speakers/sessions/${session.id}`, key: session.name },
            React.createElement("h3", null, session.name)))),
          React.createElement(IonItem, { button: true, routerLink: `/tabs/speakers/${speaker.id}` },
            React.createElement("h3", null,
              "About ",
              speaker.name)))),
      React.createElement(IonRow, { "justify-content-center": true },
        React.createElement(IonCol, { "text-left": true, size: "4" },
          React.createElement(IonButton, { fill: "clear", size: "small", color: "primary", href: `https://www.twitter.com/${speaker.twitter}`, target: "_blank" },
            React.createElement(IonIcon, { slot: "start", icon: logoTwitter }),
            "Tweet")),
        React.createElement(IonCol, { "text-left": true, size: "4" },
          React.createElement(IonButton, { fill: "clear", size: "small", color: "primary", onClick: () => openSpeakerShare(speaker) },
            React.createElement(IonIcon, { slot: "start", icon: shareAlt }),
            "Share")),
        React.createElement(IonCol, { "text-left": true, size: "4" },
          React.createElement(IonButton, { fill: "clear", size: "small", color: "primary", onClick: () => openContact(speaker) },
            React.createElement(IonIcon, { slot: "start", icon: chatboxes }),
            "Contact")))),
    React.createElement(IonActionSheet, { isOpen: showActionSheet, header: actionSheetHeader, onDidDismiss: () => setShowActionSheet(false), buttons: actionSheetButtons })))
}

export default SpeakerItem
