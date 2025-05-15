import { useEffect, useState } from 'react';
import { fetchRegionList } from '../api/region';

export function useRegionList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegionList()
      .then((regions) => setData(regions))
      .catch((error) => {
        console.error('Error fetching regions:', error);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
