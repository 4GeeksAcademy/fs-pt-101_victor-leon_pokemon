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
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4">Regions</h2>
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
