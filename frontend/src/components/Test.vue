<script setup lang="ts">
import { ref } from 'vue'
import { client } from '../client'

defineProps<{ msg: string }>()

const count = ref(0)
const handleTest = async () => {
  client.callApi('post/GetCategories', {})
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    See
    <code>README.md</code> for more information.
  </p>

  <button @click="handleTest">test</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
