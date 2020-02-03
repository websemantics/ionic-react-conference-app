import { getUserData, setIsLoggedInData, setUsernameData, setHasSeenTutorialData } from '../dataApi.js'

export const loadUserData = () => async (dispatch) => {
  dispatch(setLoading(true))
  const data = await getUserData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}
export const setLoading = (isLoading) => ({
  type: 'set-user-loading',
  isLoading
})
export const setData = (data) => ({
  type: 'set-user-data',
  data
})
export const logoutUser = () => async (dispatch) => {
  await setIsLoggedInData(false)
  dispatch(setUsername())
}
export const setIsLoggedIn = (loggedIn) => async (dispatch) => {
  await setIsLoggedInData(loggedIn)
  return {
    type: 'set-is-loggedin',
    loggedIn
  }
}
export const setUsername = (username) => async (dispatch) => {
  await setUsernameData(username)
  return {
    type: 'set-username',
    username
  }
}
export const setHasSeenTutorial = (hasSeenTutorial) => async (dispatch) => {
  await setHasSeenTutorialData(hasSeenTutorial)
  return {
    type: 'set-has-seen-tutorial',
    hasSeenTutorial
  }
}
export const setDarkMode = (darkMode) => ({
  type: 'set-dark-mode',
  darkMode
})
