import React from 'react'
import { Redirect } from 'react-router'
import { connect } from '../data/connect.js'

const HomeOrTutorial = ({ hasSeenTutorial }) => {
  return hasSeenTutorial ? React.createElement(Redirect, { to: "/tabs/schedule" }) : React.createElement(Redirect, { to: "/tutorial" })
}

export default connect({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrTutorial
})
