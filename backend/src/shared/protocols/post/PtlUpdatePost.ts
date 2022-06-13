import { Post } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqUpdatePost extends BaseRequest {
    _id: string;
    updateDoc: Partial<Omit<Post, "_id">>;
    upsert: boolean;
}

export interface ResUpdatePost { }

export const conf: BaseConf = {
    needRole: ["admin"],
};
