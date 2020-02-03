import { getConfData } from '../dataApi.js'

export const loadConfData = () => async (dispatch) => {
  dispatch(setLoading(true))
  const data = await getConfData()
  dispatch(setData(data))
  dispatch(setLoading(false))
}
export const setLoading = (isLoading) => ({
  type: 'set-conf-loading',
  isLoading
})
export const setData = (data) => ({
  type: 'set-conf-data',
  data
})
export const addFavorite = (sessionId) => ({
  type: 'add-favorite',
  sessionId
})
export const removeFavorite = (sessionId) => ({
  type: 'remove-favorite',
  sessionId
})
export const updateFilteredTracks = (filteredTracks) => ({
  type: 'update-filtered-tracks',
  filteredTracks
})
export const setSearchText = (searchText) => ({
  type: 'set-search-text',
  searchText
})
