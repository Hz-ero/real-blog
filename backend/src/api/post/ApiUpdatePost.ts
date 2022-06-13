import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import {
    ReqUpdatePost,
    ResUpdatePost,
} from "../../shared/protocols/post/PtlUpdatePost";
import { ObjectId } from "mongodb";

export async function ApiUpdatePost(
    call: ApiCall<ReqUpdatePost, ResUpdatePost>
) {
    // 执行查询
    let op = await Global.collection("Post").updateOne(
        { _id: new ObjectId(call.req._id) },
        { $set: call.req.updateDoc },
    );
    // 失败
    if (!op) {
        call.error("API UpdataPost fail");
        return;
    }
    // 成功
    call.succ({});
}
