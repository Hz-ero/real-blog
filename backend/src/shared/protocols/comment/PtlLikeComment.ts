import { User } from './../../models/index';
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqLikeComment extends BaseRequest {
    comment_uid:string;
    user:User
}

export interface ResLikeComment extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}