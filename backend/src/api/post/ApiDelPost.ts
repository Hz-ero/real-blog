import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import { ReqDelPost, ResDelPost } from "../../shared/protocols/post/PtlDelPost";
import { ObjectId } from "mongodb";

export async function ApiDelPost(call: ApiCall<ReqDelPost, ResDelPost>) {
    // id删除
    let op = await Global.collection("Post").deleteOne({
        _id: new ObjectId(call.req._id),
    });
    // 失败
    if (!op) {
        call.error("API DelPost fail");
        return;
    }
    // 成功
    call.succ({});
}
