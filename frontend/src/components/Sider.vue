<script setup lang='ts'>
import { Home32Regular } from '@vicons/fluent'
import { Tags, FileCertificate, ApiApp } from '@vicons/tabler'
import { CategoryOutlined } from '@vicons/material'

const Router=useRouter()
</script>

<template>
    <div class='color-container' text-white relative>
        <!-- 底部光晕 -->
        <div w-200px h-200px absolute rounded-full
        filter blur-3xl class='-top-8 -left-8 color-sharp'/>
        <!-- 主内容 -->
        <div flex flex-col justify-center items-center h-screen>

            <!-- 头像 -->
            <div mb-12 z-50>
                <img src="../assets/avatar.JPG" alt="avatar"  w-80px rounded-2xl>
            </div>

            <!-- 导航 -->
            <div flex flex-col >
                <n-button my-3 size='large' text color='#eee' @click="Router.push('/')">
                    <template #icon>
                        <n-icon>
                            <Home32Regular />
                        </n-icon>
                    </template>首页
                </n-button>
                <n-button my-3 size="large" text color="#eee" @click="Router.push('/tags')">
                    <template #icon>
                        <n-icon>
                            <Tags />
                        </n-icon>
                    </template>分类
                </n-button>
                <n-button my-3 size="large" text color="#eee" @click="Router.push('/projects')">
                    <template #icon>
                        <n-icon>
                            <CategoryOutlined />
                        </n-icon>
                    </template>项目
                </n-button>
                <n-button my-3 size="large" text color="#eee" @click="Router.push('/tecs') ">
                    <template #icon>
                        <n-icon>
                            <ApiApp />
                        </n-icon>
                    </template>技术
                </n-button>
                <n-button mt-3 mb-13 size="large" text color="#eee" @click="Router.push('/about')">
                    <template #icon>
                        <n-icon>
                            <FileCertificate />
                        </n-icon>
                    </template>关于
                </n-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
.color-sharp { 
    background-color: $sharp-back-color;
    filter: blur(90px);
}

.color-container {
    background-color: $nav-back-color;
}
</style>    