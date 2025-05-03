// File: src/pages/.jsx
import React from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import PokeCard from '../components/PokeCard';

export default function Home() {
  const { data: pokemonList} = usePokemonList();

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {pokemonList.map((pokemon) => (
          <div className="col" key={pokemon.name}>
            <PokeCard item={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}
