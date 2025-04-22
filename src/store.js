// File: src/store.js
export function initialStore() {
  return { favorites: JSON.parse(localStorage.getItem('favorites') || '[]') }
}

export default function storeReducer(state, action) {
  if (action.type === 'FAVORITES_TOGGLE') {
    const exists = state.favorites.some(f => f.id === action.payload.id)
    const favs = exists
      ? state.favorites.filter(f => f.id !== action.payload.id)
      : [...state.favorites, action.payload]
    localStorage.setItem('favorites', JSON.stringify(favs))
    return { ...state, favorites: favs }
  }
  return state
}
