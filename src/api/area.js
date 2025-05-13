const BASE_URL = 'https://pokeapi.co/api/v2/location-area';

export async function fetchAreaList() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch area list');
  return (await res.json()).results;
}

export async function fetchAreaDetail(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch area detail');
  return await res.json();
}
