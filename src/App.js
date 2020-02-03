import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import Menu from './components/Menu.js'
import MainTabs from './pages/MainTabs.js'
import { connect } from './data/connect.js'
import { AppContextProvider } from './data/AppContext.js'
import { loadConfData } from './data/sessions/sessions.actions.js'
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions.js'
import Account from './pages/Account.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Support from './pages/Support.js'
import Tutorial from './pages/Tutorial.js'
import HomeOrTutorial from './components/HomeOrTutorial.js'

const App = () => {
  return (React.createElement(AppContextProvider, null,
    React.createElement(IonicAppConnected, null)))
}

const IonicApp = ({ darkMode, sessions, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {
  useEffect(() => {
    loadUserData()
    loadConfData()
  }, [])

  return (sessions.length === 0 ? (React.createElement("div", null)) : (React.createElement(IonApp, { className: `${darkMode ? 'dark-theme' : ''}` },
    React.createElement(IonReactHashRouter, null,
      React.createElement(IonSplitPane, { contentId: "main" },
        React.createElement(Menu, null),
        React.createElement(IonRouterOutlet, { id: "main" },
          React.createElement(Route, { path: "/tabs", component: MainTabs }),
          React.createElement(Route, { path: "/account", component: Account }),
          React.createElement(Route, { path: "/login", component: Login }),
          React.createElement(Route, { path: "/signup", component: Signup }),
          React.createElement(Route, { path: "/support", component: Support }),
          React.createElement(Route, { path: "/tutorial", component: Tutorial }),
          React.createElement(Route, {
            path: "/logout", render: () => {
              setIsLoggedIn(false)
              setUsername(undefined)
              return React.createElement(Redirect, { to: "/tabs" })
            }
          }),
          React.createElement(Route, { path: "/", component: HomeOrTutorial, exact: true })))))))
}

const IonicAppConnected = connect({
  mapStateToProps: (state) => ({ darkMode: state.user.darkMode, sessions: state.data.sessions }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
})

export default App
