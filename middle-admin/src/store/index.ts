import { defineStore } from "pinia";
import { client } from "../client";
import { Admin, Post, User } from "../shared/models";
import dayjs from "dayjs";

export const mainStore = defineStore("mainStore", {
    state: () => {
        let edit: any = { title: "", content: "", tags: <string[]>[], category: "", };
        return {
            edit,
            tags: <string[]>[],
            categories: <string[]>[],
            posts: <Post[] | []>[],
            users: <User[] | []>[],
            showPost: {},
            postsCount: 0,
            selectedRowIds: <string[]>[],
            currentAdmin: <Omit<Admin, 'password'> | null>null,
        };
    },
    getters: {
        parsePosts: (state) => {
            return state.posts.map((post) => {
                let { createdAt, updatedAt, tags, ...rest } = post;
                let createDate = dayjs(createdAt).format("YYYY-MM-DD");
                let updateDate: string = "";
                updatedAt &&
                    (updateDate = dayjs(updatedAt).format("YYYY-MM-DD"));
                let tagsStr = tags.join(",");
                return { createDate, updateDate, tagsStr, ...rest };
            });
        },
        selectOptions: (state) => {
            return state.categories.map((el) => {
                return { label: el, value: el }
            })
        }
    },
    actions: {
        async getPostsBy(query: any, skip: number) {
            const posts = await client.callApi("post/GetPost", {
                query,
                skip,
                limit: 10,
            });
            if (!posts.isSucc) {
                console.error("store/index.ts: getPostsBy", posts.err);
                return;
            }

            // 如果是id查询，则把posts的第一个元素放到store.showPost中
            if (!query._id) {
                this.posts = posts.res as Array<Post>;
            } else {
                this.showPost = posts.res[0];
            }
        },
        async getCountBy(query: any) {
            const count = await client.callApi("post/GetCount", { query });
            if (!count.isSucc) {
                console.error("store/index.ts: getCountBy", count.err);
                return;
            }
            this.postsCount = count.res;
        },
        async getCategories() {
            const categories = await client.callApi("post/GetCategories", {});
            if (!categories.isSucc) {
                console.error("store/index.ts: getCategories", categories.err);
                return;
            }
            this.categories = categories.res;
        },
        async getTags() {
            const tags = await client.callApi("post/GetTags", {});
            if (!tags.isSucc) {
                console.error("store/index.ts: getTags", tags.err);
                return;
            }
            this.tags = tags.res;
        },
        async updatePost(changePost: Post) {
            let { _id, ...rest } = changePost;
            const ret = await client.callApi("post/UpdatePost", {
                _id,
                updateDoc: rest,
                upsert: false
            })
            if (!ret.isSucc) {
                console.error("store/index.ts: updatePost", ret.err);
                return;
            }
            let msg = `更新成功`;
            return msg
        },
        async getAdmin() {
            const token = localStorage.getItem("JWT_TOKEN");
            if (!token) return;
            const user = await client.callApi("admin/GetAdmin", {});
            if (!user.isSucc) {
                console.error("store/index.ts: getAdmin");
                return;
            }
            this.currentAdmin = user.res;
        },
        async initStore() {
            this.getPostsBy({}, 0);
            this.getCountBy({ query: {} });
            this.getCategories();
            this.getTags();
            this.getAdmin()
        }
    },
});
