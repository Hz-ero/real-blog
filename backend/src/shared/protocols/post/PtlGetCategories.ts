import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqGetCategories extends BaseRequest { }

export type ResGetCategories = Array<string>;

export const conf: BaseConf = {};
