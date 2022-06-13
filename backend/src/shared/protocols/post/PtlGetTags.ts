import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqGetTags extends BaseRequest { }

export type ResGetTags = Array<string>;

export const conf: BaseConf = {};
