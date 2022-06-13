import { Global } from "./../../models/Global";
import { ApiCall } from "tsrpc";
import { ReqAddPost, ResAddPost } from "../../shared/protocols/post/PtlAddPost";

export async function ApiAddPost(call: ApiCall<ReqAddPost, ResAddPost>) {
    let { __Token, ...res } = call.req;
    let op = await Global.collection("Post").insertOne({
        view: 0,
        ...res,
    });

    if (!op) {
        call.error("API addPost fail");
        return;
    }

    call.succ({ insertedId: op.insertedId.toHexString() });
}
