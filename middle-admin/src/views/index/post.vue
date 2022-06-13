<script setup lang="ts">
import { mainStore } from "@/store";
import type { ElTable } from "element-plus";

const Store = mainStore();
const Router = useRouter();
// 可多选表格引用
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
// 表格数据
const tableData = computed(() => {
  if (Store.parsePosts.length > 0) {
    return Store.parsePosts;
  } else {
    return [];
  }
});
// 翻页
const handleChange = (newPage) => {
  const skip = (newPage - 1) * 10;
  Store.getPostsBy({}, skip);
  Store.currentPage = newPage;
};

// 编辑
const handleEdit = (id) => {
  // console.log("edit post. id:", id);
  const editPost = Store.posts.find((item) => item._id === id);
  Store.edit = editPost;
  Router.push("/edit");
};

// 表格多选
const handleSelectionChange = (selection) => {
  // console.log("selection:", toRaw(selection[0])._id);
  console.log("selection:", selection.length);
  if (!selection.length) {
    Store.selectedRowIds = [];
  } else {
    Store.selectedRowIds = selection.map((item) => {
      return toRaw(item)._id;
    });
  }
};

// 改变发表状态
const handleChangePublished = (id: string, pubStatus: boolean) => {
  // console.log('row:',rowData);
  const changePost = Store.posts.find((item) => {
    return item._id === id;
  });
  if (!changePost) {
    console.error("changePost in Store.Posts is null");
    return;
  }
  changePost.published = pubStatus;
  Store.updatePost(changePost);
};
</script>

<template>
  <div flex flex-col items-center flex-grow>
    <el-table
      ref="multipleTableRef"
      @selection-change="handleSelectionChange"
      m-6
      :data="tableData"
      style="width: 1000px"
      table-layout="auto"
      border
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="tagsStr" label="标签" />
      <el-table-column prop="createDate" label="创建时间" />
      <el-table-column prop="updateDate" label="修改时间" />
      <el-table-column label="已发布">
        <template #default="scope">
          <el-switch
            v-model="scope.row.published"
            active-text="是"
            @change="handleChangePublished(scope.row._id, scope.row.published)"
            inactive-text="否"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Store.postsCount"
      @current-change="handleChange"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
