<script setup lang="ts">
import { mainStore } from "@/store";
import { Home32Regular } from "@vicons/fluent";
import { CalendarOutline } from "@vicons/ionicons5";
import { Tags } from "@vicons/tabler";

// ------------Global-----------
const Store = mainStore();
const Router = useRouter();

// ------------方法-----------
const handleHomeBtn = () => {
  Router.replace("/");
};
</script>

<template>
  <header class="header" flex justify-between font-bold items-stretch text-white h-240px>
    <n-button circle m-4 type="primary" @click="handleHomeBtn">
      <template #icon>
        <n-icon>
          <Home32Regular />
        </n-icon>
      </template>
    </n-button>

    <!-- 标题/副标题 -->
    <div flex-grow flex flex-col justify-center items-center>
      <span text-4xl>{{ Store.showPost.title }}</span>
      <div>
        <n-space>
          <n-button text color="#fff" size="large">
            <template #icon>
              <n-icon>
                <CalendarOutline />
              </n-icon>
            </template>
            {{
              !Store.showPost.updateDate
                ? Store.showPost.createDate
                : Store.showPost.updateDate
            }}
          </n-button>
          <div v-for="(tag, index) in Store.showPost.tags" :key="index">
            <n-button text color="#fff" size="large">
              <template #icon>
                <n-icon>
                  <Tags />
                </n-icon>
              </template>
              {{ tag }}
            </n-button>
          </div>
        </n-space>
      </div>
    </div>
    <div w-34px m-4></div>
  </header>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
.header {
  background-image: url("@/assets/postHeader.webp");
  background-color: rgb(34, 34, 34);
  background-position: center 45%;
}
</style>
