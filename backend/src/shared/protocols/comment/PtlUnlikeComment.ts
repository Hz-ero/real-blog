import { User } from './../../models/index';
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqUnlikeComment extends BaseRequest {
    comment_uid:string;
    user:User   
}

export interface ResUnlikeComment extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}