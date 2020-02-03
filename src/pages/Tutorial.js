import React, { useState, useRef } from 'react'
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon } from '@ionic/react'
import { arrowForward } from 'ionicons/icons'
import { setHasSeenTutorial } from '../data/user/user.actions.js'
import { connect } from '../data/connect.js'

const Tutorial = ({ history, setHasSeenTutorial }) => {
  const [showSkip, setShowSkip] = useState(true)
  const slideRef = useRef(null)
  const startApp = async () => {
    await setHasSeenTutorial(true)
    history.push('/tabs/schedule', { direction: 'none' })
  }
  const handleSlideChangeStart = () => {
    slideRef.current.isEnd().then(isEnd => setShowSkip(!isEnd))
  }
  return (React.createElement(IonPage, { id: "tutorial-page" },
    React.createElement(IonHeader, { "no-border": true },
      React.createElement(IonToolbar, null,
        React.createElement(IonButtons, { slot: "end" }, showSkip && React.createElement(IonButton, { color: 'primary', onClick: startApp }, "Skip")))),
    React.createElement(IonContent, { fullscreen: true },
      React.createElement(IonSlides, { ref: slideRef, onIonSlideWillChange: handleSlideChangeStart, pager: false },
        React.createElement(IonSlide, null,
          React.createElement("img", { src: "assets/img/ica-slidebox-img-1.png", alt: "", className: "slide-image" }),
          React.createElement("h2", { className: "slide-title" },
            "Welcome to ",
            React.createElement("b", null, "ICA")),
          React.createElement("p", null,
            "The ",
            React.createElement("b", null, "ionic conference app"),
            " is a practical preview of the ionic framework in action, and a demonstration of proper code use.")),
        React.createElement(IonSlide, null,
          React.createElement("img", { src: "assets/img/ica-slidebox-img-2.png", alt: "", className: "slide-image" }),
          React.createElement("h2", { className: "slide-title" }, "What is Ionic?"),
          React.createElement("p", null,
            React.createElement("b", null, "Ionic Framework"),
            " is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.")),
        React.createElement(IonSlide, null,
          React.createElement("img", { src: "assets/img/ica-slidebox-img-3.png", alt: "", className: "slide-image" }),
          React.createElement("h2", { className: "slide-title" }, "What is Ionic Appflow?"),
          React.createElement("p", null,
            React.createElement("b", null, "Ionic Appflow"),
            " is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.")),
        React.createElement(IonSlide, null,
          React.createElement("img", { src: "assets/img/ica-slidebox-img-4.png", alt: "", className: "slide-image" }),
          React.createElement("h2", { className: "slide-title" }, "Ready to Play?"),
          React.createElement(IonButton, { fill: "clear", onClick: startApp },
            "Continue",
            React.createElement(IonIcon, { slot: "end", icon: arrowForward })))))))
}

export default connect({
  mapDispatchToProps: ({
    setHasSeenTutorial
  }),
  component: Tutorial
})
