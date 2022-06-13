import { Admin } from "../../models";
import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqLogin extends BaseRequest {
    username: string;
    password: string;
}


type ResAdmin = Omit<Admin, 'password'>
export type ResLogin = ResAdmin & BaseResponse

export const conf: BaseConf = {

}