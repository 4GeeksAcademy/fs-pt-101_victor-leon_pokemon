const ITEM_BASE = 'https://pokeapi.co/api/v2/item';
const CATEGORY_BASE = 'https://pokeapi.co/api/v2/item-category';

/**
 * Obtiene la lista completa de objetos (hasta 2000 para cubrir todos).
 */
export async function fetchItemList() {
  const res = await fetch(`${ITEM_BASE}?limit=2000`);
  if (!res.ok) throw new Error('Failed to fetch item list');
  return (await res.json()).results;
}

/**
 * Obtiene la lista completa de categorías de objetos.
 */
export async function fetchItemCategories() {
  const res = await fetch(`${CATEGORY_BASE}?limit=1000`);
  if (!res.ok) throw new Error('Failed to fetch item categories');
  return (await res.json()).results;
}

/**
 * Obtiene el detalle de un objeto individual por id o nombre.
 */
export async function fetchItemDetail(idOrName) {
  const res = await fetch(`${ITEM_BASE}/${idOrName}`);
  if (!res.ok) throw new Error('Failed to fetch item detail');
  return await res.json();
}

/**
 * Devuelve la URL del sprite de un objeto, usando su nombre.
 */
export const getItemImageUrl = name =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
