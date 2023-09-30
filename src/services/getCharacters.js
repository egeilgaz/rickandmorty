import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { GET_CHARACTERS } from '../graphql/queries/getCharacters'
import { useSelector } from 'react-redux'
import { client } from '../main'

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true
      state.error = null
    },
    fetchDataSuccess(state, action) {
      state.loading = false
      state.data = [...state.data, ...action.payload]
    },
    fetchDataFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    resetCharactersData(state) {
      state.data = []
    },
  },
})

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  resetCharactersData,
} = charactersSlice.actions

export const fetchCharactersData =
  (page, name) => async (dispatch) => {
    //graphql ile istek atmak için
    try {
      dispatch(fetchDataStart())
      const response = await client.query({
        query: GET_CHARACTERS,
        variables: {
          page: page, //kaçıncı sayfa
          name: name, //filtre bilgisi
        },
      })
      dispatch(
        fetchDataSuccess(response.data.characters.results),
      )
    } catch (error) {
      dispatch(fetchDataFailure(error.message))
    }
  }

export const useCharacters = () => {
  //dışarıdan stateki datalara ulaşabilmek için
  const characters = useSelector(
    (state) => state.characters.data,
  )
  const loading = useSelector(
    (state) => state.characters.loading,
  )
  const error = useSelector(
    (state) => state.characters.error,
  )

  return { characters, loading, error }
}

export const store = configureStore({
  //store oluşturmak için
  reducer: {
    characters: charactersSlice.reducer,
  },
})
