/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, VueWrapper } from "@vue/test-utils";

import { PokemonPic } from "@/components/";

describe("PokemonPic <component>", () => {
  function mountWrapper(id = 1, showPokemon = false): VueWrapper<any> {
    return shallowMount(PokemonPic, {
      props: {
        pokemonId: id,
        showPokemon: showPokemon
      }
    });
  }

  it("Should match with snapshot", () => {
    const wrapper = mountWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should show the hidden image of the pokemon 100", () => {
    const wrapper = mountWrapper(100, false);
    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    expect(img.classes("hidden-pokemon")).toBeTruthy();
    expect(img.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );
    expect(
      wrapper.find('[data-testid="pokemonUnhidden"]').exists()
    ).toBeFalsy();
    expect(wrapper.props().pokemonId).toBe(100);
  });

  it("Should pokemon if showPokemon is true", () => {
    const wrapper = mountWrapper(100, true);
    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    expect(img.classes("fade-in")).toBeTruthy();
    expect(img.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );
    expect(wrapper.props().showPokemon).toBeTruthy();
  });
});
