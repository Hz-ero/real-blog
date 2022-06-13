import { BaseRequest } from "../base";
import { QueryType, Post } from "./../../models/index";

export interface ReqGetPost extends BaseRequest {
    query: QueryType;
    skip: number;
    limit: number;
}

export type ResGetPost = Array<Post>;
