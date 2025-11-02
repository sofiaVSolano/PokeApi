import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(limit = 3, offset = 0) {
  const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;
  const res = await axios.get(url);

  const pokemons = [];

  for (const r of res.data.results) {
    await new Promise(res => setTimeout(res, 1)); 
    const detail = await axios.get(r.url);
    const p = detail.data;

    pokemons.push({
      id: p.id,
      name: p.name,
      types: p.types.map((t) => t.type.name),
      sprite: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
      raw: p,
    });
  }

  return pokemons;
}


export async function fetchPokemonByName(name) {
    try {
        const res = await axios.get(`${BASE_URL}/${name.toLowerCase()}`);
        const p = res.data;

        return {
            id: p.id,
            name: p.name,
            types: p.types.map((t) => t.type.name),
            sprite: p.sprites.front_default,
            raw: p,
        };
    } catch (error) {
        throw error;
    }
}
