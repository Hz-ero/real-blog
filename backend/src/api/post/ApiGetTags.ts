import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import { ReqGetTags, ResGetTags } from "../../shared/protocols/post/PtlGetTags";

export async function ApiGetTags(call: ApiCall<ReqGetTags, ResGetTags>) {
    // 查询结果
    let op = await Global.collection("Post").distinct("tags");
    // 失败
    if (!op) {
        call.error("API Not Implemented");
    }
    // 成功
    call.succ(op);
}
