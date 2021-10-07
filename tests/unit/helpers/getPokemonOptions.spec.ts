import { getPokemons, getPokemonNames, getPokemonOptions } from "@/helpers";

describe("getPokemonOptions <helpers>", () => {
  it("Should return an array of numbers", () => {
    const pokemons = getPokemons();
    expect(pokemons.length).toBe(650);
    expect(pokemons[0]).toBe(1);
    expect(pokemons[500]).toBe(501);
    expect(pokemons).toContain(420);
    expect(pokemons).toContain(69);
  });

  it("Should return an array with 4 elements with names", async () => {
    const pokemons = await getPokemonNames([1,2,3,4]);
    expect(pokemons).toStrictEqual([
      {
        id: 1,
        name: 'bulbasaur'
    },
      {
        id: 2,
        name: 'ivysaur'
    },
      {
        id: 3,
        name: 'venusaur'
    },
      {
        id: 4,
        name: 'charmander'
    }
    ])
  });

  it("getPokemonOptions should return a mixed array", async () => {
    const pokemons = await getPokemonOptions();
    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String)
    },
      {
        id: expect.any(Number),
        name: expect.any(String)
    },
      {
        id: expect.any(Number),
        name: expect.any(String)
    },
      {
        id: expect.any(Number),
        name: expect.any(String)
    }
    ])
  });
});
