import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { AdminMethod } from "../../shared/middleware/admin";
import { ReqAddAdmin, ResAddAdmin } from "../../shared/protocols/admin/PtlAddAdmin";

export async function ApiAddAdmin(call: ApiCall<ReqAddAdmin, ResAddAdmin>) {
    // 1. get
    let { username, password } = call.req

    // 2.find admin
    let op = await Global.collection('Admin').findOne({ username })
    if (!!op) {
        call.error('ApiCall: admin/AddAdmin: admin already exists.')
        return
    }

    // 3. 加密
    password = AdminMethod.cryptPwd(password)
    // 4. insert
    let { insertedId } = await Global.collection('Admin').insertOne({
        username,
        password,
        createdAt: new Date().toLocaleString()
    })
    // 5. return
    call.succ({})
}