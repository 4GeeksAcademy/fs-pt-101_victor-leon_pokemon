// File: src/store.js
export function initialStore() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
  return { favorites: favs }
}

export default function storeReducer(state, action) {
  switch (action.type) {
    case 'FAVORITES_TOGGLE': {
      const exists = state.favorites.find(f => f.id === action.payload.id)
      const favorites = exists
        ? state.favorites.filter(f => f.id !== action.payload.id)
        : [...state.favorites, action.payload]
      localStorage.setItem('favorites', JSON.stringify(favorites))
      return { ...state, favorites }
    }
    default:
      return state
  }
}
