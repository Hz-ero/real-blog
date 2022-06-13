import { ApiCall } from "tsrpc";
import { AdminMethod } from "../../shared/middleware/admin";
import { ReqGetAdmin, ResGetAdmin } from "../../shared/protocols/admin/PtlGetAdmin";

export async function ApiGetAdmin(call: ApiCall<ReqGetAdmin, ResGetAdmin>) {
    // 1. need token
    if (!call.req.__Token) {
        call.error('ApiCall: admin/GetAdmin: token not found.')
        return
    }

    // 2. verify token to admin
    const adminByToken = await AdminMethod.verifyToken(call.req.__Token)

    // 3. 如果查不到管理员，则返回错误
    if (!adminByToken) {
        call.error('ApiCall: admin/GetAdmin: token error.')
        return
    }

    // 4. 顺利查到管理员，返回管理员信息
    call.succ(adminByToken)
}