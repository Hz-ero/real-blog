import { Admin } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqGetAdmin extends BaseRequest {

}

type ResAdmin = Omit<Admin, 'password'>
export type ResGetAdmin = ResAdmin & BaseResponse

export const conf: BaseConf = {

}