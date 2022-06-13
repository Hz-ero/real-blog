<script setup lang="ts">
import { mainStore } from "./store";

const Store = mainStore();

onMounted(() => {
  Store.initStore();
});
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
</style>