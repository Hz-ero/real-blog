<script setup lang="ts">
import { mainStore } from "@/store";

// -----------Globle----------
const Store = mainStore();
// -----------方法----------
const handleChangePage = (page: number): void => {
  Store.getPostsBy((page - 1) * 10);
  // Store.getCountBy();
};
</script>

<template>
  <n-pagination
    v-model:page="Store.currentPage"
    :page-count="Store.pageCount"
    :page-slot="4"
    @update:page="handleChangePage"
  />
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
