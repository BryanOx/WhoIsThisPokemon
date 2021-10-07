<template>
  <div class="options-container">
    <ul>
      <li
        @click="$emit('selection', pokemon.id)"
        :key="pokemon.id"
        v-for="pokemon in pokemons"
        :class="
          pokemon.id === correctAnswer.id && correctAnswer.correct
            ? 'correct'
            : !correctAnswer.correct && correctAnswer.id === pokemon.id
            ? 'incorrect'
            : 'null'
        "
      >
        {{ capitalize(pokemon.name) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    pokemons: {
      type: Array,
      required: true
    },
    correctAnswer: Object
  },
  methods: {
    capitalize(name: string): string {
      return name.toUpperCase();
    }
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

li.null {
  background-color: white;
}

li.correct {
  background-color: rgb(24, 181, 24) !important;
  color: white;
  font-weight: 900;
}

li.incorrect {
  background-color: rgb(201, 31, 31) !important;
  color: white;
  font-weight: 900;
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
