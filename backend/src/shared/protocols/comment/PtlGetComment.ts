import { Comment } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqGetComment extends BaseRequest {
    post_id: string
}

export interface ResGetComment extends BaseResponse {
    comments: Array<Comment>
}

export const conf: BaseConf = {

}