/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <div data-testid="pokemonContainer" class="pokemon-container">
    <img
      class="hidden-pokemon"
      data-testid="pokemonHidden"
      :src="imgSrc"
      v-if="!showPokemon"
      alt="A Wild  Pokemon"
    />
    <img
      class="fade-in"
      data-testid="pokemonUnhidden"
      :src="imgSrc"
      v-else
      alt="A Wild  Pokemon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: 'PokemonPic',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  computed: {
    imgSrc(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  },
});
</script>

<style scope>
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>
