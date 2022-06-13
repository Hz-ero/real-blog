<script setup lang="ts">
import { mainStore } from "@/store";
import MDEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { client } from "../../client.ts";

const Store = mainStore();

const titleInput = ref(Store.edit.title);
const contentInput = ref(Store.edit.content);
const selectValue = ref(Store.edit.category);
const tagsValue = ref(Store.edit.tags);

// 标题框失去焦点时，更新数据到Store
const handleTitleBlur = () => {
  Store.edit.title = titleInput.value;
};

// 输入框失去焦点时，更新数据到Store
const handleTagsBlur = () => {
  let tags = toRaw(tagsValue.value);
  let allTags: Array<string> = [];
  if (tags) {
    Store.edit.tags = allTags.concat(tags);
  }
};

// 选择框失去焦点时，更新数据到Store
const handleSelectBlur = () => {
  if (selectValue.value) {
    Store.edit.category = selectValue.value;
  }
};

// 文本框更改时，更新数据到Store
const handleContentChange = (content: string) => {
  Store.edit.content = contentInput.value;
};

</script>

<template>
  <div flex-grow flex flex-col p-2>
    <!-- form -->
    <div flex-grow flex flex-col>
      <!-- 标题输入框 -->
      <section my-2>
        <n-input
          type="text"
          size="large"
          @blur="handleTitleBlur"
          v-model:value="titleInput"
          placeholder="请输入标题"
        />
      </section>

      <section flex>
        <!-- 标签输入 -->
        <div flex flex-grow>
          <n-select
            v-model:value="tagsValue"
            filterable
            multiple
            tag
            placeholder="请输入标签"
            :show-arrow="false"
            :show="false"
            @blur="handleTagsBlur"
          />
        </div>
          <!--  分类选择 -->
        <div w-54>
          <n-select
            v-model:value="selectValue"
            :options="Store.selectOptions"
            :filterable="true"
            :tag="true"
            placeholder="请选择分类"
            @blur="handleSelectBlur"
          />
        </div>
      </section>

      <!-- mdeditor -->
      <section my-2 flex-grow flex flex-col>
        <MDEditor v-model="contentInput" @on-change="handleContentChange" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
.md {
  flex-grow: 1;
}
</style>
