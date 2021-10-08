/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, VueWrapper } from "@vue/test-utils";

import { CorrectAnswer, PokemonPage } from "@/pages";
import { pokemons } from "../mocks";

describe("PokemonPage <pages>", () => {
  let wrapper: VueWrapper<any>;
  let mixPkmArr: jest.SpyInstance;

  beforeEach(() => {
    if (PokemonPage.methods !== undefined) {
      mixPkmArr = jest.spyOn(PokemonPage.methods as any, "mixPokemons");
      wrapper = shallowMount(PokemonPage);
    }
  });

  function mountWithData() {
    return shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[3],
          showPokemon: false,
          showAnswer: false,
          correctAnswer: {
            id: null,
            correct: null,
            message: []
          } as CorrectAnswer
        };
      }
    });
  }

  it("Should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should call mixPokemons on mount", () => {
    expect(mixPkmArr).toHaveBeenCalled();
  });

  it("Should match the snapshot after load pokemons", () => {
    const wrapper = mountWithData();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Children components should exist and have correct attributes", () => {
    const wrapper = mountWithData();
    const PokePic = wrapper.find("pokemon-pic-stub");
    const PokeOpt = wrapper.find("pokemon-options-stub");
    expect(PokePic.exists()).toBeTruthy();
    expect(Number(PokePic.attributes("pokemonid"))).toBe(4);
    expect(PokePic.attributes("showPokemon")).toBeFalsy();
    expect(PokeOpt.exists()).toBeTruthy();
    expect(PokeOpt.attributes("pokemons")).toBeTruthy();
  });

  it("Tests in checkAnswer", async () => {
    const wrapper = mountWithData();
    await wrapper.vm.matchPokemon(4);
    expect(wrapper.find("h2").text()).toBe("That's correct!");
    expect(wrapper.vm.showPokemon).toBeTruthy();
    await wrapper.vm.matchPokemon(1);
    expect(wrapper.vm.correctAnswer.message.join(" ")).toBe(
      "Ooopss, looks like you choose bulbasaur, the correct one was charmander"
    );
  });
});
