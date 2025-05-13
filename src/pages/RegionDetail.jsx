import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { regionImages } from '../api/region';

export default function RegionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/region/${id}`);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !data || !data.name) {
    return <p className="text-center text-danger mt-4">Error loading region data.</p>;
  }

  const imageUrl = regionImages[id] || 'https://via.placeholder.com/800x200?text=Region';

  return (
    <div className="container-fluid" style={{ padding: 0 }} >
      <div className="position-relative mb-4 w-100" style={{ height: '300px' }}>
        <img
          src={imageUrl}
          alt={data.name}
          className="w-100 h-100 object-fit-cover"
          style={{ objectFit: 'cover' }}
        />
        <h2 className="region-title position-absolute top-50 start-50 translate-middle text-white text-shadow text-capitalize">
          {data.name} Region
        </h2>
      </div>

      <div className="container mb-4">
        <button
        onClick={() => navigate(`/region`)}
        className="btn btn-outline-warning text-black mb-4"
      >     
        Back to Regions
      </button>
        <h5>Locations:</h5>
        <ul className="list-group">
          {data.locations?.map((loc) => (
            <li
              key={loc.name}
              className="list-group-item text-capitalize location-area-item"
              onClick={() => navigate(`/location/${getIdFromUrl(loc.url)}`)}
              role="button"
            >
              {loc.name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
