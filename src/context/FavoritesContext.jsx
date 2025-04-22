// File: src/context/FavoritesContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const FavoritesContext = createContext()

function reducer(state, { type, payload }) {
  if (type === 'TOGGLE') {
    return state.some(f => f.id === payload.id)
      ? state.filter(f => f.id !== payload.id)
      : [...state, payload]
  }
  return state
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(reducer, [])
  const toggleFavorite = item => dispatch({ type: 'TOGGLE', payload: item })
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
