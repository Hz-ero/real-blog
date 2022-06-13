<script setup lang='ts'>
</script>

<template>
    <n-layout has-sider class='min-width-1400'>
        <n-layout-sider collapse-mode="transform" show-trigger="bar" :show-collapsed-content="false"
            :collapsed-width="50" :width="360" bordered>
            <Sider />
        </n-layout-sider>
        <n-layout bg-gray-100 h-screen>
            <router-view />
        </n-layout>
    </n-layout>
</template>

<style  lang='scss'>
@import "@/style/base.scss";

.n-layout-scroll-container {
    display: flex;
    flex-grow: 1;
    justify-content: center;
}
</style>