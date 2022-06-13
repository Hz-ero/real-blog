<script setup lang="ts">
import { mainStore } from "@/store";

import MDEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
// ------------Global-----------

const Store = mainStore();

// ------------属性-----------
const isPreview = true; //预览模式
const content = computed(() => {
  //文章内容
  if (!Store.showPost) {
    return "";
  } else {
    return Store.showPost.content;
  }
});
</script>

<template>
  <div w-900px mx-auto bg-white px-4 py-2 my-2>
    <MDEditor :previewOnly="isPreview" preview-theme="vuepress" :model-value="content" />
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
