import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react'
import { setIsLoggedIn, setUsername } from '../data/user/user.actions.js'
import { connect } from '../data/connect.js'

const Login = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const login = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!username) {
      setUsernameError(true)
    }
    if (!password) {
      setPasswordError(true)
    }
    if (username && password) {
      await setIsLoggedIn(true)
      await setUsernameAction(username)
      history.push('/tabs/schedule', { direction: 'none' })
    }
  }
  return (React.createElement(IonPage, { id: "signup-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "Signup"))),
    React.createElement(IonContent, null,
      React.createElement("div", { className: "login-logo" },
        React.createElement("img", { src: "assets/img/appicon.svg", alt: "Ionic logo" })),
      React.createElement("form", { noValidate: true, onSubmit: login },
        React.createElement(IonList, null,
          React.createElement(IonItem, null,
            React.createElement(IonLabel, { position: "stacked", color: "primary" }, "Username"),
            React.createElement(IonInput, {
              name: "username", type: "text", value: username, spellCheck: false, autocapitalize: "off", onIonChange: e => {
                setUsername(e.detail.value)
                setUsernameError(false)
              }, required: true
            })),
          formSubmitted && usernameError && React.createElement(IonText, { color: "danger" },
            React.createElement("p", { className: "ion-padding-start" }, "Username is required")),
          React.createElement(IonItem, null,
            React.createElement(IonLabel, { position: "stacked", color: "primary" }, "Password"),
            React.createElement(IonInput, {
              name: "password", type: "password", value: password, onIonChange: e => {
                setPassword(e.detail.value)
                setPasswordError(false)
              }
            })),
          formSubmitted && passwordError && React.createElement(IonText, { color: "danger" },
            React.createElement("p", { className: "ion-padding-start" }, "Password is required"))),
        React.createElement(IonRow, null,
          React.createElement(IonCol, null,
            React.createElement(IonButton, { type: "submit", expand: "block" }, "Create")))))))
}

export default connect({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
