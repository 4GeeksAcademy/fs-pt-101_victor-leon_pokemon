// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import { useRegionList } from '../hooks/useRegionList'; // nuevo
import PokemonCarousel from '../components/PokeCarousel';
import RegionCarousel from '../components/RegionCarousel'; // nuevo

export default function Home() {
  const { data: allPokemon, loading: loadingPokemon } = usePokemonList();
  const { data: allRegions, loading: loadingRegions } = useRegionList(); // nuevo
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      {/* Título Pokémon */}
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

      {/* Carrusel de Pokémon */}
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
          View more
        </button>
      </div>

      {/* Título Regiones */}
      <h2 className="home-title text-center mb-1 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727803.png"
          alt="Region icon"
          width="40"
          height="40"
        />
        <span className="text">Regiones</span>
      </h2>

      {/* Carrusel de Regiones */}
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

    </div>
  );
}
