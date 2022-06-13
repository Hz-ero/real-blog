import { QueryType } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqGetCount extends BaseRequest {
    query: QueryType;
}

export type ResGetCount = number;

export const conf: BaseConf = {};
