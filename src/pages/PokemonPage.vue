<template>
  <h1 v-if="!pokemon">Cargando...</h1>
  <div v-else>
    <h1>¿Who is this Pokemon?</h1>
    <PokemonPic :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions
      @selection="matchPokemon($event)"
      :correctAnswer="correctAnswer"
      :pokemons="pokemonArr"
    />
    <template v-if="showAnswer">
      <h2 v-if="correctAnswer.message.lenght === 1" class="fade-in">
        <b class="correct">{{ correctAnswer.message }}+ "hola"</b>
      </h2>
      <h2 v-else class="fade-in">
        {{ correctAnswer.message[0] }}
        <b class="incorrect">{{ correctAnswer.message[1] }}</b>
        {{ correctAnswer.message[2] }}
        <b class="correct">{{ correctAnswer.message[3] }}</b>
      </h2>
      <div class="buttonContainer" @click="resetGame">
        <h3 class="reset">Restart Game</h3>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "@vue/runtime-core";
import { PokemonPic, PokemonOptions } from "@/components/";
import { getPokemonOptions } from "@/helpers";
import { CorrectAnswer } from './PokemonPage.types';

export default defineComponent({
  components: {
    PokemonPic,
    PokemonOptions
  },
  data() {
    return {
      pokemonArr: [] as any[],
      pokemon: null as any,
      showPokemon: false,
      showAnswer: false,
      correctAnswer: {
        id: null,
        correct: false,
        message: []
      } as CorrectAnswer
    };
  },
  methods: {
    async mixPokemons() {
      this.pokemonArr = await getPokemonOptions();
      const index = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[index];
    },
    matchPokemon(id: number) {
      this.showPokemon = true;
      this.showAnswer = true;
      this.correctAnswer = {
        id: id,
        correct: id === this.pokemon.id,
        message:
          id === this.pokemon.id
            ? ["That's correct!"]
            : [
                `Ooopss, looks like you choose`,
                `${this.pokemonArr.filter(item => item.id === id)[0].name},`,
                `the correct one was`,
                `${this.pokemon.name}`
              ]
      };
    },
    resetGame() {
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.correctAnswer = {
        id: null,
        correct: false,
        message: []
      };
      this.mixPokemons();
    }
  },
  mounted() {
    this.mixPokemons();
  }
});
</script>

<style scoped>
b.correct {
  color: rgb(24, 181, 24) !important;
}

b.incorrect {
  color: rgb(201, 31, 31) !important;
}

.buttonContainer {
  display: flex;
  align-self: center;
  justify-content: center;
}

.reset {
  background-color: white;
  padding: 10px 25px;
  cursor: pointer;
  color: red;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.2);
}
</style>
