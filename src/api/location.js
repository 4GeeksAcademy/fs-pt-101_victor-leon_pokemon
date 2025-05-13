const BASE_URL = 'https://pokeapi.co/api/v2/location';

export async function fetchLocationList() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch location list');
  return (await res.json()).results;
}

export async function fetchLocationDetail(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch location detail');
  return await res.json();
}
