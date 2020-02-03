import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react'
import { calendar, pin, more } from 'ionicons/icons'
import AboutPopover from '../components/AboutPopover.js'

const About = () => {
  const [showPopover, setShowPopover] = useState(false)
  const [popoverEvent, setPopoverEvent] = useState()
  const presentPopover = (e) => {
    setPopoverEvent(e.nativeEvent)
    setShowPopover(true)
  }
  const conferenceDate = '2047-05-17'
  return (React.createElement(IonPage, { id: "about-page" },
    React.createElement(IonHeader, null,
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "start" },
          React.createElement(IonMenuButton, null)),
        React.createElement(IonTitle, null, "About"),
        React.createElement(IonButtons, { slot: "end" },
          React.createElement(IonButton, { "icon-only": true, onClick: presentPopover },
            React.createElement(IonIcon, { slot: "icon-only", icon: more }))))),
    React.createElement(IonContent, null,
      React.createElement("div", { className: "about-header" },
        React.createElement("img", { src: "assets/img/ionic-logo-white.svg", alt: "ionic logo" })),
      React.createElement("div", { className: "about-info" },
        React.createElement("h4", { className: "ion-padding-start" }, "Ionic Conference"),
        React.createElement(IonList, { lines: "none" },
          React.createElement(IonItem, null,
            React.createElement(IonIcon, { icon: calendar, slot: "start" }),
            React.createElement(IonLabel, { position: "stacked" }, "Date"),
            React.createElement(IonDatetime, { displayFormat: "MMM DD, YYYY", max: "2056", value: conferenceDate })),
          React.createElement(IonItem, null,
            React.createElement(IonIcon, { icon: pin, slot: "start" }),
            React.createElement(IonLabel, { position: "stacked" }, "Location"),
            React.createElement(IonSelect, null,
              React.createElement(IonSelectOption, { value: "madison", selected: true }, "Madison, WI"),
              React.createElement(IonSelectOption, { value: "austin" }, "Austin, TX"),
              React.createElement(IonSelectOption, { value: "chicago" }, "Chicago, IL"),
              React.createElement(IonSelectOption, { value: "seattle" }, "Seattle, WA")))),
        React.createElement("p", { className: "ion-padding-start ion-padding-end" }, "The Ionic Conference is a one-day conference featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic 2. This includes migrating apps from Ionic 1 to Ionic 2, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 2. Tickets are completely sold out, and we\u2019re expecting more than 1000 developers \u2013 making this the largest Ionic conference ever!"))),
    React.createElement(IonPopover, { isOpen: showPopover, event: popoverEvent, onDidDismiss: () => setShowPopover(false) },
      React.createElement(AboutPopover, { dismiss: () => setShowPopover(false) }))))
}

export default React.memo(About)
