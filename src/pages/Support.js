import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonText, IonTextarea, IonToast } from '@ionic/react'
import { connect } from '../data/connect.js'

const Support = () => {
  const [message, setMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const send = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!message) {
      setMessageError(true)
    }
    if (message) {
      setMessage('')
      setShowToast(true)
    }
  }
  return (React.createElement(IonPage, { id: "support-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "Support"))),
    React.createElement(IonContent, null,
      React.createElement("div", { className: "login-logo" },
        React.createElement("img", { src: "assets/img/appicon.svg", alt: "Ionic logo" })),
      React.createElement("form", { noValidate: true, onSubmit: send },
        React.createElement(IonList, null,
          React.createElement(IonItem, null,
            React.createElement(IonLabel, { position: "stacked", color: "primary" }, "Enter your support message below"),
            React.createElement(IonTextarea, { name: "message", value: message, spellCheck: false, autocapitalize: "off", rows: 6, onIonChange: e => setMessage(e.detail.value), required: true })),
          formSubmitted && messageError && React.createElement(IonText, { color: "danger" },
            React.createElement("p", { className: "ion-padding-start" }, "Support message is required"))),
        React.createElement(IonRow, null,
          React.createElement(IonCol, null,
            React.createElement(IonButton, { type: "submit", expand: "block" }, "Submit"))))),
    React.createElement(IonToast, { isOpen: showToast, duration: 3000, message: "Your support request has been sent", onDidDismiss: () => setShowToast(false) })))
}

export default connect({
  component: Support
})
