<script setup lang="ts">
import { mainStore } from "@/store";

import { ArrowDownload16Regular, ArrowUpload16Regular } from "@vicons/fluent";
import { Catalog } from "@vicons/carbon";
import { LikeOutlined } from "@vicons/antd";

// ------------Global-----------
const Store = mainStore();

// ------------属性-----------
const isTopBtnShow = ref(false);
const isBottomBtnShow = ref(true);
// ------------方法-----------
// 分发click事件：到顶部，到底部，文章点赞
const handleClickAction = (action: string) => {
  switch (action) {
    case "top":
      scrollTop();
      break;
    case "bottom":
      scrollBottom();
      break;
  }
};

// 滚动到顶部
const scrollTop = () => {
  let timer = setInterval(() => {
    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
    let upSpeed = Math.floor(-osTop / 5);
    document.documentElement.scrollTop = document.body.scrollTop = osTop + upSpeed;
    if (osTop === 0) {
      clearInterval(timer);
    }
  }, 30);
};

// 滚动到底部
const scrollBottom = () => {
  let timer = setInterval(() => {
    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
    let seeHeight = document.documentElement.clientHeight;
    let leftHeight = document.documentElement.scrollHeight - osTop - seeHeight;
    let downSpeed = Math.floor(leftHeight / 5);
    document.documentElement.scrollTop = document.body.scrollTop = osTop + downSpeed;
    if (leftHeight === 5) {
      clearInterval(timer);
    }
  }, 30);
};

// 给文章view量 +1
const plusPostViewCount = () => {
  let newPost = { _id: Store.showPost._id, view: 1 };
  if (!Store.showPost?.view) {
    Store.updatePost(newPost);
  } else {
    newPost.view = Store.showPost.view + 1;
    Store.updatePost(newPost);
  }
};

// 监听scroll事件，滚动到顶部或底部时显示或隐藏top和bottom按钮
const handleScroll = (e: any) => {
  let osTop = document.documentElement.scrollTop;
  let seeHeight = document.documentElement.clientHeight;
  let leftHeight = document.documentElement.scrollHeight - osTop - seeHeight;
  if (osTop > 240) {
    isTopBtnShow.value = true;
  } else {
    isTopBtnShow.value = false;
  }

  if (leftHeight < 10) {
    isBottomBtnShow.value = false;
  } else {
    isBottomBtnShow.value = true;
  }
};
// ===========生命周期=============

// dom挂载时，添加scroll事件
onMounted(() => {
  // 监听scroll事件
  window.addEventListener("scroll", handleScroll);
  //阅读量+1
  plusPostViewCount();
});

// dom卸载前，移除scroll事件
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div fixed right-4 bottom-4>
    <ActionButton
      @click-action="handleClickAction"
      :is-show="isTopBtnShow"
      color="#280740"
      action="top"
      :size="30"
      :comp="ArrowUpload16Regular"
    />
    <ActionButton
      @click-action="handleClickAction"
      :is-show="true"
      color="#280740"
      action="catalog"
      :size="30"
      :comp="Catalog"
    />
    <ActionButton
      @click-action="handleClickAction"
      :is-show="true"
      color="#280740"
      action="like"
      :size="30"
      :comp="LikeOutlined"
    />

    <ActionButton
      @click-action="handleClickAction"
      :is-show="isBottomBtnShow"
      color="#280740"
      action="bottom"
      :size="30"
      :comp="ArrowDownload16Regular"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
