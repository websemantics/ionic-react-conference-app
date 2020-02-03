import { IonLoading, IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react"
import { share, logoVimeo, logoGoogleplus, logoTwitter, logoFacebook } from "ionicons/icons"
import React, { useState } from "react"

const ShareSocialFab = () => {
  const [loadingMessage, setLoadingMessage] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const openSocial = (network) => {
    setLoadingMessage(`Posting to ${network}`)
    setShowLoading(true)
  }
  return (React.createElement(React.Fragment, null,
    React.createElement(IonLoading, { isOpen: showLoading, message: loadingMessage, duration: 2000, spinner: "crescent", onDidDismiss: () => setShowLoading(false) }),
    React.createElement(IonFab, { slot: "fixed", vertical: "bottom", horizontal: "end" },
      React.createElement(IonFabButton, null,
        React.createElement(IonIcon, { icon: share })),
      React.createElement(IonFabList, { side: "top" },
        React.createElement(IonFabButton, { color: "vimeo", onClick: () => openSocial('Vimeo') },
          React.createElement(IonIcon, { icon: logoVimeo })),
        React.createElement(IonFabButton, { color: "google", onClick: () => openSocial('Google+') },
          React.createElement(IonIcon, { icon: logoGoogleplus })),
        React.createElement(IonFabButton, { color: "twitter", onClick: () => openSocial('Twitter') },
          React.createElement(IonIcon, { icon: logoTwitter })),
        React.createElement(IonFabButton, { color: "facebook", onClick: () => openSocial('Facebook') },
          React.createElement(IonIcon, { icon: logoFacebook }))))))
}

export default ShareSocialFab
