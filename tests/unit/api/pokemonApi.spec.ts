import { pokemonApi } from '@/api';

describe('pokemonApi <Axios>', () => {
  it('Axios should be configured with baseUrl', () => {
    expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
  })
})