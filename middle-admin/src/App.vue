<script setup lang="ts">
import { mainStore } from "./store";
const Store = mainStore();
const Router = useRouter();
onBeforeMount(async () => {
  await Store.initStore();
});
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<style></style>
