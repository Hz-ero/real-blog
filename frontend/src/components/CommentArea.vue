<script setup lang="ts">
import { Comment, User } from "@/shared/models";
import { mainStore } from "../store";

// -----------Global-----------
const Store = mainStore();
// -----------组件-------------
const AsyncCommentForm = defineAsyncComponent(() => import("./CommentForm.vue"));
// -----------属性-------------
const currentUid = ref("");
const hasNoUser = computed(() => {
  let user = getUser();
  return !user ? true : false;
});
// 总评论数
const totalComments = computed(() => {
  if (!Store.showPost.comments) return 0;

  return Store.showPost.comments.reduce((total: number, comment: any) => {
    return total + comment.replies.length;
  }, Store.showPost.comments.length);
});
// -----------方法-------------

// 查询是否注册用户
const getUser = (): User | undefined => {
  let userStr = localStorage.getItem("user");

  if (!userStr) {
    console.error("localStorage not find user");
    return;
  } else {
    return JSON.parse(userStr);
  }
};
// 打开commentForm
const handleOpenForm = (uid: string): void => {
  currentUid.value = uid;
};
// 关闭commentForjm
const handleCloseForm = () => {
  currentUid.value = "";
};

// 检查评论项是否被当前用户点赞
const checkItemLiked = (comment: Comment | Reply): boolean => {
  let userStr = localStorage.getItem("user");

  if (!userStr) return false;

  if (!comment.likes) return false;
  if (comment.likes.length === 0) return false;

  let userObj = JSON.parse(userStr);
  if (!userObj) return false;
  let findIndex = comment.likes.findIndex((val: User) => {
    return val.uid === userObj.uid;
  });
  if (findIndex === -1) {
    return false;
  } else {
    return true;
  }
};
</script>

<template>
  <!-- 评论数 -->
  <div w-900px mx-auto bg-white text-base border-b-1 border-gray-300 border-0 px-3 py-2>
    {{ totalComments }}条评论
  </div>

  <!-- 评论区 -->
  <div w-900px mx-auto bg-white px-4 py-2 flex flex-col>
    <!-- 编辑区 -->
    <AsyncCommentForm :level="1" />

    <!-- 评论列表 -->
    <div v-for="comment in Store.showPost.comments" :key="comment.uid">
      <!-- 一级评论项 -->
      <CommentItem
        :checked="checkItemLiked(comment)"
        :comment="comment"
        :uid="comment.uid"
        @open-form="handleOpenForm"
        :disabled="hasNoUser"
      />
      <!-- 对一级评论项的回复窗口 -->
      <div ml-10 v-if="comment.uid === currentUid">
        <AsyncCommentForm
          @close-form="handleCloseForm"
          :level="2"
          :comment="comment"
          :toUser="comment.user.username"
        />
      </div>

      <!-- 二级评论列表 -->
      <div
        v-for="reply in comment.replies"
        :key="reply.uid"
        ml-8
        bg-gray-100
        p-3
        v-show="!!comment.replies.length"
      >
        <!-- 二级评论项 -->
        <CommentItem
          :checked="checkItemLiked(reply)"
          :disabled="hasNoUser"
          :comment="reply"
          :uid="reply.uid"
          @open-form="handleOpenForm"
        />
        <!-- 针对二级评论项的回复窗口 -->
        <div v-if="reply.uid === currentUid" ml-10>
          <AsyncCommentForm
            @close-form="handleCloseForm"
            :comment="comment"
            :toUser="reply.user.username"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
