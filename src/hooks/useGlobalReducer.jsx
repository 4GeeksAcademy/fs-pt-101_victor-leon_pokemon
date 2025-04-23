// File: src/hooks/useGlobalReducer.jsx
import React, { createContext, useContext, useReducer, useCallback } from 'react'
import storeReducer, { initialStore } from '../store'

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore())
  return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>
}

export default function useGlobalReducer() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useGlobalReducer must be used within StoreProvider')
  return ctx
}

export const useToggleFavorite = () => {
  const { dispatch } = useGlobalReducer()
  return useCallback(item => dispatch({ type: 'FAVORITES_TOGGLE', payload: item }), [dispatch])
}
