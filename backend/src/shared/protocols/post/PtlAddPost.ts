import { BaseRequest, BaseResponse, BaseConf } from "./../base";
import { Post } from "./../../models/index";

// req
type NewPost = Omit<Post, "_id">;
export type ReqAddPost = NewPost & BaseRequest;

// res
type ResMsg = { insertedId: string };
export type ResAddPost = ResMsg & BaseResponse;

export const conf: BaseConf = {
    needRole: ["admin"],
};
