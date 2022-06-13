import { Comment } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqAddComment extends BaseRequest {
    post_id: string;
    comment: Comment;
}

export interface ResAddComment extends BaseResponse {

}

export const conf: BaseConf = {

}