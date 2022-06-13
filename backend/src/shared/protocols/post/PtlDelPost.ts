import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqDelPost extends BaseRequest {
    _id: string;
}

export interface ResDelPost {}

export const conf: BaseConf = {
    needRole: ["admin"],
};
