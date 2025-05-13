const BASE_URL = 'https://pokeapi.co/api/v2/region';

export const regionImages = {
  1: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5b/latest/20180712231931/Mapa_de_Kanto_LGPE.png/2000px-Mapa_de_Kanto_LGPE.png',
  2: 'https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20180203062443/Johto_HGSS.png',
  3: 'https://images.wikidexcdn.net/mwuploads/wikidex/a/af/latest/20150228012617/Mapa_de_Hoenn_ROZA.png',
  4: 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d2/latest/20210825190744/Sinnoh_DBPR.png',
  5: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/2/29/latest/20160818015101/Teselia_N2B2.png/1500px-Teselia_N2B2.png',
  6: 'https://images.wikidexcdn.net/mwuploads/wikidex/0/05/latest/20160917035956/Mapa_Kalos.png',
  7: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e5/latest/20170819025541/Alola_USUL.png',
  8: 'https://images.nintendolife.com/4758ae93f17ed/galar.original.jpg',
  9: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5b/latest/20210819111244/Hisui.png/2000px-Hisui.png?20210819111244',
  10: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a1/latest/20220803152242/Paldea.jpg/2000px-Paldea.jpg',
};

export async function fetchRegionList() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch region list');
  return (await res.json()).results;
}

export async function fetchRegionDetail(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch region detail');
  return await res.json();
}
