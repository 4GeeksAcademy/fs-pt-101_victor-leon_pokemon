import React, { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import PokeCard from '../components/PokeCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getIdFromUrl } from '../utils/getIdFromUrl';

export default function Home() {
  const { data: allPokemon, loading } = usePokemonList();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Generar aleatoriamente una lista ordenada por ID ascendente
  const randomPokemonList = useMemo(() => {
    const shuffled = [...allPokemon].sort(() => Math.random() - 0.5);
    return shuffled
      .slice(0, 30)
      .sort((a, b) => parseInt(getIdFromUrl(a.url)) - parseInt(getIdFromUrl(b.url)));
  }, [allPokemon]);

  // Duplicar la lista para simular carrusel infinito visual
  const extendedList = [...randomPokemonList, ...randomPokemonList];

  // Reposicionar scroll cuando se llega al final o al inicio visual
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const midpoint = el.scrollWidth / 2;
    el.scrollLeft = midpoint; // Comienza desde la mitad (inicio real)

    const handleScroll = () => {
      if (el.scrollLeft <= 0) {
        el.scrollLeft = midpoint;
      } else if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollLeft = midpoint - el.clientWidth;
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [extendedList]);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="home-title text-center mb-4 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6a/latest/20230115164405/Pok%C3%A9_Ball_EP.png/150px-Pok%C3%A9_Ball_EP.png"
          alt="Poké Ball"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Pokémon</span>
      </h2>

      <div className="d-flex align-items-center justify-content-between gap-2">
        <button
          className="btn btn-outline-warning d-none d-md-flex align-items-center justify-content-center"
          onClick={() => scroll(-300)}
          style={{ width: '48px', height: '48px', borderRadius: '50%', boxShadow: '0 0 6px rgba(0,0,0,0.2)' }}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="d-flex overflow-auto px-2 pb-2 flex-grow-1 pokemon-carousel"
          style={{ scrollBehavior: 'smooth', gap: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            <div className="text-center w-100 py-5">
              <div className="spinner-border text-warning" />
            </div>
          ) : (
            extendedList.map((pokemon, index) => (
              <div key={`${pokemon.name}-${index}`} style={{ flex: '0 0 auto', width: '200px' }}>
                <PokeCard item={pokemon} />
              </div>
            ))
          )}
        </div>

        <button
          className="btn btn-outline-warning d-none d-md-flex align-items-center justify-content-center"
          onClick={() => scroll(300)}
          style={{ width: '48px', height: '48px', borderRadius: '50%', boxShadow: '0 0 6px rgba(0,0,0,0.2)' }}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-warning px-4 py-2"
          style={{ fontWeight: 600, fontSize: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
          onClick={() => navigate('/pokemon')}
        >
          View more
        </button>
      </div>
    </div>
  );
}
