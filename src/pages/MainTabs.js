import React from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import { calendar, contacts, map, informationCircle } from 'ionicons/icons'
import SchedulePage from './SchedulePage.js'
import SpeakerList from './SpeakerList.js'
import SpeakerDetail from './SpeakerDetail.js'
import SessionDetail from './SessionDetail.js'
import MapView from './MapView.js'
import About from './About.js'

const MainTabs = () => {
  return (React.createElement(IonTabs, null,
    React.createElement(IonRouterOutlet, null,
      React.createElement(Redirect, { exact: true, path: "/tabs", to: "/tabs/schedule" }),
      React.createElement(Route, { path: "/tabs/schedule", render: () => React.createElement(SchedulePage, null), exact: true }),
      React.createElement(Route, { path: "/tabs/speakers", render: () => React.createElement(SpeakerList, null), exact: true }),
      React.createElement(Route, { path: "/tabs/speakers/:id", component: SpeakerDetail, exact: true }),
      React.createElement(Route, { path: "/tabs/schedule/:id", component: SessionDetail }),
      React.createElement(Route, { path: "/tabs/speakers/sessions/:id", component: SessionDetail }),
      React.createElement(Route, { path: "/tabs/map", render: () => React.createElement(MapView, null), exact: true }),
      React.createElement(Route, { path: "/tabs/about", render: () => React.createElement(About, null), exact: true })),
    React.createElement(IonTabBar, { slot: "bottom" },
      React.createElement(IonTabButton, { tab: "schedule", href: "/tabs/schedule" },
        React.createElement(IonIcon, { icon: calendar }),
        React.createElement(IonLabel, null, "Schedule")),
      React.createElement(IonTabButton, { tab: "speakers", href: "/tabs/speakers" },
        React.createElement(IonIcon, { icon: contacts }),
        React.createElement(IonLabel, null, "Speakers")),
      React.createElement(IonTabButton, { tab: "map", href: "/tabs/map" },
        React.createElement(IonIcon, { icon: map }),
        React.createElement(IonLabel, null, "Map")),
      React.createElement(IonTabButton, { tab: "about", href: "/tabs/about" },
        React.createElement(IonIcon, { icon: informationCircle }),
        React.createElement(IonLabel, null, "About")))))
}
export default MainTabs
