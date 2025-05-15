import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import { useRegionList } from '../hooks/useRegionList';
import { useItems } from '../hooks/useItem'; // 🔹 nuevo
import PokemonCarousel from '../components/PokeCarousel';
import RegionCarousel from '../components/RegionCarousel';
import ItemCarousel from '../components/ItemCarousel'; // 🔹 nuevo

export default function Home() {
  const { data: allPokemon, loading: loadingPokemon } = usePokemonList();
  const { data: allRegions, loading: loadingRegions } = useRegionList();
  const { data: allItems, loading: loadingItems } = useItems(); // 🔹 nuevo
  const navigate = useNavigate();

  return (
    <div className="container mt-5">

      {/* Pokémon Section */}
      <h2 className="home-title text-center mb-1 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6a/latest/20230115164405/Pok%C3%A9_Ball_EP.png/150px-Pok%C3%A9_Ball_EP.png"
          alt="Poké Ball"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Pokémon</span>
      </h2>

      {!loadingPokemon && <PokemonCarousel pokemonList={allPokemon} />}

      <div className="text-center mt-4 mb-5">
        <button
          className="btn btn-warning px-4 py-2"
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
          onClick={() => navigate('/pokemon')}
        >
          View All
        </button>
      </div>

      {/* Regions Section */}
      <h2 className="home-title text-center mb-1 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/c/cd/latest/20211230005045/Artwork_mapa_pueblo.png"
          alt="Region icon"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Regions</span>
      </h2>

      {!loadingRegions && <RegionCarousel regionList={allRegions} />}

      <div className="text-center mt-4 mb-5">
        <button
          className="btn btn-warning px-4 py-2"
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
          onClick={() => navigate('/region')}
        >
          View All
        </button>
      </div>

      {/* Items Section */}
      <h2 className="home-title text-center mb-1 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/f/fd/latest/20230115173615/Poci%C3%B3n_EP.png/150px-Poci%C3%B3n_EP.png"
          alt="Item icon"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Items</span>
      </h2>

      {!loadingItems && <ItemCarousel itemList={allItems} />}

      <div className="text-center mt-4 mb-5">
        <button
          className="btn btn-warning px-4 py-2"
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
          onClick={() => navigate('/items')}
        >
          View All
        </button>
      </div>
    </div>
  );
}
