<script setup lang="ts">
import { mainStore } from "@/store";
import { User as UserIcon } from "@vicons/tabler";
import { Comment, Reply } from "@/shared/models";
import { LikeOutlined, LikeFilled } from "@vicons/antd";
import dayjs from "dayjs";

// -------------Global------------
const Store = mainStore();
// -------------props------------
let props = defineProps<{
  comment: Comment | Reply;
  uid: string;
  disabled?: boolean;
  checked: boolean;
}>();
// -----------------emit-----------
const emit = defineEmits<{
  (event: "open-form", uid: string): void;
}>();
// -----------------属性-----------

// 点赞数
const commentLikedCount = computed(() => {
  if (!props.comment.likes) return;
  if (props.comment.likes.length === 0) {
    return;
  } else {
    return props.comment.likes.length;
  }
});
// 是否为二级评论
const commentAsReply = computed(() => {
  if ("toUser" in props.comment) {
    return true;
  } else {
    return false;
  }
});

// 艾特的用户名
const atUser = computed(() => {
  if ("toUser" in props.comment) {
    return props.comment.toUser;
  }
});

// 用户自定义头像/默认头像
const isUserAvatar = computed(() => {
  return !props.comment.user.avatar;
});

// -------------方法--------
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
const toggleLikeComment = async () => {
  let userObj = getUser();
  if (props.checked) {
    await Store.unlikeComment(props.comment.uid, userObj);
  } else {
    await Store.likeComment(props.comment.uid, userObj);
  }

  Store.getComments(Store.showPost._id);
};
</script>

<template>
  <div flex space-x-3 my-2>
    <!-- 头像 -->
    <div>
      <n-avatar :size="38" round>
        <n-icon color="#eee">
          <UserIcon />
        </n-icon>
      </n-avatar>
    </div>

    <div flex-grow flex flex-col space-y-1>
      <!-- content -->
      <div>
        <span text-green-600 text-base>{{ props.comment.user.username }}</span>
        <span>:&emsp;</span>
        <span text-green-600 text-base v-show="commentAsReply">@{{ atUser }}&nbsp;</span>
        <span text-base>{{ props.comment.content }}</span>
      </div>

      <!-- 回复操作 -->
      <div flex space-x-2 items-space>
        <n-button
          text
          style="font-size: 17px"
          :disabled="props.disabled"
          @click="toggleLikeComment"
        >
          <n-icon
            color="#0e7a0d"
            :component="props.checked ? LikeFilled : LikeOutlined"
          />
        </n-button>
        <span text-gray-400>{{ commentLikedCount }}•</span>
        <n-button @click="emit('open-form', props.uid)" text size="small">回复</n-button>
        <span text-gray-400>•</span>
        <text text-gray-400>{{
          dayjs(props.comment.createdAt).format("YYYY-MM-DD")
        }}</text>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/base.scss";
</style>
