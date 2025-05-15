export function initialStore() {
  return {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV': {
      const { id, type, name } = action.payload;

      // Verificamos si ya existe exactamente el mismo favorito
      const exists = state.favorites.some(
        f => f.id === id && f.type === type && f.name === name
      );

      const updated = exists
        ? state.favorites.filter(
            f => !(f.id === id && f.type === type && f.name === name)
          )
        : [...state.favorites, action.payload];

      localStorage.setItem('favorites', JSON.stringify(updated));
      return { ...state, favorites: updated };
    }

    case 'CLEAR_ALL': {
      localStorage.removeItem('favorites');
      return { ...state, favorites: [] };
    }

    default:
      return state;
  }
}
