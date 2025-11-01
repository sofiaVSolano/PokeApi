import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(limit = 1000, offset = 0) {
    const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;
    const res = await axios.get(url);

    const detailsPromises = res.data.results.map((r) =>
        axios.get(r.url).then((s) => s.data)
    );
    const pokemons = await Promise.all(detailsPromises);

    return pokemons.map((p) => ({
        id: p.id,
        name: p.name,
        types: p.types.map((t) => t.type.name),
        sprite: p.sprites.front_default,
        raw: p,
    }));
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
