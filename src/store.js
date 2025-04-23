// File: src/store.js
export function initialStore() {
  return { favorites: JSON.parse(localStorage.getItem('favorites') || '[]') }
}

export default function storeReducer(state, { type, payload }) {
  if (type === 'FAVORITES_TOGGLE') {
    const exists = state.favorites.some(f => f.id === payload.id)
    const favorites = exists
      ? state.favorites.filter(f => f.id !== payload.id)
      : [...state.favorites, payload]
    localStorage.setItem('favorites', JSON.stringify(favorites))
    return { ...state, favorites }
  }
  return state
}
