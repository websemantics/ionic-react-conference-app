import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react'
import { setUsername } from '../data/user/user.actions.js'
import { connect } from '../data/connect.js'

const Account = ({ setUsername, username }) => {
  const [showAlert, setShowAlert] = useState(false)
  const clicked = (text) => {
    console.log(`Clicked ${text}`)
  }
  return (React.createElement(IonPage, { id: "account-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "Account"))),
    React.createElement(IonContent, null, username &&
      (React.createElement("div", { className: "ion-padding-top ion-text-center" },
        React.createElement("img", { src: "https://www.gravatar.com/avatar?d=mm&s=140", alt: "avatar" }),
        React.createElement("h2", null, username),
        React.createElement(IonList, { inset: true },
          React.createElement(IonItem, { onClick: () => clicked('Update Picture') }, "Update Picture"),
          React.createElement(IonItem, { onClick: () => setShowAlert(true) }, "Change Username"),
          React.createElement(IonItem, { onClick: () => clicked('Change Password') }, "Change Password"),
          React.createElement(IonItem, { routerLink: "/support", routerDirection: "none" }, "Support"),
          React.createElement(IonItem, { routerLink: "/logout", routerDirection: "none" }, "Logout"))))),
    React.createElement(IonAlert, {
      isOpen: showAlert, header: "Change Username", buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data) => {
            setUsername(data.username)
          }
        }
      ], inputs: [
        {
          type: 'text',
          name: 'username',
          value: username,
          placeholder: 'username'
        }
      ], onDidDismiss: () => setShowAlert(false)
    })))
}
export default connect({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account
})
