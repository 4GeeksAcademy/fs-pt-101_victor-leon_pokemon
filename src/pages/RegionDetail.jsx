import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getIdFromUrl } from '../utils/getIdFromUrl';

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

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mb-4"
      >
        ← Back to Regions
      </button>

      <h2 className="text-capitalize mb-4">{data.name} Region</h2>

      <div className="mb-4">
        <h5>Localized Names:</h5>
        <ul className="list-group">
          {data.names?.map((name, index) => (
            <li key={index} className="list-group-item">
              <strong>{name.language.name}:</strong> {name.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h5>Locations:</h5>
        <ul className="list-group">
          {data.locations?.map((loc) => (
            <li key={loc.name} className="list-group-item text-capitalize">
              {loc.name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h5>Version Groups:</h5>
        <ul className="list-group">
          {data.version_groups?.map((vg) => (
            <li key={vg.name} className="list-group-item text-capitalize">
              {vg.name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
