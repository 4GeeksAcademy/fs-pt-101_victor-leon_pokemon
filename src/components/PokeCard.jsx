import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, useToggleFavorite } from '../hooks/useGlobalReducer'
import { getImageUrl } from '../api/pokemon'
import { usePokemonDetail } from '../hooks/usePokemon'
import { typeIcons } from '../utils/Icons'

export default function PokeCard({ item }) {
  const nav = useNavigate();
  const toggle = useToggleFavorite();
  const { store } = useStore();

  const idMatch = item?.url?.match(/\/(\d+)\/?$/);
  if (!idMatch) return <p className="text-danger">Invalid Pokémon data</p>;

  const id = idMatch[1]; 
  const idNumber = Number(id);

  const isFav = store.favorites.some(f => f.id === idNumber && f.type === 'pokemon');
  const { data: detail } = usePokemonDetail(id);
  const types = detail?.types || [];

  return (
    <div
      className="card h-100 shadow-sm"
      data-type={types[0]?.type.name}
      onClick={() => nav(`/pokemon/${id}`, { state: { tab: 'Basic' } })}
      style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer' }}
    >
      <div className="position-relative bg-light">
        <img
          src={getImageUrl(id)}
          className="w-100"
          alt={item.name}
          style={{ objectFit: 'contain', height: '150px' }}
        />
        <button
          className={`btn btn-sm position-absolute top-0 end-0 m-2 ${isFav ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={e => {
            e.stopPropagation();
            toggle({
              id: idNumber,
              name: item.name,
              url: item.url,
              type: 'pokemon'
            });
          }}
        >
          {isFav ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body text-center">
        <h6 className="text-capitalize mb-2">{item.name}</h6>
        <div className="d-flex justify-content-center flex-wrap">
          {types.map(t => (
            <img
              key={t.slot}
              src={typeIcons[t.type.name]}
              alt={t.type.name}
              title={t.type.name}
              className="me-1 mb-1"
              style={{ width: 80, height: 20 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
