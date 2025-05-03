import React, { createContext, useReducer, useContext, useCallback } from 'react'
import reducer, { initialStore } from '../store'

const StoreCtx = createContext()

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialStore())
  return <StoreCtx.Provider value={{ store, dispatch }}>{children}</StoreCtx.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreCtx)
  if (!ctx) throw new Error('useStore must be within StoreProvider')
  return ctx
}

export const useToggleFavorite = () => {
  const { dispatch } = useStore()
  return useCallback(item => dispatch({ type: 'TOGGLE_FAV', payload: item }), [dispatch])
}
