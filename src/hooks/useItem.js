import { useEffect, useState } from 'react';
import {
  fetchItemList,
  fetchItemCategories,
  fetchItemDetail
} from '../api/item';

export function useItems() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItemList()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useItemCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItemCategories()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useItemDetail(idOrName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrName) return;

    setLoading(true);
    fetchItemDetail(idOrName)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [idOrName]);

  return { data, loading, error };
}

export function useItemCategory(idOrName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrName) return;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/item-category/${idOrName}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener la categoría');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [idOrName]);

  return { data, loading, error };
}
