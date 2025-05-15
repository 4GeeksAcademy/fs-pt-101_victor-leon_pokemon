import React from 'react';
import {
  useStore,
  useClearFavorites
} from '../hooks/useGlobalReducer';
import PokeCard from '../components/PokeCard';
import ItemCard from '../components/ItemCard';

export default function Favorites() {
  const { store } = useStore();
  const clearFavorites = useClearFavorites();

  const deduplicated = [];
  const seen = new Set();

  for (const fav of store.favorites) {
    const key = `${fav.type}-${fav.id}-${fav.name}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(fav);
    }
  }

  const pokeFavorites = deduplicated.filter(f => f.type === 'pokemon');
  const itemFavorites = deduplicated.filter(f => f.type === 'item');

  if (deduplicated.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>No favorites yet</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Favorites</h2>
        <button
  className="btn btn-outline-danger btn-sm"
  onClick={clearFavorites}
>
  Clear All
</button>

      </div>

      {pokeFavorites.length > 0 && (
        <>
          <h5 className="mb-3">Favorite Pokémon</h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
            {pokeFavorites.map(fav => (
              <div className="col" key={`pokemon-${fav.id}-${fav.name}`}>
                <PokeCard item={fav} />
              </div>
            ))}
          </div>
        </>
      )}

      {itemFavorites.length > 0 && (
        <>
          <h5 className="mb-3">Favorite Items</h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {itemFavorites.map(fav => (
              <div className="col" key={`item-${fav.id}-${fav.name}`}>
                <ItemCard name={fav.name} url={fav.url} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
