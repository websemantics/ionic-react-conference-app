export function combineReducers(reducers) {
  const combinedReducer = (state, action) => {
    const newState = {}
    const keys = Object.keys(reducers)
    keys.forEach(key => {
      const result = reducers[key](state[key], action)
      newState[key] = result || state[key]
    })
    return newState
  }
  return combinedReducer
}
