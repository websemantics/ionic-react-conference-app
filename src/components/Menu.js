import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonTitle, IonToolbar, IonToggle } from '@ionic/react'
import { calendar, contacts, hammer, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons'
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from '../data/connect.js'
import { setDarkMode } from '../data/user/user.actions.js'

const routes = {
  appPages: [
    { title: 'Schedule', path: '/tabs/schedule', icon: calendar },
    { title: 'Speakers', path: '/tabs/speakers', icon: contacts },
    { title: 'Map', path: '/tabs/map', icon: map },
    { title: 'About', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
}

const Menu = ({ darkMode, history, isAuthenticated, setDarkMode }) => {
  const [disableMenu, setDisableMenu] = useState(false)
  function renderlistItems(list) {
    return list
      .filter(route => !!route.path)
      .map(p => (React.createElement(IonMenuToggle, { key: p.title, "auto-hide": "false" },
        React.createElement(IonItem, { button: true, routerLink: p.path, routerDirection: "none" },
          React.createElement(IonIcon, { slot: "start", icon: p.icon }),
          React.createElement(IonLabel, null, p.title)))))
  }
  return (React.createElement(IonMenu, { type: "overlay", disabled: disableMenu, contentId: "main" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonTitle, null, "Menu"))),
    React.createElement(IonContent, { class: "outer-content" },
      React.createElement(IonList, null,
        React.createElement(IonListHeader, null, "Navigate"),
        renderlistItems(routes.appPages)),
      React.createElement(IonList, null,
        React.createElement(IonListHeader, null, "Account"),
        isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)),
      React.createElement(IonList, null,
        React.createElement(IonListHeader, null, "Tutorial"),
        React.createElement(IonItem, {
          onClick: () => {
            setDisableMenu(true)
            history.push('/tutorial')
          }
        },
          React.createElement(IonIcon, { slot: "start", icon: hammer }),
          "Show Tutorial")),
      React.createElement(IonList, null,
        React.createElement(IonItem, null,
          React.createElement(IonLabel, null, "Dark Theme"),
          React.createElement(IonToggle, { checked: darkMode, onClick: () => setDarkMode(!darkMode) }))))))
}

export default connect({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
