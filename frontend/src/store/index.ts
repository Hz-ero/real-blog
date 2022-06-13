import { defineStore } from "pinia";
import { client } from "../client";
import {
  Admin,
  Comment,
  Post,
  QueryType,
  Reply,
  TypeDeduce,
  User,
} from "../shared/models";
import dayjs from "dayjs";

export const mainStore = defineStore("mainStore", {
  state: () => {
    let edit: any = { title: "", content: "", tags: [], category: "" };
    return {
      edit, //当前编辑的文章
      tags: <string[]>[], //所有标签
      categories: <string[]>[], //所有分类
      queryType: <QueryType>{}, //查询类型
      posts: <Post[] | []>[], //所有文章
      users: <User[] | []>[], //所有用户
      showPost: <any | null>null, //当前显示的文章
      currentPage: <number>1, //当前页码
      pageCount: <number>0, //文章总数
      currentAdmin: <Omit<Admin, "password"> | null>null, //当前登录的管理员
    };
  },
  getters: {
    /**
     * @description 将文章中的时间格式化，Date转换为字符串
     * @return {*}
     */
    parsePosts: (state) => {
      return state.posts.map((post) => {
        let { createdAt, updatedAt, ...rest } = post;
        let createDate = dayjs(createdAt).format("YYYY-MM-DD");
        let updateDate: string = "";
        updatedAt && (updateDate = dayjs(updatedAt).format("YYYY-MM-DD"));
        return { createDate, updateDate, ...rest };
      });
    },

    /**
     * @description 处理分类，将字符串数组转换为对象数组，方便渲染
     * [string] => [{label: string, value: string}]
     * @return {*}
     */
    selectOptions: (state) => {
      return state.categories.map((el) => {
        return { label: el, value: el };
      });
    },
  },
  actions: {
    /**
     * @description 获取所有文章
     * @param {number} skip
     * @return {*}
     */
    async getPostsBy(skip: number) {
      // 调用接口获取文章
      const posts = await client.callApi("post/GetPost", {
        query: toRaw(this.queryType),
        skip,
        limit: 10,
      });

      // 失败处理
      if (!posts.isSucc) {
        console.error("store/index.ts: getPostsBy", posts.err);
        return;
      }

      // 如果是id查询，则把posts的第一个元素放到store.showPost中
      if (TypeDeduce.isID(toRaw(this.queryType))) {
        this.showPost = posts.res[0];
      } else {
        this.posts = posts.res as Array<Post>;
      }
    },

    /**
     * @description 获取所查询的文章总数
     */
    async getCountBy() {
      const count = await client.callApi("post/GetCount", {
        query: toRaw(this.queryType),
      });
      if (!count.isSucc) {
        console.error("store/index.ts: getCountBy", count.err);
        return;
      }
      this.pageCount = Math.round(count.res / 10 + 0.5);
    },

    /**
     * @description 获取所有分类
     */
    async getCategories() {
      const categories = await client.callApi("post/GetCategories", {});
      if (!categories.isSucc) {
        console.error("store/index.ts: getCategories", categories.err);
        return;
      }
      this.categories = categories.res;
    },

    /**
     * @description 获取所有标签
     */
    async getTags() {
      const tags = await client.callApi("post/GetTags", {});
      if (!tags.isSucc) {
        console.error("store/index.ts: getTags", tags.err);
        return;
      }
      this.tags = tags.res;
    },

    /**
     * @description 修改文章
     * @param {Post} changePost
     */
    async updatePost(changePost: any) {
      let { _id, ...rest } = changePost;
      const ret = await client.callApi("post/UpdatePost", {
        _id,
        updateDoc: rest,
        upsert: false,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: updatePost", ret.err);
        return;
      }
      let msg = `更新成功`;
      return msg;
    },

    /**
     * @description 获取管理员信息
     */
    async getAdmin() {
      const token = localStorage.getItem("JWT_TOKEN");
      if (!token) return;
      const admin = await client.callApi("admin/GetAdmin", {});
      if (!admin.isSucc) {
        console.error("store/index.ts: getAdmin", admin.err);
        return;
      }
      this.currentAdmin = admin.res;
    },

    /**
     * @description 给文章添加评论
     * @param {string} post_id
     * @param {Comment} comment
     */
    async addComment(post_id: string, comment: Comment) {
      const ret = await client.callApi("comment/AddComment", {
        post_id,
        comment,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: addComment", ret.err);
        return;
      }
      let msg = `评论成功`;
      return msg;
    },

    /**
     * @description 获取文章评论
     * @param {string} post_id
     */
    async getComments(post_id: string) {
      const ret = await client.callApi("comment/GetComment", {
        post_id,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: GetComments", ret.err);
        return;
      }
      return (this.showPost.comments = ret.res.comments);
    },

    /**
     * @description 给某个评论添加回复
     * @param {string} comment_uid
     * @param {Reply} reply
     */
    async addReply(comment_uid: string, reply: Reply) {
      const ret = await client.callApi("comment/AddReply", {
        comment_uid,
        reply,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: addReply", ret.err);
        return;
      }
      let msg = `回复成功`;
      return msg;
    },

    async likeComment(comment_uid: string, user: User) {
      const ret = await client.callApi("comment/LikeComment", {
        comment_uid,
        user,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: likeComment", ret.err);
        return;
      }
      let msg = `点赞成功`;
      return msg;
    },

    async unlikeComment(comment_uid: string, user: User) {
      const ret = await client.callApi("comment/UnlikeComment", {
        comment_uid,
        user,
      });
      if (!ret.isSucc) {
        console.error("store/index.ts: unlikeComment", ret.err);
        return;
      }
      let msg = `取消点赞成功`;
      return msg;
    },
    /**
     * @description 初始化state
     */
    async initStore() {
      this.getPostsBy(0);
      this.getCountBy();
      this.getCategories();
      this.getTags();
    },
  },
});
