<script setup lang='ts'>
const docs = [
    {
        node: "ORM", tecs: [
            {
                logo: "https://segmentfault.com/img/bVcYZ7P", name: "Prisma",
                description: "数据库工具链项目,",
                url: "https://prisma.yoga/"
            },
        ]
    },
    {
        node: "Not only Web", tecs: [
            {
                logo: "https://www.electronjs.org/zh/assets/img/logo.svg",
                name: "Electron",
                description: "使用 Web 技术构建跨平台的桌面应用",
                url: "https://www.electronjs.org/"
            },
            {
                logo: "https://flutterchina.club/images/flutter-mark-square-100.png",
                name: "Flutter",
                description: "极速构建漂亮的原生应用",
                url: "https://flutterchina.club/"
            },
            {
                logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/d23e842c-58fc-4574-998d-17fdc7811cc3.png?v=1556263038788",
                name: "uni-app",
                description: "跨平台开发框架，文档很shit",
                url: "https://uniapp.dcloud.io/"
            },
        ]
    },
    {
        node: "CSS", tecs: [
            {
                logo: "https://cdn.docschina.org/home/logo/sass.svg",
                name: "Sass",
                description: "CSS 的一个扩展，它使 CSS 的使用起来更加优雅和强大",
                url: "https://sass-guidelin.es/zh/"
            },
            {
                logo: "https://img.icons8.com/color/2x/information.png",
                name: "XIcons",
                description: "好用全面的icon库",
                url: "https://www.xicons.org"
            },
        ]
    },
    {
        node: "JS 方法库", tecs: [
            {
                logo: "https://cdn.docschina.org/home/logo/lodash.svg",
                name: "Lodash",
                description: "一个现代的 JavaScript 方法库",
                url: "https://www.lodashjs.com/"
            },
            {
                logo: "https://dayjs.gitee.io/img/logo.png",
                name: "Day.js",
                description: "处理时间和日期的 JavaScript 函数库",
                url: "https://dayjs.gitee.io/zh-CN/"
            },
        ]
    },
    {
        node: "可视化工具", tecs: [
            {
                logo: "https://cdn.docschina.org/home/logo/echarts.png",
                name: "ECharts",
                description: "方便的 2D 图表库",
                url: 'https://echarts.apache.org/zh/index.html'
            },
            {
                logo: "https://cdn.docschina.org/home/logo/threejs.png",
                name: "Three.js",
                description: "JavaScript 3d 库",
                url: 'https://threejs.docschina.org/'
            },
        ]
    },
    {
        node: "Vue 生态", tecs: [
            {
                logo: "https://v3.cn.vuejs.org/logo.png",
                name: "Vue3",
                description: "Vue新一代前端框架",
                url: 'https://v3.cn.vuejs.org'
            },
            {
                logo: "https://pinia.vuejs.org/logo.svg",
                name: "Pinia",
                description: "状态管理",
                url: 'https://pinia.vuejs.org/'
            }, {
                logo: "https://v3.cn.vuejs.org/logo.png",
                name: "Vue Router",
                description: "Vue 路由",
                url: 'https://router.vuejs.org/zh/index.html'
            },

        ]
    }, {
        node: "测试工具", tecs: [
            {
                logo: "https://cdn.docschina.org/home/logo/mocha.svg",
                name: "Mocha",
                description: "功能丰富的测试框架，使异步测试变得简单",
                url: 'https://mochajs.org/'
            },
            {
                logo: "https://cn.vitest.dev/logo.svg",
                name: "Vitest",
                description: "由Vite提供支持的极速单元测试框架",
                url: "https://cn.vitest.dev/"
            },
        ]
    },
    {
        node: 'Vue UI', tecs: [
            {
                logo: "https://cdn.docschina.org/home/logo/element.svg",
                name: "Element UI",
                description: "基于 Vue 的流行组件库",
                url: 'https://element-plus.org/zh-CN/#/zh-CN'
            },
            {
                logo: "https://www.naiveui.com/assets/naivelogo.93278402.svg",
                name: 'Naive UI',
                description: '基于 Vue3+TS 的现代组件库',
                url: 'https://www.naiveui.com/zh-CN/light'
            }, {
                logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                name: 'Ant Design',
                description: '阿里Vue UI',
                url: 'https://ant.design/index-cn'
            }
        ]
    }, {
        node: 'node', tecs: [
            {
                logo: 'https://npm.taobao.org/favicon.png',
                name: 'CNPM',
                description: '在中国要怎么用Node？',
                url: 'https://npmmirror.com/'
            },
            {
                logo: 'https://www.pnpm.cn/img/logos/pnpm-standard-no-text.png',
                name: 'Pnpm',
                description: '最新Node包管理器，极速，但坑很多',
                url: "https://www.pnpm.cn/"
            },
            {
                logo: 'https://cdn.docschina.org/home/logo/npm.png',
                name: 'NPM',
                description: '初始Node包管理器',
                url: 'https://www.npmjs.com/'
            },
            {
                logo: 'https://cdn.docschina.org/home/logo/node.svg',
                name: 'Node.js',
                description: '它是神',
                url: 'http://nodejs.cn/'
            },
            {
                logo: 'https://cdn.docschina.org/home/logo/koa.svg',
                name: 'Koa',
                description: 'Node服务端框架，有Koa够了', url: 'https://koa.bootcss.com/'
            }
        ]
    }, {
        node: '构建工具', tecs: [
            {
                logo: 'https://vitejs.cn/logo.svg',
                name: 'vite',
                url: 'https://vitejs.cn/',
                description: '下一代前端开发与构建工具'
            }
        ]
    }, {
        node: '数据库', tecs: [
            {
                logo: 'https://image-static.segmentfault.com/172/515/1725154670-624e781998e88_fix732',
                name: 'MongoDB',
                description: '免费开源的跨平台 NoSQL 数据库',
                url: 'https://www.mongodb.com/docs/drivers/node/current/quick-start/'
            },
            {
                logo: 'https://www.postgresql.org/media/img/about/press/elephant.png',
                name: 'PostgreSQL',
                description: '对象-关系型数据库管理系统', url: 'http://www.postgres.cn/index.php/v2/home'
            }
        ]
    }
]
const handleOpenDoc = (url: string) => {
    window.open(url, '_blank')
}
</script>

<template>
    <div w-940px class='margind'>
        <n-timeline py-12>
            <n-timeline-item v-for="item, index in docs" :key="index">
                <template #header>
                    <n-button text>{{ item.node }}</n-button>
                </template>
                <template #footer>
                    <n-space flex>
                        <n-card @click="handleOpenDoc(tec.url)" cursor-pointer hoverable v-for="tec, index in item.tecs"
                            :key="index">
                            <n-space w-240px flex items-center>
                                <div flex items-center h-40px w-40px>

                                    <img h-40px w-40px alt="Logo" :src="tec.logo" />
                                </div>

                                <span>{{ tec.name }}</span>
                            </n-space>
                            <template #action>
                                <div>
                                    <n-ellipsis style="max-width: 240px">{{ tec.description }}</n-ellipsis>
                                </div>
                            </template>
                        </n-card>

                    </n-space>
                </template>
            </n-timeline-item>
            <n-timeline-item content="..." />
        </n-timeline>
    </div>
</template>

<style scoped lang='scss'>
@import '@/style/base.scss';
</style>