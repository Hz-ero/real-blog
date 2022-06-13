<script setup lang='ts'>
import { QueryType } from "@/shared/models";
import { mainStore } from "@/store/index";

const Store = mainStore();
const Router = useRouter();
// 根据所选分类（分类/标签/全部）获取所有文章
const handleGetPostBy = async (query: QueryType) => {
  Store.queryType = query;
  await Store.getPostsBy(0);
  Store.getCountBy();
  Store.currentPage = 1;
  Router.push("/");
};
</script>

<template>
  <div flex flex-col justify-center w-600px gap-6>
    <div>
      <n-card title="分类">
        <template #action>
          <n-space>
            <n-button
              type="info"
              size="large"
              v-for="(item, index) in Store.categories"
              :key="index"
              @click="handleGetPostBy({ category: item })"
            >
              {{ item }}
            </n-button>
          </n-space>
        </template>
      </n-card>
    </div>
    <div>
      <n-card title="标签">
        <template #action>
          <n-space>
            <n-button
              type="success"
              @click="handleGetPostBy({ tag: item })"
              v-for="(item, index) in Store.tags"
              :key="index"
            >
              {{ item }}
            </n-button>
          </n-space>
        </template>
      </n-card>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import "@/style/base.scss";
</style>