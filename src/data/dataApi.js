import { Plugins } from '@capacitor/core'
const { Storage } = Plugins
const locationsUrl = './assets/data/locations.json'
const sessionsUrl = './assets/data/sessions.json'
const speakersUrl = './assets/data/speakers.json'
const HAS_LOGGED_IN = 'hasLoggedIn'
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial'
const USERNAME = 'username'

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(sessionsUrl),
    fetch(locationsUrl),
    fetch(speakersUrl)
  ])
  const sessions = await response[0].json()
  const locations = await response[1].json()
  const speakers = await response[2].json()
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort()
  const data = {
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })
  ])
  const isLoggedin = await response[0].value === 'true'
  const hasSeenTutorial = await response[1].value === 'true'
  const username = await response[2].value || undefined
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }
  return data
}
export const setIsLoggedInData = async (isLoggedIn) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) })
}
export const setHasSeenTutorialData = async (hasSeenTutorial) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) })
}
export const setUsernameData = async (username) => {
  if (!username) {
    await Storage.remove({ key: USERNAME })
  }
  else {
    await Storage.set({ key: USERNAME, value: username })
  }
}
