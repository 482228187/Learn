<script setup lang="ts">
import countA from './Pinia/index'
const counter = countA()
console.log(counter.count); //hello vuex
</script>

<template>
  <div>
   <h3> vuex和pinia学习</h3>
  </div>
  <div class="card">
    <p>pinia持久化学习</p>
    <button type="button" @click="counter.increment">count is {{ counter.count }}</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
