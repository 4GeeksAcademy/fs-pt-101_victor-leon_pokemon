import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PokeCard from './PokeCard';
import { getIdFromUrl } from '../utils/getIdFromUrl';

const BATCH_SIZE = 20;
const HISTORY_LIMIT = 2;

export default function PokeCarousel({ pokemonList = [] }) {
  const scrollRef = useRef(null);
  const [batches, setBatches] = useState([]);
  const [usedIds, setUsedIds] = useState([]);

  // Genera un batch aleatorio sin repetir IDs recientes
  const generateBatch = useMemo(() => {
    return () => {
      const allAvailable = pokemonList.filter(p => !usedIds.includes(getIdFromUrl(p.url)));
      const shuffled = [...allAvailable].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, BATCH_SIZE);
      const ordered = selected.sort((a, b) => {
        const idA = parseInt(getIdFromUrl(a.url));
        const idB = parseInt(getIdFromUrl(b.url));
        return idA - idB;
      });
      return ordered;
    };
  }, [pokemonList, usedIds]);

  // Inicializa el primer batch
  useEffect(() => {
    if (pokemonList.length === 0) return;
    const firstBatch = generateBatch();
    setBatches([firstBatch]);
    setUsedIds(firstBatch.map(p => getIdFromUrl(p.url)));
  }, [pokemonList]);

  // Scroll infinito horizontal con nuevas cargas
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const nearLeft = el.scrollLeft <= 10;
      const nearRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

      if (nearRight || nearLeft) {
        const newBatch = generateBatch();
        setBatches(prev => {
          const updated = nearRight ? [...prev, newBatch] : [newBatch, ...prev];
          return updated;
        });

        setUsedIds(prev => {
          const newIds = newBatch.map(p => getIdFromUrl(p.url));
          const combined = [...prev, ...newIds];
          const unique = [...new Set(combined)].slice(-BATCH_SIZE * HISTORY_LIMIT);
          return unique;
        });

        // Auto scroll visual para simular continuidad
        if (nearLeft) {
          setTimeout(() => {
            el.scrollLeft = el.scrollWidth / 3;
          }, 100);
        }
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [generateBatch]);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
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
        className="d-flex overflow-auto px-2 pt-2 pb-2 flex-grow-1 pokemon-carousel"
        style={{ scrollBehavior: 'smooth', gap: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {batches.flat().map((pokemon, index) => (
          <div key={`${pokemon.name}-${index}`} style={{ flex: '0 0 auto', width: '200px' }}>
            <PokeCard item={pokemon} />
          </div>
        ))}
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
  );
}
