import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RegionCard from './RegionCard';

const BATCH_SIZE = 20;
const CLONE_COUNT = 3;

export default function RegionCarousel({ regionList = [] }) {
  const scrollRef = useRef(null);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (regionList.length === 0) return;

    const newBatches = [];
    for (let i = 0; i < regionList.length; i += BATCH_SIZE) {
      newBatches.push(regionList.slice(i, i + BATCH_SIZE));
    }

    const repeated = [];
    for (let i = 0; i < CLONE_COUNT; i++) {
      repeated.push(...newBatches);
    }

    setBatches(repeated);
  }, [regionList]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth;
      const current = el.scrollLeft;
      const width = el.clientWidth;

      const nearStart = current <= 10;
      const nearEnd = current + width >= maxScroll - 10;

      if (nearStart || nearEnd) {
        // Guardamos el comportamiento de scroll original
        const originalBehavior = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto';

        // Reposicionamiento sin animación
        if (nearStart) {
          el.scrollLeft = maxScroll / CLONE_COUNT;
        } else if (nearEnd) {
          el.scrollLeft = maxScroll / CLONE_COUNT - width;
        }

        // Restauramos la suavidad
        requestAnimationFrame(() => {
          el.style.scrollBehavior = originalBehavior || 'smooth';
        });
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [batches]);

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
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          boxShadow: '0 0 6px rgba(0,0,0,0.2)',
        }}
        aria-label="Scroll left"
      >
        <FaChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="d-flex overflow-auto px-2 pt-2 pb-2 flex-grow-1 pokemon-carousel"
        style={{
          scrollBehavior: 'smooth',
          gap: '1rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {batches.flat().map((region, index) => (
          <div
            key={`${region.name}-${index}`}
            style={{ flex: '0 0 auto', width: '200px' }}
          >
            <RegionCard region={region} />
          </div>
        ))}
      </div>

      <button
        className="btn btn-outline-warning d-none d-md-flex align-items-center justify-content-center"
        onClick={() => scroll(300)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          boxShadow: '0 0 6px rgba(0,0,0,0.2)',
        }}
        aria-label="Scroll right"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
