import { Reply } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqAddReply extends BaseRequest {
    comment_uid: string;
    reply: Reply;
}

export interface ResAddReply extends BaseResponse {

}

export const conf: BaseConf = {

}