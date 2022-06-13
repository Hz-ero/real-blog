<script setup lang="ts">
import { mainStore } from "@/store";
import { Comment, Reply, User } from "@/shared/models";
import { v1 as uuidv1 } from "uuid";
import { User as UserIcon } from "@vicons/tabler";

// ------------Global----------
const Store = mainStore();

// ------------props----------
let props = defineProps<{
  comment?: Comment;
  toUser?: string;
}>();

//-----------emits---------
const emits = defineEmits<{
  (event: "close-form"): void;
}>();

//-----------属性---------
let formVal = ref({
  content: "",
  username: "",
  email: "",
});

// 表单尺寸：一级评论为大尺寸
const formSize = computed(() => {
  if (props.comment) {
    return "large";
  }
});

// 是否需要输入用户名
const needInputUser = computed(() => {
  return !localStorage.getItem("user");
});

// 验证表单填写完整
const isFormNotCompleted = computed(() => {
  if (needInputUser.value) {
    return !formVal.value.content || !formVal.value.username || !formVal.value.email;
  } else {
    return !formVal.value.content;
  }
});

//-----------方法---------
const handleComfirmComment = () => {
  if (props.comment) {
    addReply();
    resetForm();
  } else {
    addComment();
    resetForm();
  }
};

// 发表一级评论
const addComment = async () => {
  // 评论
  let comment: Comment = {
    uid: uuidv1(),
    content: formVal.value.content,
    createdAt: new Date(),
    user: parseUser(),
    replies: [],
  };

  // 评论上传数据库
  await Store.addComment(Store.showPost._id, comment);

  //   重新获取所有评论
  Store.getComments(Store.showPost._id);
};
// 发表二级评论
const addReply = async () => {
  let reply: Reply = {
    uid: uuidv1(),
    content: formVal.value.content,
    createdAt: new Date(),
    user: parseUser(),
    toUser: props.toUser,
  };

  // 发表二级评论
  await Store.addReply(props.comment!.uid, reply);
  // 重新获取所有评论
  Store.getComments(Store.showPost._id);
};
const resetForm = () => {
  formVal.value = {
    content: "",
    username: "",
    email: "",
  };
  emits("close-form");
};

// 解析用户信息
// 信息来源：localStorage或者用户输入
const parseUser = ():User => {
  let user: User;
  let userStr = localStorage.getItem("user");

  if (!userStr) {
    user = {
      uid: uuidv1(),
      username: formVal.value.username,
      email: formVal.value.email,
      createdAt: new Date().toLocaleString(),
    };
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    user = JSON.parse(userStr);
  }

  return user;
};
</script>

<template>
  <div flex-grow flex space-x-3 my-2>
    <!-- 头像 -->
    <div>
      <n-avatar :size="38" round>
        <n-icon color="#eee">
          <UserIcon />
        </n-icon>
      </n-avatar>
    </div>

    <!-- 表单 -->
    <div flex-grow flex flex-col items-end space-y-2>
      <!-- 上一行：内容输入 -->
      <n-input
        v-model:value="formVal.content"
        :size="formSize"
        placeholder="支持简单markdown语法"
      />
      <!-- 下一行：用户名/邮箱 + 提交按钮 -->
      <div flex space-x-2>
        <!-- 用户名/邮箱 -->
        <div v-if="needInputUser" flex space-x-2>
          <n-input
            v-model:value="formVal.username"
            :size="formSize"
            placeholder="请输入用户名"
          />
          <n-input
            v-model:value="formVal.email"
            :size="formSize"
            placeholder="请输入邮箱"
          />
        </div>
        <!-- 提交按钮 -->
        <n-button
          :disabled="isFormNotCompleted"
          :size="formSize"
          type="primary"
          @click="handleComfirmComment"
          >提交评论</n-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
