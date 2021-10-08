<template>
  <h1>{{ counter }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Counter",
  props: {
    startAt: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      counter: this.startAt
    }
  }
})
</script>

<style>

</style>