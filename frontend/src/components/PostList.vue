<script setup lang="ts">
import { QueryType } from "@/shared/models";
import { mainStore } from "@/store";
import { CalendarOutline } from "@vicons/ionicons5";
import { Categories } from "@vicons/carbon";
import { Tags } from "@vicons/tabler";

// -----------Globle----------
/*
引入Store,Router
*/
const Store = mainStore();
const Router = useRouter();

// ------------方法---------------

/*
 * 点击list显示对应id文章
 */
const handleShowPost = (_id: string) => {
  //   在Store.parsePosts中查找对应id文章
  const post = Store.parsePosts.find((post) => post._id === _id);

  // 查找失败
  if (!post) {
    console.error("id find post error");
    return;
  }

  Store.showPost = post; //   查找成功,将post赋值给showPost

  Router.push("/show"); // 跳转页面
};

/*
 * 根据查询条件获取文章列表
 */
const handleGetPostBy = (query: QueryType) => {
  Store.queryType = query;
  Store.getPostsBy(0);
  Store.getCountBy();
  Store.currentPage = 1;
};
</script>

<template>
  <div pb-3 rounded v-for="post in Store.parsePosts" :key="post._id">
    <n-card hoverable>
      <template #header>
        <span cursor-pointer @click="handleShowPost(post._id)">{{ post.title }}</span>
      </template>
      <n-space>
        <n-button text>
          <template #icon>
            <n-icon>
              <CalendarOutline />
            </n-icon>
          </template>
          {{ post.createDate }}
        </n-button>
        <n-button text @click.stop="handleGetPostBy({ category: post.category })">
          <template #icon>
            <n-icon>
              <Categories />
            </n-icon>
          </template>
          {{ post.category }}
        </n-button>
        <div v-for="(tag, index) in post.tags" :key="index">
          <n-button text @click.stop="handleGetPostBy({ tag })">
            <template #icon>
              <n-icon>
                <Tags />
              </n-icon>
            </template>
            {{ tag }}
          </n-button>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
