<script setup lang="ts">
import { storeToRefs } from "pinia";
import { client } from "../client";
import { mainStore } from "../store";
import {
  Document,
  Menu as IconMenu,
  Location,
  Avatar,
  Edit,
  Bell,
  Message,
} from "@element-plus/icons-vue";

const Store = mainStore();
const Router = useRouter();
const Route = useRoute();
// const { count } = storeToRefs(Store);

// 挂载页面前检测是否登陆，如果没有登陆则跳转到登陆页面
onBeforeMount(() => {
  if (!Store.currentAdmin) {
    Router.replace("/login");
  }
});

// 导航菜单栏active
const activeMenu = computed(() => {
  switch (Route.path) {
    case "/":
      return "1";
      break;
    case "/post":
      return "2";
      break;
    case "/edit":
      return "3";
      break;
    default:
      return "1";
  }
});

// 顶部导航显示lobel
const pageDetail = computed(() => {
  switch (Route.path) {
    case "/":
      return "Dashboard";
      break;
    case "/post":
      return "文章";
      break;
    case "/edit":
      return "编辑";
      break;
    default:
      return "Dashboard";
      break;
  }
});
// 是否发布
const btnShowFlag = computed(() => {
  let p = Store.edit;
  return !(p.title && p.content && p.category && p.tags && p.tags.length > 0);
});
// 跳转edit,显示的操作按钮
const editShowActions = computed(() => {
  return Route.path === "/edit";
});
// 跳转post,显示的操作按钮
const postShowActions = computed(() => {
  return Route.path === "/post";
});

// 路由返回
const goBack = () => {
  Router.back();
};

// 导航栏跳转
const handleSelect = (index: string) => {
  switch (index) {
    case "2":
      Router.push("/post");
      break;
    case "1":
      Router.push("/dashboard");
      break;
    case "3":
      Router.push("/edit");
      break;
    default:
      Router.push("/dashboard");
      break;
  }
};

// 是否选择了数据
const selectRowsFlag = computed(() => {
  return Store.selectedRowIds.length > 0;
});

// 重置数据
const resetData = () => {
  Store.edit = {
    title: "",
    content: "",
    category: "",
    tags: [],
  };
};
// 新增文章
const handleCreatePost = () => {
  resetData();
  Router.push("/edit");
};

// 发布文章
const handleAddPost = async (isPublish: boolean) => {
  Store.edit.published = isPublish;

  if (!Store.edit._id) {
    Store.edit.createdAt = new Date();
    let ret = await client.callApi("post/AddPost", Store.edit);
    if (!ret.isSucc) {
      console.error("add post failed", ret.err);
      return;
    }
  } else {
    Store.edit.updatedAt = new Date();
    let { _id, ...rest } = Store.edit;
    let ret = await client.callApi("post/UpdatePost", {
      _id,
      updateDoc: rest,
      upsert: false,
    });
    if (!ret.isSucc) {
      console.error("update post failed", ret.err);
      return;
    }
  }
  resetData();
  Router.push("/");
};

// 取消编辑
const handleCancel = () => {
  resetData();
  Router.push("/");
};

// 删除多条数据
const handleDelPosts = async () => {
  // 同时执行多条异步操作
  await Promise.all(
    Store.selectedRowIds.map(async (_id) => {
      let ret = await client.callApi("post/DelPost", { _id });
      if (!ret.isSucc) {
        console.error("del post failed", ret.err, "_id:", _id);
      }
    })
  );
  Store.initStore();
};

// 删除文章
const handleDeletePost = async () => {
  let { _id } = Store.edit;
  // 不是已存在的文章，清除数据，返回
  if (!_id) {
    resetData();
    return;
  }

  // 是已存在的文章，操作数据库删除
  let ret = await client.callApi("post/DelPost", { _id });
  if (!ret.isSucc) {
    console.error("delete post failed", ret.err);
    return;
  }
  resetData();
};

// 登出
const handleLogout = () => {
  console.log("logout");
};
</script>

<template>
  <el-row>
    <el-col :span="5">
      <div h-screen flex flex-col>
        <div h-56px bg-gray-700 text-white border-0 border-r flex justify-center items-center>
          <span>Blog Admin</span>
        </div>
        <el-menu flex-grow text-color="#fff" active-text-color="#ffd04b" background-color="#545c64"
          :default-active="activeMenu" @select="handleSelect">
          <el-menu-item index="1">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <Document />
            </el-icon>
            <span>文章</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <edit />
            </el-icon>
            <span>编辑</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="19">
      <div h-screen flex flex-col>
        <!-- 页头 -->
        <div h-56px flex items-center justify-between flex-shrink-0 pl-4 border-0 border-b border-gray-200>
          <!-- 页面导航 -->
          <el-page-header :content="pageDetail" @back="goBack" />

          <!-- 当跳转到edit 页面时，显示的编辑按钮 -->
          <div pr-4 v-show="editShowActions">
            <el-button :disabled="btnShowFlag" type="primary" @click="handleAddPost(true)">发布</el-button>
            <el-button type="warning" @click="handleCancel">取消</el-button>
          </div>

          <!-- 当跳转到post页面时，现实的操作按钮 -->
          <div pr-4 v-show="postShowActions">
            <el-button type="primary" @click="handleCreatePost">新增</el-button>
            <el-button :disabled="!selectRowsFlag" type="warning" @click="handleDelPosts">删除</el-button>
          </div>

          <!-- 用户操作区块 -->
          <div pr-5 flex items-center>
            <el-icon cursor-pointer>
              <bell />
            </el-icon>
            <el-icon px-5 cursor-pointer>
              <message />
            </el-icon>
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click">
              <el-icon cursor-pointer>
                <avatar />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <!-- 路由 -->
        <div flex-grow flex justify-center>
          <router-view />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
