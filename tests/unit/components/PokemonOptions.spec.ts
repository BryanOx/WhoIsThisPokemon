/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, VueWrapper } from "@vue/test-utils";

import { PokemonOptions } from "@/components/";
import { pokemons } from "../mocks";

describe("PokemonOption <components>", () => {
  let wrapper: VueWrapper<any>;

  function mountWrapper(
    correctAnswer = { id: null, correct: false, message: [] as string[] }
  ): VueWrapper<any> {
    return shallowMount(PokemonOptions, {
      props: {
        pokemons,
        correctAnswer
      }
    });
  }

  beforeEach(() => {
    wrapper = mountWrapper();
  });

  it("Should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should show 4 options with names", () => {
    const options = wrapper.findAll("li");
    expect(options.length).toBe(4);
    expect(
      options.map(
        (item, index) =>
          item.text() === pokemons[index].name.toLocaleUpperCase()
      )
    ).toStrictEqual([true, true, true, true]);
  });

  it("Should emit 'selection' sending id", () => {
    const options = wrapper.findAll("li");
    options.map((item, index) => {
      item.trigger("click");
      const emitted = wrapper.emitted("selection") || [[]];
      expect(emitted.length).toBe(index + 1);
      expect(emitted[index]).toStrictEqual([index + 1]);
    });
  });
});
