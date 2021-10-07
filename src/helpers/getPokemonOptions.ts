import { pokemonApi } from "@/api";

interface pokemonNecesaryData {
  id: number;
  name: string;
}

export const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));
  return pokemonsArr.map((_, index) => index + 1);
};

export const getPokemonOptions = async (): Promise<pokemonNecesaryData[]> => {
  const randomPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(randomPokemons.splice(0, 4));
  return pokemons;
};

export const getPokemonNames = async ([a, b, c, d]: number[]) => {
  const promiseArr = [
    pokemonApi(`/${a}`),
    pokemonApi(`/${b}`),
    pokemonApi(`/${c}`),
    pokemonApi(`/${d}`)
  ];
  const pokes = await Promise.all<{ data: pokemonNecesaryData }>(promiseArr);
  return pokes.map(pokemon => {
    return { id: pokemon.data.id, name: pokemon.data.name };
  });
};
