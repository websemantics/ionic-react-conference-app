import { combineReducers } from './combineReducers.js'
import { sessionsReducer } from './sessions/sessions.reducer.js'
import { userReducer } from './user/user.reducer.js'

export const initialState = {
  data: {
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  }
}

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
})
