import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqAddAdmin extends BaseRequest {
    username: string;
    password: string;
}

export interface ResAddAdmin extends BaseResponse {

}

export const conf: BaseConf = {

}