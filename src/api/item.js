const ITEM_BASE = 'https://pokeapi.co/api/v2/item';
const CATEGORY_BASE = 'https://pokeapi.co/api/v2/item-category';

export async function fetchItemList() {
  const res = await fetch(`${ITEM_BASE}?limit=2000`);
  if (!res.ok) throw new Error('Failed to fetch item list');
  return (await res.json()).results;
}

export async function fetchItemCategories() {
  const res = await fetch(`${CATEGORY_BASE}?limit=1000`);
  if (!res.ok) throw new Error('Failed to fetch item categories');
  return (await res.json()).results;
}

export async function fetchItemDetail(idOrName) {
  const res = await fetch(`${ITEM_BASE}/${idOrName}`);
  if (!res.ok) throw new Error('Failed to fetch item detail');
  return await res.json();
}

export const getItemImageUrl = name =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
