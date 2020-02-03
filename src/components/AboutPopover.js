import React from 'react'
import { IonList, IonItem, IonLabel } from '@ionic/react';

const AboutPopover = ({ dismiss }) => {
  const close = (url) => {
    window.open(url, '_blank')
    dismiss()
  }

  return (React.createElement(IonList, null,
    React.createElement(IonItem, { button: true, onClick: () => close('https://ionicframework.com/getting-started') },
      React.createElement(IonLabel, null, "Learn Ionic")),
    React.createElement(IonItem, { button: true, onClick: () => close('https://ionicframework.com/docs/react') },
      React.createElement(IonLabel, null, "Documentation")),
    React.createElement(IonItem, { button: true, onClick: () => close('https://showcase.ionicframework.com') },
      React.createElement(IonLabel, null, "Showcase")),
    React.createElement(IonItem, { button: true, onClick: () => close('https://github.com/ionic-team/ionic') },
      React.createElement(IonLabel, null, "GitHub Repo")),
    React.createElement(IonItem, { button: true, onClick: dismiss },
      React.createElement(IonLabel, null, "Support"))))
}

export default AboutPopover
