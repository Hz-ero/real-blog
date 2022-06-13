<script setup lang="ts">
import { mainStore } from "@/store";
import { Apps28Regular } from "@vicons/fluent";

// -----------Globle----------
const Store = mainStore();

// -----------组件----------
const PostList = defineAsyncComponent(() => import("../../components/PostList.vue"));
const Pagination = defineAsyncComponent(() => import("../../components/Pagination.vue"));

// ------------方法---------------

// 选择内容：所选标签/所选分类/全部
const queryName = computed(() => {
  if ("tag" in Store.queryType) {
    return Store.queryType.tag;
  } else if ("category" in Store.queryType) {
    return Store.queryType.category;
  } else {
    return "全部";
  }
});

// 根据所选分类（分类/标签/全部）获取所有文章
const handleGetAllPost = () => {
  Store.queryType = {};
  Store.getPostsBy(0);
  Store.getCountBy();
  Store.currentPage = 1;
};
</script>

<template>
  <div flex-grow flex flex-col items-center>
    <!-- 页头 -->
    <div self-stretch flex justify-between items-center py-4>
      <div flex justify-center mx-8>
        <!-- 图标 -->
        <n-icon size="32" cursor-pointer color="#321fdb" @click="handleGetAllPost">
          <Apps28Regular />
        </n-icon>

        <!-- 文本 -->
        <div flex items-center><span> &nbsp;>&nbsp;</span></div>
        <div flex items-center>
          <span>{{ queryName }}</span>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div w-800px mt-4 mb-4>
      <Suspense>
        <template #default>
          <PostList />
        </template>
        <template #fallback>
          <n-space vertical>
            <n-skeleton
              v-for="(item, index) in 10"
              :key="index"
              height="90px"
              width="800px"
            />
          </n-space>
        </template>
      </Suspense>
    </div>

    <!-- 分页 -->
    <div flex justify-center items-center pb-8>
      <Pagination />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
