import React, { useEffect, useState } from 'react';
import RegionCard from '../components/RegionCard';
import { fetchRegionList } from '../api/region';

export default function Region() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegionList()
      .then(setRegions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger mt-4">Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      {/* Title Regions */}
      <h2 className="page-title text-center mb-1 d-flex align-items-center justify-content-center gap-2 mb-4">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/c/cd/latest/20211230005045/Artwork_mapa_pueblo.png"
          alt="Region icon"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Regions</span>
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {regions.map((region) => (
          <div className="col" key={region.name}>
            <RegionCard region={region} />
          </div>
        ))}
      </div>
    </div>
  );
}
