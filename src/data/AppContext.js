import React, { createContext, useReducer } from 'react'
import { initialState, reducers } from './state.js'

export const AppContext = createContext({
  state: initialState,
  dispatch: () => undefined
})
export const AppContextProvider = (props => {
  const [store, dispatch] = useReducer(reducers, initialState)
  return (React.createElement(AppContext.Provider, {
    value: {
      state: store,
      dispatch
    }
  }, props.children))
})
