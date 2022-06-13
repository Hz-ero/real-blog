import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { AdminMethod } from "../../shared/middleware/admin";
import { ReqLogin, ResLogin } from "../../shared/protocols/admin/PtlLogin";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    // 1. get
    let { username, password } = call.req

    // 2.find admin
    let op = await Global.collection('Admin').findOne({ username })
    if (!op) {
        call.error('ApiCall: admin/Login: admin not found.')
        return
    }

    // 3. compare password
    if (!AdminMethod.comparePwd(password, op!.password)) {
        call.error('ApiCall: admin/Login: password not match.')
        return
    }

    // 4. gen token
    let { _id, ...res } = op
    let token = AdminMethod.genToken({
        _id: op._id.toHexString(),
        ...res
    })

    // 5. return
    call.succ({
        __Token: token,

        _id: op._id.toHexString(),
        ...res
    })
}